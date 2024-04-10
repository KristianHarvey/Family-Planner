
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models;
using FamilyPlanner.Models.PlanModel;
using FamilyPlanner.Models.WeeklyPlannerModel;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace FamilyPlanner.Controllers {
    [Route("/api/[controller]")]
    [ApiController]
    public class WeeklyPlannerController : ControllerBase {
        private readonly IWeeklyPlannerManager weeklyPlannerManager;
        public WeeklyPlannerController(IWeeklyPlannerManager weeklyPlannerManager) {
            this.weeklyPlannerManager = weeklyPlannerManager;
        }
        [HttpPost]
        public async Task<APIResponse> CreateNewWeeklyPlanner(WeeklyPlannerInput weeklyPlanner) {
            var newWeeklyPlan = await weeklyPlannerManager.CreateAsync(weeklyPlanner);
            if(newWeeklyPlan == null) {
                return new APIResponse("Something went wrong with creating weekly plan", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(newWeeklyPlan, "Successfully created weekly plan", false, HttpStatusCode.OK);
        }
    }
}