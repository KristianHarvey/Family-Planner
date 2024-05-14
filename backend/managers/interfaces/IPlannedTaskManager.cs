
using FamilyPlanner.Models.PlannedTaskModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IPlannedTaskManager {
        public Task<PlannedTask> CreateNewPlannedTaskAsync(PlannedTask newPlannedTask);
        public Task<PlannedTask> CreateForPlannedDay(PlannedTask newPlannedTask, int plannedDayId);
        public Task<IEnumerable<PlannedTask>> GetAllAsync();
        public Task<IEnumerable<PlannedTask>> GetAllStoredAsync();
        public Task<IEnumerable<PlannedTask>> GetAllForPlannedDay(int plannedDayId);
        public Task<PlannedTask> GetByIdAsync(int id);
        public Task<PlannedTask> UpdateAsync(int id, PlannedTask plannedDay);
        public void RemoveForPlannedDay(List<PlannedTask> plannedTasks);
        public Task<bool> DeleteByIdAsync(int id);
    }
}