
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models;
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.ShoppingListModel;
using FamilyPlanner.Services;
using FamilyPlanner.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace FamilyPlanner.Controllers {
    [Route("/api/[controller]")]
    [ApiController]
    public class PlannedDayController : ControllerBase {
        private readonly IPlannedDayManager plannedDayManager;
        private readonly IPLannedDayService plannedDayService;
        public PlannedDayController(IPlannedDayManager plannedDayManager, IPLannedDayService plannedDayService) {
            this.plannedDayManager = plannedDayManager;
            this.plannedDayService = plannedDayService;
        }
        [Authorize]
        [HttpPost("{dayKey}")]
        public async Task<APIResponse> CreateUpdatePlannedDay(string dayKey, PlannedDay plannedDay) {
            var newOrUpdatedPlannedDay = await plannedDayManager.CreateUpdateAsync(dayKey, plannedDay);
            if(newOrUpdatedPlannedDay == null) {
                return new APIResponse("Failed to create or update planned day", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(newOrUpdatedPlannedDay, "Successfully created or updated planned day", false, HttpStatusCode.OK);
        }
        [Authorize]
        [HttpPost("{dayKey}/shoppinglists")]
        public async Task<APIResponse> CreateUpdateShoppingList(string dayKey, ShoppingList shoppingList) {
            var newOrUpdatedShoppingList = await plannedDayService.CreateUpdateShoppingList(dayKey, shoppingList);
            if(newOrUpdatedShoppingList == null) {
                return new APIResponse("Failed to create or update shopping list", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(newOrUpdatedShoppingList, "Successfully created or updated shopping list", false, HttpStatusCode.OK);
        }

        [HttpDelete("/shoppinglists/{id}")]
        public async Task<APIResponse> DeleteShoppingList(int id) {
            if(!await plannedDayService.DeleteShoppingList(id)) {
                return new APIResponse("Failed to delete shopping list", true, HttpStatusCode.BadRequest);

            }
            return new APIResponse("Successfully deleted shopping list", false, HttpStatusCode.OK);
        }
        /// <summary>
        /// Create New Planned Day
        /// </summary>
        /// <param name="dayKey"></param>
        /// <param name="plannedDay"></param>
        /// <returns></returns>
        // [HttpPost("{dayKey}")]
        // public async Task<APIResponse> CreateNewPlannedDay(string dayKey, PlannedDayDTO plannedDay) {
        //     var newPlannedDay = await plannedDayManager.CreateForDayKeyAsync(dayKey, plannedDay);
        //     if(newPlannedDay == null) {
        //         return new APIResponse("Failed to create new planned day", true, HttpStatusCode.BadRequest);
        //     }
        //     return new APIResponse(newPlannedDay, "Successfully created a new planned day", false, HttpStatusCode.OK);
        // }
        /// <summary>
        /// Get Planned Day For Current User By Day Key
        /// </summary>
        /// <param name="dayKey"></param>
        /// <returns></returns>
        /// 
        [Authorize]
        [HttpGet("dates/{dayKey}")]
        public async Task<APIResponse> GetPlannedDayForCurrentUser(string dayKey) {
            var plannedDay = await plannedDayManager.GetByDayKey(dayKey);
            if(plannedDay == null) {
                return new APIResponse($"Failed to retrieved planned Day for: {dayKey}", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(plannedDay, $"Successfully retrieved planned Day for: {dayKey}", false, HttpStatusCode.OK);
        }
        /// <summary>
        /// Get All Planned Days For Current User
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("user/")]
        public async Task<APIResponse> GetAllPlannedDaysForCurrentUser() {
            var plannedDays = await plannedDayManager.GetAllAsync();
            if(plannedDays == null) {
                return new APIResponse($"Failed to retrieved all planned days for current user", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(plannedDays, $"Successfully retrieved all planned days for current user", false, HttpStatusCode.OK);
        }
        /// <summary>
        /// Get All Planned Days Stored
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<APIResponse> GetAllPlannedDaysStored() {
            var plans = await plannedDayManager.GetAllStoredAsync();
            if(plans == null) {
                return new APIResponse("There is no planned days stored in database, or something else went wrong", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(plans, "Successfully retrieved all planned days", false, HttpStatusCode.OK);
        }
        /// <summary>
        /// Get Planned Day By id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet()]
        [Authorize]
        [Route("{id}")]
        public async Task<APIResponse> GetPlannedDayById(int id) {
            var plan = await plannedDayManager.GetByIdAsync(id);
            if(plan == null) {
                return new APIResponse($"Failed to retrieve planned day with id: {id}", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(plan, $"Successfully retrieved planned day with id: {id}", false, HttpStatusCode.OK);
        }
        /// <summary>
        /// Delete Planned Day By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpDelete()]
        [Route("{id}")]
        public async Task<APIResponse> DeletePlannedDayById(int id) {
            if(!await plannedDayManager.DeleteByIdAsync(id)) {
                return new APIResponse($"Failed to delete planned day with id: {id}", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse($"Successfully deleted planned day with id: {id}", false, HttpStatusCode.OK);
        }
    }
}