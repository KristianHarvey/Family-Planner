
using FamilyPlanner.Models.TaskModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface ITaskItemManager {
        public Task<TaskItem> CreateAsync(TaskItemInput newTask);
        public Task<IEnumerable<TaskItem>> GetAllAsync();
        public Task<TaskItem> GetByIdAsync(int id);
        public Task<bool> UpdateAsync(int id, TaskItemUpdate activity);
    }
}