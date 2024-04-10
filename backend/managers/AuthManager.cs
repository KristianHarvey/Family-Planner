

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models.TokenInfoModel;
using FamilyPlanner.Models.UserModel;
using Microsoft.IdentityModel.Tokens;

namespace FamilyPlanner.Managers {
    public class AuthManager : IAuthManager
    {
        private readonly IUserManager userManager;
        private IConfiguration Configuration;
        private readonly TokenValidationParameters _tokenValidationParameters;
        private readonly SymmetricSecurityKey _signingKey;
        private readonly IHttpContextAccessor contextAccessor;
        public AuthManager(IConfiguration configuration, IUserManager userManager, IHttpContextAccessor httpContextAccessor) {
            Configuration = configuration;
            this.userManager = userManager;
            contextAccessor = httpContextAccessor;

        _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("Jwt:Key").Value));
        _tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = false,
            IssuerSigningKey = _signingKey,
            ClockSkew = TimeSpan.Zero // Remove delay of token when expire
        };
        }
        public string GenerateJwtToken(User user)
        {

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("Jwt:Key").Value));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Uid),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Expiration, DateTime.UtcNow.AddHours(1).ToString())
            };

            foreach(var claim in claims) {
                Console.WriteLine(claim.ToString());
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = credentials
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            return tokenHandler.WriteToken(token);
        }

        public async Task<bool> ValidateUser(Credentials credentials) {
            var user = await userManager.GetByEmailAsync(credentials.Email);
            if(user == null) {
                return false;
            }
            var hashedPassword = user.Password;
            if(!BCrypt.Net.BCrypt.EnhancedVerify(credentials.Password, hashedPassword)) {
                return false;
            }
            return true;
        }

        public ClaimsPrincipal ValidateRefreshToken(string refreshToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                // Validate the refresh token
                var principal = tokenHandler.ValidateToken(refreshToken, _tokenValidationParameters, out var securityToken);

                // Check if the security token is a valid refresh token
                if (securityToken is not JwtSecurityToken jwtSecurityToken ||
                    !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    throw new SecurityTokenException("Invalid token");
                }

                // Optionally, perform additional checks on the refresh token (e.g., database lookup)

                return principal;
            }
            catch (Exception ex)
            {
                // Token validation failed
                throw new SecurityTokenException("Invalid token", ex);
            }
        }

        public TokenInfo GetTokenInfo()
        {
            var principal = contextAccessor.HttpContext?.User;
            Console.WriteLine(principal);

            foreach(var claim in principal!.Claims) {
                Console.WriteLine(claim.ToString());
            }
            
            if(principal != null) {
                var uidClaim = principal.FindFirst(ClaimTypes.NameIdentifier);
                var roleClaim = principal.FindFirst(ClaimTypes.Role);
                var expirationClaim = principal.FindFirst(ClaimTypes.Expiration);

                if(uidClaim != null && roleClaim != null && expirationClaim != null)
                {
                    var tokenInfo = new TokenInfo()
                    {
                        Uid = uidClaim.Value,
                        Role = roleClaim.Value,
                        ExpiryDate = DateTime.Parse(expirationClaim.Value)
                    };
                    return tokenInfo;
                }
            }
            return null;
        }

        public async Task<string> RefreshToken() {
            Console.WriteLine("Refreshing! :)");
            try {
                var principal = contextAccessor.HttpContext?.User;
                var userIdClaim = principal?.FindFirst(ClaimTypes.NameIdentifier);

                if(userIdClaim != null) {
                    var user = await userManager.GetByUidAsync(userIdClaim.Value);
                    var newAccessToken = GenerateJwtToken(user);
                    return newAccessToken;
                } else {
                    throw new SecurityTokenException();
                }

            } catch(SecurityTokenException) {
                return null;
            }
        }
    }
}