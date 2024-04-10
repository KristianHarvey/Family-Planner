
using FamilyPlanner.Models.ActivityModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IActivityManager {
        public Task<Activity> CreateAsync(ActivityInput newActivity);
        public Task<IEnumerable<Activity>> GetAllAsync();
        public Task<Activity> GetByIdAsync(int id);
        public Task<bool> UpdateAsync(int id, ActivityUpdate activity);
    }
}