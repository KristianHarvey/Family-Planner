
using AutoMapper;
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
        private readonly IMapper mapper;
        public UserController(IUserManager userManager, IMapper mapper) {
            this.userManager = userManager;
            this.mapper = mapper;
        }
        [HttpPost]
        public async Task<APIResponse> CreateNewUser(UserInput newUser) {
            var createdUser = await userManager.CreateUserAsync(newUser);
            var userDTO = mapper.Map<UserDTO>(createdUser);
            if(userDTO == null) {
                return new APIResponse("Failed to create new user", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(userDTO, "Successfully created new user", false, HttpStatusCode.OK);
        }
        [HttpGet("current-user")]
        public async Task<APIResponse> GetCurrentUserFromToken() {
            var user = await userManager.GetCurrentUserFromToken();
            var userDTO = mapper.Map<UserDTO>(user);
            if(userDTO == null) {
                return new APIResponse("Current user could not be found from token, maybe token is null?", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(userDTO, "Successfully retrieved current user from token", false, HttpStatusCode.OK);
        }
        [HttpGet("{id}")]
        public async Task<APIResponse> GetUserById(int id) {
            var user = await userManager.GetByIdAsync(id);
            var userDTO = mapper.Map<UserDTO>(user);
            if(userDTO == null) {
                return new APIResponse($"User with id {id} does not exist", true, HttpStatusCode.NotFound);
            }
            return new APIResponse(userDTO, $"Successfully retrieved user {id}", false, HttpStatusCode.OK);
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
            var userDTO = mapper.Map<UserDTO>(user);
            if(userDTO == null) {
                return new APIResponse($"User with id: {uid} does not exist", true, HttpStatusCode.NotFound);
            }
            return new APIResponse(userDTO, $"Successfully retrieved user: {uid}", false, HttpStatusCode.OK);
        }
        [HttpGet("emails/{email}")]
        public async Task<APIResponse> GetUserByEmail(string email) {
            var user = await userManager.GetByEmailAsync(email.ToLower());
            var userDTO = mapper.Map<UserDTO>(user);
            if(userDTO == null) {
                return new APIResponse($"User with email {email} does not exist", true, HttpStatusCode.NotFound);
            }
            return new APIResponse(userDTO, $"Successfully retrieved user with email: {email}", false, HttpStatusCode.OK);
        }

        [HttpGet()]
        public async Task<APIResponse> GetAllUsers() {
            var users = await userManager.GetAllAsync();
            var userDTOs = mapper.Map<IEnumerable<UserDTO>>(users);
            if(userDTOs == null) {
                return new APIResponse($"Failed retrieving all users", true, HttpStatusCode.NotFound);
            }
            return new APIResponse(userDTOs, $"Successfully retrieved all users", false, HttpStatusCode.OK);
        }

        [HttpPut("{id}")]
        public async Task<APIResponse> UpdateUser(int id, UserDTO userDTO) {
            var user = mapper.Map<User>(userDTO);
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

        [HttpGet("search/{query}")]
        public async Task<IActionResult> Search(string query) {
            if(!string.IsNullOrEmpty(query) && query.Length >= 3) {
                var results = await userManager.Search(query);
                var resultsDTOs = mapper.Map<IEnumerable<UserDTO>>(results);
                foreach(var result in resultsDTOs) {
                    Console.WriteLine(result.Id);
                }
                return Ok(resultsDTOs);
            } else {
                return Ok(new User[0]);
            }
        }
    }
}