
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models;
using FamilyPlanner.Models.PlanModel;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace FamilyPlanner.Controllers {
    [Route("/api/[controller]")]
    [ApiController]
    public class PlanController : ControllerBase {
        private readonly IPlanManager planManager;
        public PlanController(IPlanManager planManager) {
            this.planManager = planManager;
        }
        [HttpPost("{dayKey}")]
        public async Task<APIResponse> CreatePlan(string dayKey, PlanInput plan) {
            var newPlan = await planManager.CreateNewPlanAt(dayKey, plan);
            if(newPlan == null) {
                return new APIResponse("Failed to create new plan", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(newPlan, "Successfully created a new plan", false, HttpStatusCode.OK);
        }

        [HttpGet("{dayKey}")]
        public async Task<APIResponse> GetPlanByDayKey(string dayKey) {
            var plans = await planManager.GetAllByDayKey(dayKey);
            if(plans == null) {
                return new APIResponse($"Failed to retrieved all plans for: {dayKey}", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(plans, $"Successfully retrieved all plans for: {dayKey}", false, HttpStatusCode.OK);
        }

        [HttpGet]
        public async Task<APIResponse> GetAllPlans() {
            var plans = await planManager.GetAllStoredAsync();
            if(plans == null) {
                return new APIResponse("There is no plans stored in database, or something else went wrong", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(plans, "Successfully retrieved all plans", false, HttpStatusCode.OK);
        }
    }
}