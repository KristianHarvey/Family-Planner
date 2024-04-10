

using FamilyPlanner.Db;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models.PlanModel;
using FamilyPlanner.Utils;
using Microsoft.EntityFrameworkCore;

namespace FamilyPlanner.Managers {
    public class PlanManager : IPlanManager
    {
        private readonly DatabaseContext database;
        private readonly IUserManager userManager;
        public PlanManager(DatabaseContext context, IUserManager userManager) {
            database = context;
            this.userManager = userManager;
        }

        public async Task<Plan> CreateNewPlanAt(string dayKey, PlanInput newPlan) {
            var userId = userManager.GetCurrentUserId();
            if(userId == null) {
                return null;
            } 
            var dateKey = DayKeyUtils.GetDayKey(dayKey);
            Console.WriteLine(userId);
            var plan = new Plan()
            {
                Name = newPlan.Name,
                DayKey = dateKey,
                Tasks = newPlan.Tasks,
                Activities = newPlan.Activities,
                Meals = newPlan.Meals,
                ShoppingLists = newPlan.ShoppingLists,
                UserUid = userId,
                ForUsers = newPlan.ForUsers,
                WeeklyPlannerId = newPlan.WeeklyPlannerId
            };
            database.Plans.Add(plan);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return plan;
        }

        public async Task<IEnumerable<Plan>> GetAllAsync()
        {
            var userId = userManager.GetCurrentUserId();
            if(userId == null) {
                return null;
            } 
            var plans = await database.Plans
                .Where(p => p.UserUid == userId)
                .Include(p => p.Tasks)
                .Include(p => p.Activities)
                .Include(p => p.Meals)
                .Include(p => p.ShoppingLists)
                .Include(p => p.ForUsers)
                .ToListAsync();
                
            return plans;
        }

        public async Task<IEnumerable<Plan>> GetAllStoredAsync()
        {
            var plans = await database.Plans
                .Include(p => p.Tasks)
                .Include(p => p.Activities)
                .Include(p => p.Meals)
                .Include(p => p.ShoppingLists)
                .Include(p => p.ForUsers)
                .ToListAsync();
                
            return plans;
        }

        public async Task<IEnumerable<Plan>> GetAllByDayKey(string dayKey)
        {
            
            var userId = userManager.GetCurrentUserId();
            if(userId == null) {
                return null;
            }
            var datekey = DayKeyUtils.GetDayKey(dayKey); 
            var plan = await database.Plans
                .Where(p => p.UserUid == userId)
                .Where(p => p.DayKey == datekey)
                .ToListAsync();
            
            return plan;
        }

        public async Task<Plan> GetByIdAsync(int id)
        {
            var plan = await database.Plans
                .Include(p => p.Tasks)
                .Include(p => p.Activities)
                .Include(p => p.Meals)
                .Include(p => p.ShoppingLists)
                .Include(p => p.ForUsers)
                .FirstOrDefaultAsync(p => p.Id == id);
            
            return plan;
        }

        public async Task<Plan> UpdateAsync(int id, PlanUpdate plan)
        {
            var existingPlan = await GetByIdAsync(id);
            if(existingPlan == null) {
                return null;
            }
            existingPlan.Name = plan.Name;
            existingPlan.DayKey = plan.DayKey;
            existingPlan.Tasks = plan.Tasks;
            existingPlan.Activities = plan.Activities;
            existingPlan.Meals = plan.Meals;
            existingPlan.ShoppingLists = plan.ShoppingLists;
            existingPlan.ForUsers = plan.ForUsers;
            existingPlan.WeeklyPlannerId = plan.WeeklyPlannerId;

            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return existingPlan;     
        }
    }
}