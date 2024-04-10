
using FamilyPlanner.Models.PlanModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IPlanManager {
        public Task<Plan> CreateNewPlanAt(string dayKey, PlanInput newPlan);
        public Task<IEnumerable<Plan>> GetAllAsync();
        public Task<IEnumerable<Plan>> GetAllStoredAsync();
        public Task<IEnumerable<Plan>> GetAllByDayKey(string dayKey);
        public Task<Plan> GetByIdAsync(int id);
        public Task<Plan> UpdateAsync(int id, PlanUpdate plan);
    }
}