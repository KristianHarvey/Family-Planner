

using FamilyPlanner.Db;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models.PlanModel;
using FamilyPlanner.Models.WeeklyPlannerModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace FamilyPlanner.Managers {
    public class WeeklyPlannerManager : IWeeklyPlannerManager
    {
        private readonly DatabaseContext database;
        private readonly IUserManager userManager;
        public WeeklyPlannerManager(DatabaseContext context, IUserManager userManager) {
            database = context;
            this.userManager = userManager;
        }
        public async Task<WeeklyPlanner> CreateAsync(WeeklyPlannerInput newWeeklyPlan)
        {
            var userId = userManager.GetCurrentUserId();
            WeeklyPlanner weeklyPlanner = new()
            {
                UserUid = userId,
                FamilyId = newWeeklyPlan.FamilyId,
                Plans = newWeeklyPlan.Plans
            };
            database.WeeklyPlanners.Add(weeklyPlanner);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return weeklyPlanner;
        }

        public async Task<IEnumerable<WeeklyPlanner>> GetAllAsync()
        {
            var userId = userManager.GetCurrentUserId();
            var weeklyPlans = await database.WeeklyPlanners
                .Where(w => w.UserUid == userId)
                .Include(w => w.Plans)
                .ToListAsync();
            return weeklyPlans;
        }

        public async Task<WeeklyPlanner> GetByIdAsync(int id)
        {
            var weeklyPlan = await database.WeeklyPlanners
                .Include(w => w.Plans)
                .FirstOrDefaultAsync(w => w.Id == id);
            return weeklyPlan;
        }

        public async Task<WeeklyPlanner> UpdateAsync(int id, WeeklyPlannerUpdate weeklyPlanner)
        {
            var existingWeeklyPlanner = await GetByIdAsync(id);
            if(existingWeeklyPlanner == null) {
                return null;
            }
            existingWeeklyPlanner.FamilyId = weeklyPlanner.FamilyId;
            existingWeeklyPlanner.Plans = weeklyPlanner.Plans;

            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return existingWeeklyPlanner;
        }
    }
}