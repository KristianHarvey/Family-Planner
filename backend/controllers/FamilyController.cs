
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models;
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Services;
using FamilyPlanner.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace FamilyPlanner.Controllers {
    [Route("/api/[controller]")]
    [ApiController]
    public class FamilyController : ControllerBase {
        private readonly IFamilyManager familyManager;
        private readonly IFamilyService familyService;
        public FamilyController(IFamilyManager familyManager, IFamilyService familyService) {
            this.familyManager = familyManager;
            this.familyService = familyService;
        }
        [HttpPost()]
        public async Task<APIResponse> CreateNewFamily(Family family) {
            var newFamily = await familyService.Create(family);
            if(newFamily == null) {
                return new APIResponse("Failed to create new family", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(newFamily, "Successfully created a new family", false, HttpStatusCode.OK);
        }

        [HttpGet]
        public async Task<APIResponse> GetAllFamiliesForCurrentUser() {
            var families = await familyManager.GetAllAsync();
            if(families == null) {
                return new APIResponse("There is no families for current user", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(families, "Successfully retrieved all families for current user", false, HttpStatusCode.OK);
        }

        [HttpGet("{id}")]
        public async Task<APIResponse> GetFamilyById(int id) {
            var family = await familyManager.GetByIdAsync(id);
            if(family == null) {
                return new APIResponse($"Failed to retrieve family with id: {id}", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(family, $"Successfully retrieved family with id: {id}", false, HttpStatusCode.OK);
        }

        [HttpPut("{id}")]
        public async Task<APIResponse> UpdateFamilyById(int id, Family family) {
            var updatedFamily = await familyManager.UpdateAsync(id, family);
            if(!updatedFamily) {
                return new APIResponse("Failed to update family", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse("Successfully updated family", false, HttpStatusCode.OK);
        }
        // [HttpPut]
        // [Route("/members/")]
        // public async Task<APIResponse> AddUserToFamily(int familyId, string userUid) {
        //     if(!await familyManager.InsertUser(familyId, userUid)) {
        //         return new APIResponse($"Failed to add user {userUid} to family {familyId}", true, HttpStatusCode.BadRequest);
        //     }
        //     return new APIResponse($"Successfully added user {userUid} to family {familyId}", false, HttpStatusCode.OK);
        // }

        // [HttpDelete()]
        // [Route("{id}")]
        // public async Task<APIResponse> DeleteFamilyById(int id) {
        //     if(!await familyManager.DeleteByIdAsync(id)) {
        //         return new APIResponse($"Failed to delete plan with id: {id}", true, HttpStatusCode.BadRequest);
        //     }
        //     return new APIResponse($"Successfully deleted plan with id: {id}", false, HttpStatusCode.OK);
        // }
    }
}