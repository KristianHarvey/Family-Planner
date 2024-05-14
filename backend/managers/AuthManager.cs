

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models.TokenInfoModel;
using FamilyPlanner.Models.UserModel;
using Microsoft.AspNetCore.Authentication.BearerToken;
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
                new Claim(ClaimTypes.Expiration, DateTime.Now.AddHours(1).ToString())
            };
            Console.WriteLine(DateTime.UtcNow.AddHours(1).ToString());
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
            // await GenerateRefreshToken(user);
            
            return tokenHandler.WriteToken(token);
        }

        public string GenerateRefreshToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Configuration.GetSection("Jwt:Key").Value);

            var tokenId = Guid.NewGuid().ToString();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("UserUid", user.Uid),
                    new Claim("TokenId", tokenId),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var refreshToken = tokenHandler.WriteToken(token);
                new RefreshToken 
                { 
                    Id = tokenId,
                    UserUid = user.Uid, 
                    ExpiryDate = tokenDescriptor.Expires ?? DateTime.Now,
                };
            return refreshToken;
        }

        public RefreshToken DecodeRefreshToken(string refreshToken) {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Configuration.GetSection("Jwt:Key").Value);

            try {
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                };

                var principal = tokenHandler.ValidateToken(refreshToken, validationParameters, out _);
                var userId = principal.Claims.FirstOrDefault(claim => claim.Type == "UserUid")?.Value;
                var tokenId = principal.Claims.FirstOrDefault(claim => claim.Type == "tokenId")?.Value;
                var jwtSecurityToken = tokenHandler.ReadToken(refreshToken) as JwtSecurityToken;
                var expiresAt = jwtSecurityToken?.ValidTo.ToUniversalTime();

                return new RefreshToken
                {
                    Id = tokenId ?? "",
                    UserUid = userId ?? "",
                    ExpiryDate = expiresAt 
                };
            } catch(Exception ex) {
                return null;
            }
        }

        public bool IsValidateRefreshToken(string refreshToken) {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Configuration["Jwt:KEY"]);

            try {
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                };

                SecurityToken validateToken;
                var principal = tokenHandler.ValidateToken(refreshToken, validationParameters, out validateToken);

                return true;
            } catch(Exception ex) {
                return false;
            }
        }

        public async Task<bool> ValidateUser(Credentials credentials) {
            var user = await userManager.GetByEmailAsync(credentials.Email.ToLower());
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

        // private async Task<string> GenerateRefreshToken(User user)
        // {
        //     // Check if the user already has a refresh token
        //     var existingRefreshToken = await userManager.GetRefreshTokenAsync(user.Uid);

        //     if (existingRefreshToken != null && existingRefreshToken.ExpiryDate > DateTime.UtcNow)
        //     {
        //         // If a valid refresh token exists, return it
        //         return existingRefreshToken.Token;
        //     }

        //     // Generate a new refresh token (e.g., using a GUID)
        //     var refreshToken = Guid.NewGuid().ToString();

        //     // Save or update the refresh token in the database
        //     await userManager.SaveOrUpdateRefreshTokenAsync(user.Uid, refreshToken);

        //     return refreshToken;
        // }

        public async Task<string> RefreshToken() {
            Console.WriteLine("Refreshing! :)");
            try {
                var principal = contextAccessor.HttpContext?.User;
                var userIdClaim = principal?.FindFirst(ClaimTypes.NameIdentifier);

                if(userIdClaim != null) {
                    var user = await userManager.GetByUidAsync(userIdClaim.Value);
                    var newAccessToken = GenerateJwtToken(user);
                    // var refreshToken = await GenerateRefreshToken(user);
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