

using FamilyPlanner.Context;
using FamilyPlanner.Db;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models.TaskModel;
using Microsoft.EntityFrameworkCore;

namespace FamilyPlanner.Managers {
    public class TaskItemManager : ITaskItemManager
    {
        private readonly IContextService contextService;
        private readonly DatabaseContext database;
        
        public TaskItemManager(DatabaseContext database, IContextService contextService) {
            this.database = database;
            this.contextService = contextService;
        }
        public async Task<TaskItem> CreateAsync(TaskItemInput newTask)
        {
            var currentUserUid = contextService.GetCurrentUserUid();
            if(currentUserUid == null) {
                return null;
            }
            TaskItem task = new()
            {
                Name = newTask.Name,
                Description = newTask.Description,
                Status = newTask.Status,
                StartDate = newTask.StartDate,
                EndDate = newTask.EndDate,
                CreatedByUid = currentUserUid,
                PlannedTaskId = newTask.PlannedTaskId,
                AssignedUser = newTask.AssignedUser
            };
            database.Tasks.Add(task);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return task;
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync()
        {
            var currentUserUid = contextService.GetCurrentUserUid();
            var tasks = await database.Tasks
                .Where(t => t.CreatedByUid == currentUserUid)
                .Include(t => t.AssignedUser)
                .ToListAsync();
            
            return tasks;
        }

        public async Task<TaskItem> GetByIdAsync(int id)
        {
            var task = await database.Tasks
                .Include(t => t.AssignedUser)
                .FirstOrDefaultAsync(t => t.Id == id);

            return task;
        }

        public Task<bool> UpdateAsync(int id, TaskItemUpdate activity)
        {
            throw new NotImplementedException();
        }
    }

}