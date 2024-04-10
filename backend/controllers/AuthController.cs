
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models;
using FamilyPlanner.Models.TokenInfoModel;
using FamilyPlanner.Models.UserModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Security.Claims;

namespace FamilyPlanner.Controllers {
    [Route("/api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase {
        private readonly IAuthManager authManager;
        private readonly IUserManager userManager;
        public AuthController(IAuthManager authManager, IUserManager userManager) {
            this.authManager = authManager;
            this.userManager = userManager;
        }

        [HttpPost]
        [Route("login")]
        public async Task<APIResponse> Login(Credentials credentials) {
            var user = await userManager.GetByEmailAsync(credentials.Email);
            if(user == null) {
                return new APIResponse($"User with email {credentials.Email} could not be found", true, HttpStatusCode.NotFound);
            }
            if(!await authManager.ValidateUser(credentials)) {
                return new APIResponse("Username or password is not correct", true, HttpStatusCode.BadRequest);
            }
            var token = authManager.GenerateJwtToken(user);
            return new APIResponse(user, token, "Successfully logged in", false, HttpStatusCode.OK);
        }

        [HttpPost]
        [Route("logout")]
        public APIResponse Logout() {

            return new APIResponse("Successfully logged out", false, HttpStatusCode.OK);
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<APIResponse> RefreshToken() {
            var newToken = await authManager.RefreshToken();
            if(newToken == null) {
                return new APIResponse($"Failed to refresh token", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(newToken, "Successfully refreshed token", false, HttpStatusCode.OK);
        }

        [HttpGet]
        [Route("token-info")]
        public APIResponse GetTokenInfo() {
            var tokenInfo = authManager.GetTokenInfo();
            if(tokenInfo == null) {
                return new APIResponse("Failed to get info from token, token might be null?", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(tokenInfo, "Successfully retrieved token info", false, HttpStatusCode.OK);
        }
    }
}