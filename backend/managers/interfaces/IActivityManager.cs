
using FamilyPlanner.Models.ActivityModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IActivityManager {
        public Task<Activity> CreateAsync(Activity newActivity);
        public Task<Activity> CreateForPlannedDay(Activity newActivity, int plannedDayId);
        public Task<IEnumerable<Activity>> GetAllAsync();
        public Task<Activity> GetByIdAsync(int id);
        public Task<bool> UpdateAsync(int id, Activity activity);
        public void RemoveForPlannedDay(List<Activity> activities);
    }
}