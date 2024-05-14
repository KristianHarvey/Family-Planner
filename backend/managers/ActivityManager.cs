

using FamilyPlanner.Context;
using FamilyPlanner.Db;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models.ActivityModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace FamilyPlanner.Managers {
    public class ActivityManager : IActivityManager
    {
        private readonly IContextService contextService;
        private readonly DatabaseContext database;
        public ActivityManager(DatabaseContext context, IContextService contextService) {
            database = context;
            this.contextService = contextService;
        }
        public async Task<Activity> CreateAsync(Activity newActivity)
        {
            var currentUserUid = contextService.GetCurrentUserUid();
            Activity activity = new Activity()
            {
                Name = newActivity.Name,
                Description = newActivity.Description ?? "",
                UserUid = currentUserUid,
                Users = newActivity.Users ?? [],
                PlannedDayId = newActivity.PlannedDayId
                
            };
            database.Activities.Add(activity);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return activity;
        }

        public async Task<Activity> CreateForPlannedDay(Activity newActivity, int plannedDayId)
        {
            var currentUserUid = contextService.GetCurrentUserUid();
            Activity activity = new Activity()
            {
                Name = newActivity.Name,
                Description = newActivity.Description ?? "",
                UserUid = currentUserUid,
                Users = newActivity.Users ?? [],
                PlannedDayId = plannedDayId
                
            };
            database.Activities.Add(activity);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return activity;
        }

        public async Task<IEnumerable<Activity>> GetAllAsync()
        {
            var activities = await database.Activities
                .Include(a => a.Users)
                .ToListAsync();
            
            return activities;
        }

        public async Task<Activity> GetByIdAsync(int id)
        {
            var activity = await database.Activities
                .Include(a => a.Users)
                .FirstOrDefaultAsync(a => a.Id == id);

            return activity;
        }

        public void RemoveForPlannedDay(List<Activity> activities)
        {
            database.Activities.RemoveRange(activities);
        }

        public Task<bool> UpdateAsync(int id, Activity activity)
        {
            throw new NotImplementedException();
        }
    }
}