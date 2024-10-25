

using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models;
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.PlannedTaskModel;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace FamilyPlanner.Controllers {
    [Route("/api/[controller]")]
    [ApiController]
    public class PlannedTaskController : ControllerBase {
        private readonly IPlannedTaskManager plannedTaskManager;
        public PlannedTaskController(IPlannedTaskManager plannedTaskManager) {
            this.plannedTaskManager = plannedTaskManager;
        }
        /// <summary>
        /// Create New Planned Task
        /// </summary>
        /// <param name="plannedTask"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<APIResponse> CreateNewPlannedTask(PlannedTask plannedTask) {
            var newPlannedTask = await plannedTaskManager.CreateNewPlannedTaskAsync(plannedTask);
            if(newPlannedTask == null) {
                return new APIResponse("Failed to create new planned task", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(newPlannedTask, "Successfully created a new planned task", false, HttpStatusCode.OK);
        }
        /// <summary>
        /// Get Planned Tasks For Current User By PlannedId
        /// </summary>
        /// <param name="plannedDayId"></param>
        /// <returns></returns>
        [HttpGet("plannedDay/{plannedDayId}")]
        public async Task<APIResponse> GetPlannedTaskForPlannedDay(int plannedDayId) {
            var plannedTasks = await plannedTaskManager.GetAllForPlannedDay(plannedDayId);
            if(plannedTasks == null) {
                return new APIResponse($"Failed to retrieved planned Tasks for planned day: {plannedDayId}", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(plannedTasks, $"Successfully retrieved planned Tasks for planned day: {plannedDayId}", false, HttpStatusCode.OK);
        }
        /// <summary>
        /// Get All Planned Tasks For Current User
        /// </summary>
        /// <returns></returns>
        [HttpGet("user/")]
        public async Task<APIResponse> GetAllPlannedTasksForCurrentUser(int limit = 20, int page = 0) {
            var plannedTasks = await plannedTaskManager.GetAllAsync(limit, page);
            if(plannedTasks == null) {
                return new APIResponse($"Failed to retrieved all planned tasks for current user", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(plannedTasks, $"Successfully retrieved all planned tasks for current user", false, HttpStatusCode.OK);
        }
        /// <summary>
        /// Get All Planned Tasks Stored
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<APIResponse> GetAllPlannedTasksStored() {
            var plans = await plannedTaskManager.GetAllStoredAsync();
            if(plans == null) {
                return new APIResponse("There is no planned tasks stored in database, or something else went wrong", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(plans, "Successfully retrieved all planned tasks", false, HttpStatusCode.OK);
        }
        /// <summary>
        /// Get Planned Task By id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet()]
        [Route("{id}")]
        public async Task<APIResponse> GetPlannedTaskById(int id) {
            var plan = await plannedTaskManager.GetByIdAsync(id);
            if(plan == null) {
                return new APIResponse($"Failed to retrieve planned task with id: {id}", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(plan, $"Successfully retrieved planned task with id: {id}", false, HttpStatusCode.OK);
        }
        /// <summary>
        /// Delete Planned Task By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete()]
        [Route("{id}")]
        public async Task<APIResponse> DeletePlannedDayById(int id) {
            if(!await plannedTaskManager.DeleteByIdAsync(id)) {
                return new APIResponse($"Failed to delete planned task with id: {id}", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse($"Successfully deleted planned task with id: {id}", false, HttpStatusCode.OK);
        }
    }
}