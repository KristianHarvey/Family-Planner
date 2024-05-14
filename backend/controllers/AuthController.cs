
using FamilyPlanner.Context;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models;
using FamilyPlanner.Models.TokenInfoModel;
using FamilyPlanner.Models.UserModel;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IContextService contextService;
        public AuthController(IAuthManager authManager, IUserManager userManager, IContextService contextService) {
            this.authManager = authManager;
            this.userManager = userManager;
            this.contextService = contextService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<APIResponse> Login(Credentials credentials) {
            var user = await userManager.GetByEmailAsync(credentials.Email.ToLower());
            if(user == null) {
                return new APIResponse($"User with email {credentials.Email} could not be found", true, HttpStatusCode.NotFound);
            }
            if(!await authManager.ValidateUser(credentials)) {
                return new APIResponse("Username or password is not correct", true, HttpStatusCode.BadRequest);
            }
            Console.WriteLine(user.Id);
            var token = authManager.GenerateJwtToken(user);
            var refreshToken = authManager.GenerateRefreshToken(user);
            return new APIResponse(user, token, refreshToken, "Successfully logged in", false, HttpStatusCode.OK);
        }

        [HttpPost]
        [Route("logout")]
        public APIResponse Logout() {

            return new APIResponse("Successfully logged out", false, HttpStatusCode.OK);
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<APIResponse> RefreshToken() {
            var refreshToken = contextService.GetRefreshToken();
            if(string.IsNullOrEmpty(refreshToken)) {
                return new APIResponse("Refresh token is not present!", true, HttpStatusCode.NotFound);
            }
            if(!authManager.IsValidateRefreshToken(refreshToken)) {
                return new APIResponse("Invalid refresh token", true, HttpStatusCode.BadRequest);
            }

            var tokenPayload = authManager.DecodeRefreshToken(refreshToken);
            
            var user = await userManager.GetByUidAsync(tokenPayload.UserUid);
            if(user == null) {
                return new APIResponse("The member associated with the refresh token no longer exists", true, HttpStatusCode.NotFound);
            }
            
            var newRefreshToken = authManager.GenerateRefreshToken(user);
            var accessToken = authManager.GenerateJwtToken(user);
            if(accessToken == null) {
                return new APIResponse($"Failed to refresh token", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(user, accessToken, newRefreshToken, "Successfully refreshed token", false, HttpStatusCode.OK);
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