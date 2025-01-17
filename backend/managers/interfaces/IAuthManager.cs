

using System.Security.Claims;
using FamilyPlanner.Models.TokenInfoModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IAuthManager {
        public string GenerateJwtToken(User user);
        public string GenerateRefreshToken(User user);

        public Task<bool> ValidateUser(Credentials credentials);
        public bool IsValidateRefreshToken(string refreshToken);

        public ClaimsPrincipal ValidateRefreshToken(string refreshToken);
        public RefreshToken DecodeRefreshToken(string refreshToken);

        public TokenInfo GetTokenInfo();
        public Task<string> RefreshToken();
    }
}