
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models;
using FamilyPlanner.Models.UserModel;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace FamilyPlanner.Controllers {
    [Route("/api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase {
        private readonly IUserManager userManager;
        public UserController(IUserManager userManager) {
            this.userManager = userManager;
        }
        [HttpPost]
        public async Task<APIResponse> CreateNewUser(UserInput newUser) {
            var createdUser = await userManager.CreateUserAsync(newUser);
            if(createdUser == null) {
                return new APIResponse("Failed to create new user", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(newUser, "Successfully created new user", false, HttpStatusCode.OK);
        }
        [HttpGet("{id}")]
        public async Task<APIResponse> GetUserById(int id) {
            var user = await userManager.GetByIdAsync(id);
            if(user == null) {
                return new APIResponse($"User with id {id} does not exist", true, HttpStatusCode.NotFound);
            }
            return new APIResponse(user, $"Successfully retrieved user {id}", false, HttpStatusCode.OK);
        }
        [HttpGet("secret/{uid}")]
        public async Task<APIResponse> GetUserByUid(string uid) {
            var user = await userManager.GetByUidAsync(uid);
            if(user == null) {
                return new APIResponse($"User with id: {uid} does not exist", true, HttpStatusCode.NotFound);
            }
            return new APIResponse(user, $"Successfully retrieved user: {uid}", false, HttpStatusCode.OK);
        }
        [HttpGet("email/{email}")]
        public async Task<APIResponse> GetUserByEmail(string email) {
            var user = await userManager.GetByEmailAsync(email);
            if(user == null) {
                return new APIResponse($"User with email {email} does not exist", true, HttpStatusCode.NotFound);
            }
            return new APIResponse(user, $"Successfully retrieved user with email: {email}", false, HttpStatusCode.OK);
        }
        [HttpPut("{id}")]
        public async Task<APIResponse> UpdateUser(int id, UserUpdate user) {
            if(!await userManager.UpdateAsync(id, user)) {
                return new APIResponse("failed to update user", true, HttpStatusCode.InternalServerError);
            }
            return new APIResponse("Successfully updated user", false, HttpStatusCode.OK);
        }
    }
}