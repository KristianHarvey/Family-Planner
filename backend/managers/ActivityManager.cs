

using FamilyPlanner.Db;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models.ActivityModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace FamilyPlanner.Managers {
    public class ActivityManager : IActivityManager
    {
        private readonly DatabaseContext database;
        public ActivityManager(DatabaseContext context) {
            database = context;
        }
        public async Task<Activity> CreateAsync(ActivityInput newActivity)
        {
            Activity activity = new Activity()
            {
                Name = newActivity.Name,
                Description = newActivity.Description ?? "",
                DayKey = newActivity.DayKey
                
            };
            database.Activities.Add(activity);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return activity;
        }

        public Task<IEnumerable<Activity>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Activity> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(int id, ActivityUpdate activity)
        {
            throw new NotImplementedException();
        }
    }
}