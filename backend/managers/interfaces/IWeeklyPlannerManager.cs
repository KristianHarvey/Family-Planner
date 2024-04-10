
using FamilyPlanner.Models.PlanModel;
using FamilyPlanner.Models.WeeklyPlannerModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IWeeklyPlannerManager {
        public Task<WeeklyPlanner> CreateAsync(WeeklyPlannerInput newWeeklyPlan);
        public Task<IEnumerable<WeeklyPlanner>> GetAllAsync();
        public Task<WeeklyPlanner> GetByIdAsync(int id);
        public Task<WeeklyPlanner> UpdateAsync(int id, WeeklyPlannerUpdate weeklyPlan);
    }
}