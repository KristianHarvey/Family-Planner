

using FamilyPlanner.Context;
using FamilyPlanner.Db;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models.ActivityModel;
using FamilyPlanner.Models.MealModel;
using FamilyPlanner.Models.PlannedTaskModel;
using FamilyPlanner.Models.ShoppingListModel;
using FamilyPlanner.Models.TaskModel;
using FamilyPlanner.Utils;
using Microsoft.EntityFrameworkCore;

namespace FamilyPlanner.Managers {
    public class PlannedTaskManager : IPlannedTaskManager
    {
        private readonly DatabaseContext database;
        private readonly IContextService contextService;
        public PlannedTaskManager(DatabaseContext context, IContextService contextService) {
            database = context;
            this.contextService = contextService;
        }

        public async Task<PlannedTask> CreateNewPlannedTaskAsync(PlannedTask newPlannedTask) {
            var userId = contextService.GetCurrentUserUid();
            if(userId == null) {
                return null;
            }

            Console.WriteLine(userId);
            var plannedTask = new PlannedTask()
            {
                Name = newPlannedTask.Name,
                Description = newPlannedTask.Description,
                StartDate = newPlannedTask.StartDate,
                EndDate = newPlannedTask.EndDate,
                Status = newPlannedTask.Status,
                Type = newPlannedTask.Type,
                PlannedDayId = newPlannedTask.PlannedDayId,
                UserUid = userId,
                FamilyId = newPlannedTask.FamilyId
            };
            database.PlannedTasks.Add(plannedTask);
            try {
                await database.SaveChangesAsync();
                
            } catch(DbUpdateException) {
                throw;
            }
            return plannedTask;
        }
        public async Task<PlannedTask> CreateForPlannedDay(PlannedTask newPlannedTask, int plannedDayId) {
            var userId = contextService.GetCurrentUserUid();
            if(userId == null) {
                return null;
            }

            Console.WriteLine(userId);
            var plannedTask = new PlannedTask()
            {
                Name = newPlannedTask.Name,
                Description = newPlannedTask.Description,
                StartDate = newPlannedTask.StartDate,
                EndDate = newPlannedTask.EndDate,
                Status = newPlannedTask.Status,
                Type = newPlannedTask.Type,
                PlannedDayId = plannedDayId,
                UserUid = userId,
                FamilyId = newPlannedTask.FamilyId
            };
            database.PlannedTasks.Add(plannedTask);
            try {
                await database.SaveChangesAsync();
                
            } catch(DbUpdateException) {
                throw;
            }
            return plannedTask;
        }
        public async Task<IEnumerable<PlannedTask>> GetAllForPlannedDay(int plannedDayId) {
            var currentUserUid = contextService.GetCurrentUserUid();
            if(currentUserUid == null) {
                return null;
            }
            var plannedTasks = await database.PlannedTasks
                .Where(p => p.UserUid == currentUserUid)
                .Where(p => p.PlannedDayId == plannedDayId)
                .ToListAsync();
            
            return plannedTasks;
        }

        public async Task<IEnumerable<PlannedTask>> GetAllAsync()
        {
            var userId = contextService.GetCurrentUserUid();
            if(userId == null) {
                return null;
            } 
            var plannedTask = await database.PlannedTasks
                .Where(p => p.UserUid == userId)
                .ToListAsync();
                
            return plannedTask;
        }

        public async Task<IEnumerable<PlannedTask>> GetAllStoredAsync()
        {
            var plannedTask = await database.PlannedTasks
                .ToListAsync();
                
            return plannedTask;
        }

        public async Task<PlannedTask> GetByIdAsync(int id)
        {
            var plannedTask = await database.PlannedTasks
                .FirstOrDefaultAsync(p => p.Id == id);
            
            return plannedTask;
        }

        public void RemoveForPlannedDay(List<PlannedTask> plannedTasks) {
            database.PlannedTasks.RemoveRange(plannedTasks);
        }

        public async Task<PlannedTask> UpdateAsync(int id, PlannedTask plannedTask)
        {
            var existingPlannedTask = await GetByIdAsync(id);
            if(existingPlannedTask == null) {
                return null;
            }
            existingPlannedTask.Name = plannedTask.Name;
            existingPlannedTask.Description = plannedTask.Description;
            existingPlannedTask.StartDate = plannedTask.StartDate;
            existingPlannedTask.EndDate = plannedTask.EndDate;
            existingPlannedTask.AssignedTo = plannedTask.AssignedTo;
            existingPlannedTask.Status = plannedTask.Status;
            existingPlannedTask.Type = plannedTask.Type;

            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return existingPlannedTask;     
        }

        public async Task<bool> DeleteByIdAsync(int id) {
            var plannedTask = await GetByIdAsync(id);
            if(plannedTask == null) {
                return false;
            }
            database.PlannedTasks.Remove(plannedTask);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return true;
        }
    }
}