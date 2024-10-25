using System.Net;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models;
using FamilyPlanner.Models.ActivityModel;
using FamilyPlanner.Models.ShoppingListModel;
using Microsoft.AspNetCore.Mvc;

namespace FamilyPlanner.Controllers {
    [ApiController]
    [Route("/api/[controller]")]
    public class ActivityController : ControllerBase {
        private readonly IActivityManager activityManager;

        public ActivityController(IActivityManager activityManager) {
            this.activityManager = activityManager;
        }
        [HttpPost]
        public async Task<APIResponse> Create(Activity activity) {
            var createdActivity = await activityManager.CreateAsync(activity);
            if(createdActivity == null) {
                return new APIResponse("Failed to create a new activity", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(createdActivity, "Successfully created a new activity", false, HttpStatusCode.OK);
        }
        [HttpGet]
        public async Task<APIResponse> GetAllForCurrentUser() {
            var activities = await activityManager.GetAllAsync();
            if(activities == null) {
                return new APIResponse("No activities exists for current user", true, HttpStatusCode.NotFound);
            }
            return new APIResponse(activities, "Successfully retrieved all activities for current user", false, HttpStatusCode.OK);
        }
        [HttpGet("{id}")]
        public async Task<APIResponse> GetById(int id) {
            var activity = await activityManager.GetByIdAsync(id);
            if(activity == null) {
                return new APIResponse($"Failed to get activity with id {id}", true, HttpStatusCode.NotFound);
            }
            return new APIResponse(activity, $"Successfully fetched activity with id {id}", false, HttpStatusCode.OK);
        }
        [HttpPut("{id}")]
        public async Task<APIResponse> Update(int id, Activity activity) {
            var updatedActivity = await activityManager.UpdateAsync(id, activity);
            if(!updatedActivity) {
                return new APIResponse($"Failed to update activity {id}", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse($"Successfully updated activity {id}", false, HttpStatusCode.OK);
        }
        // [HttpDelete("{id}")]
        // public async Task<APIResponse> Delete(int id) {
        //     if(!await activityManager.De(id)) {
        //         return new APIResponse("Failed to delete shopping list", true, HttpStatusCode.BadRequest);

        //     }
        //     return new APIResponse("Successfully deleted shopping list", false, HttpStatusCode.OK);
        // }
    }
}