
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models;
using FamilyPlanner.Models.InviteModel;
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
        [HttpGet("invites")]
        public async Task<APIResponse> GetAllInvites() {
            var invites = await userManager.GetAllInvites();
            if(invites == null) {
                return new APIResponse("Couldnt find any invites for current user", true, HttpStatusCode.NotFound);
            }
            return new APIResponse(invites, "Successfully retrieved invites for current user", false, HttpStatusCode.OK);
        }
        [HttpGet("secrets/{uid}")]
        public async Task<APIResponse> GetUserByUid(string uid) {
            var user = await userManager.GetByUidAsync(uid);
            if(user == null) {
                return new APIResponse($"User with id: {uid} does not exist", true, HttpStatusCode.NotFound);
            }
            return new APIResponse(user, $"Successfully retrieved user: {uid}", false, HttpStatusCode.OK);
        }
        [HttpGet("emails/{email}")]
        public async Task<APIResponse> GetUserByEmail(string email) {
            var user = await userManager.GetByEmailAsync(email.ToLower());
            if(user == null) {
                return new APIResponse($"User with email {email} does not exist", true, HttpStatusCode.NotFound);
            }
            return new APIResponse(user, $"Successfully retrieved user with email: {email}", false, HttpStatusCode.OK);
        }

        [HttpGet()]
        public async Task<APIResponse> GetAllUsers() {
            var users = await userManager.GetAllAsync();
            if(users == null) {
                return new APIResponse($"Failed retrieving all users", true, HttpStatusCode.NotFound);
            }
            return new APIResponse(users, $"Successfully retrieved all users", false, HttpStatusCode.OK);
        }

        [HttpPut("{id}")]
        public async Task<APIResponse> UpdateUser(int id, User user) {
            if(!await userManager.UpdateAsync(id, user)) {
                return new APIResponse("failed to update user", true, HttpStatusCode.InternalServerError);
            }
            return new APIResponse("Successfully updated user", false, HttpStatusCode.OK);
        }

        [HttpPut("families/{id}")]
        public async Task<APIResponse> UpdateSelectedFamily(int id, [FromBody] int SelectedFamilyId) {
            if(!await userManager.UpdateSelectedFamily(id, SelectedFamilyId)) {
                return new APIResponse($"failed to update selected family for user {id}", true, HttpStatusCode.InternalServerError);
            }
            return new APIResponse($"Successfully updated selected family for user {id}", false, HttpStatusCode.OK);
        }

        [HttpPost("send-invite")]
        public async Task<APIResponse> SendInvite(Invite invite) {
            if(!await userManager.SendInviteToUser(invite)) {
                return new APIResponse("Failed to send invite", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse("Successfully sent invite", false, HttpStatusCode.OK);
        }

        [HttpPut("accept-invite")]
        public async Task<APIResponse> AcceptInvite(Invite invite) {
            if(!await userManager.AcceptInvite(invite)) {
                return new APIResponse("Failed to accept invite", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse("Successfully accepted invite", false, HttpStatusCode.OK);
        }

        [HttpPut("decline-invite")]
        public async Task<APIResponse> DeclineInvite(Invite invite) {
            if(!await userManager.DeclineInvite(invite)) {
                return new APIResponse("Failed to decline invite", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse("Successfully decline invite", false, HttpStatusCode.OK);
        }

        [HttpPost("receive-invite")]
        public async Task ReceiveInvite(Invite invite) {
            await userManager.ReceiveInvite(invite);
        }
    }
}