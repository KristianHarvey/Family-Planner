

using System.Net.Http.Headers;
using FamilyPlanner.Context;
using FamilyPlanner.Db;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models.ActivityModel;
using FamilyPlanner.Models.MealModel;
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.PlannedTaskModel;
using FamilyPlanner.Models.ShoppingListModel;
using FamilyPlanner.Models.TaskModel;
using FamilyPlanner.Utils;
using Microsoft.EntityFrameworkCore;

namespace FamilyPlanner.Managers {
    public class PlannedDayManager : IPlannedDayManager
    {
        private readonly DatabaseContext database;
        private readonly IActivityManager activityManager;
        private readonly IShoppingListManager shoppingListManager;
        private readonly IMealManager mealManager;
        private readonly IPlannedTaskManager plannedTaskManager;
        private readonly IContextService contextService;
        public PlannedDayManager(DatabaseContext context, IContextService contextService, IPlannedTaskManager plannedTaskManager, IActivityManager activityManager, IMealManager mealManager, IShoppingListManager shoppingListManager) {
            database = context;
            // this.userManager = userManager;
            this.plannedTaskManager = plannedTaskManager;
            this.activityManager = activityManager;
            this.mealManager = mealManager;
            this.shoppingListManager = shoppingListManager;
            this.contextService = contextService;
        }

        public async Task<PlannedDay> CreateUpdateAsync(string dayKey, PlannedDay plannedDay) {
            var existingPlannedDay = await GetByDayKey(dayKey);
            if(existingPlannedDay != null) {
                    existingPlannedDay = await UpdateAsync(existingPlannedDay.Id, plannedDay);
            } else {
                if(plannedDay != null) {
                    existingPlannedDay = await CreateForDayKeyAsync(dayKey, plannedDay);

                }
            }
            return existingPlannedDay;
        }

        public async Task<PlannedDay> CreateForDayKeyAsync(string dayKey, PlannedDay newPlannedDay) {
            var userId = contextService.GetCurrentUserUid();
            if(userId == null) {
                return null;
            }

            var plannedDay = new PlannedDay()
            {
                DayKey = dayKey,
                UserUid = userId,
                FamilyId = newPlannedDay.FamilyId,
            };
            database.PlannedDays.Add(plannedDay);
            await database.SaveChangesAsync();
            var plannedTasks = new List<PlannedTask>();
            if(newPlannedDay.PlannedTasks != null) {
                foreach(var plannedTask in newPlannedDay.PlannedTasks) {
                    var createdPlannedTask = await plannedTaskManager.CreateForPlannedDay(plannedTask, plannedDay.Id);
                    Console.WriteLine(createdPlannedTask.ToString());
                    plannedTasks.Add(createdPlannedTask);
                }
            }

            var activities = new List<Activity>();
            if(newPlannedDay.Activities != null) {
                foreach(var activity in newPlannedDay.Activities) {
                    var createdActivity = await activityManager.CreateForPlannedDay(activity, plannedDay.Id);
                    activities.Add(createdActivity);
                }
            }
        
            var meals = new List<Meal>();
            if(newPlannedDay.Meals != null) {
                foreach(var meal in newPlannedDay.Meals) {
                    var createdMeal = await mealManager.CreateForPlannedDay(meal, plannedDay.Id);
                    meals.Add(createdMeal);
                }
            }
            
            var shoppingLists = new List<ShoppingList>();
            if(newPlannedDay.ShoppingLists != null) {
                foreach(var shoppingList in newPlannedDay.ShoppingLists) {
                    var createdShoppingList = await shoppingListManager.CreateForPlannedDay(shoppingList, plannedDay.Id);
                    shoppingLists.Add(createdShoppingList);
                }
            }
            plannedDay.Activities = activities;
            plannedDay.PlannedTasks = plannedTasks;
            plannedDay.ShoppingLists = shoppingLists;
            plannedDay.Meals = meals;
            
            try {
                await database.SaveChangesAsync();
                
            } catch(DbUpdateException) {
                throw;
            }
            return plannedDay;
        }

        public async Task<IEnumerable<PlannedDay>> GetAllAsync()
        {
            var userId = contextService.GetCurrentUserUid();
            if(userId == null) {
                return null;
            } 
            var plannedDays = await database.PlannedDays
                .Where(p => p.UserUid == userId)
                .Include(p => p.PlannedTasks)
                .Include(p => p.ShoppingLists)
                .Include(p => p.Activities)
                .Include(p => p.Meals)
                .ToListAsync();
                
            return plannedDays;
        }

        public async Task<IEnumerable<PlannedDay>> GetAllStoredAsync()
        {
            var plannedDays = await database.PlannedDays
                .Include(p => p.PlannedTasks)
                .Include(p => p.ShoppingLists)
                .Include(p => p.Activities)
                .Include(p => p.Meals)
                .ToListAsync();
                
            return plannedDays;
        }

        public async Task<PlannedDay> GetByDayKey(string dayKey)
        {
            var userId = contextService.GetCurrentUserUid();
            if(userId == null) {
                return null;
            }
            var plannedDay = await database.PlannedDays
                .Where(p => p.UserUid == userId)
                .Where(p => p.DayKey == dayKey)
                .Include(p => p.PlannedTasks)
                .Include(p => p.ShoppingLists!)
                    .ThenInclude(s => s.Items)
                .Include(p => p.Activities)
                .Include(p => p.Meals)
                .FirstOrDefaultAsync();

            if(plannedDay != null) {
                Console.WriteLine($"Planned day: {plannedDay.Id}, dayKey: {dayKey}");
                Console.WriteLine($"Shopping Lists: {plannedDay.ShoppingLists!.Count}");

            }
            return plannedDay;
        }

        public async Task<PlannedDay> GetByIdAsync(int id)
        {
            var plannedDay = await database.PlannedDays
                .Include(p => p.PlannedTasks)
                .Include(p => p.ShoppingLists)
                .Include(p => p.Activities)
                .Include(p => p.Meals)
                .FirstOrDefaultAsync(p => p.Id == id);
            
            return plannedDay;
        }

        public async Task<PlannedDay> UpdateAsync(int id, PlannedDay plannedDay)
        {
            var existingPlannedDay = await GetByIdAsync(id);
            if(existingPlannedDay == null) {
                return null;
            }

            var userId = contextService.GetCurrentUserUid();
            if(userId == null) {
                return null;
            }
            // Update PlannedTasks
            if(plannedDay.PlannedTasks != null) {
                foreach(var plannedTask in plannedDay.PlannedTasks) {
                    if(plannedTask.Id == 0) {
                        var createdPlannedTask = await plannedTaskManager.CreateForPlannedDay(plannedTask, plannedDay.Id);
                        existingPlannedDay.PlannedTasks!.Add(createdPlannedTask);
                    } else {
                        var existingTask = existingPlannedDay.PlannedTasks!.FirstOrDefault(t => t.Id == plannedTask.Id);
                        if(existingTask != null && !existingTask.Equals(plannedTask)) {
                            await plannedTaskManager.UpdateAsync(plannedTask.Id, plannedTask);
                        }
                    }
                }
            }

            // Update Meals
            if(plannedDay.Meals != null) {
                foreach(var meal in plannedDay.Meals) {
                    if(meal.Id == 0) {
                        await mealManager.CreateForPlannedDay(meal, plannedDay.Id);
                        existingPlannedDay.Meals!.Add(meal);
                    } else {
                        var existingMeal = existingPlannedDay.Meals!.FirstOrDefault(m => m.Id == meal.Id);
                        if(existingMeal != null && !existingMeal.Equals(meal)) {
                            await mealManager.UpdateAsync(meal.Id, meal);
                        }
                    }
                }
            }

            // Update Activities
            if(plannedDay.Activities != null) {
                foreach(var activity in plannedDay.Activities) {
                    if(activity.Id == 0) {
                        await activityManager.CreateForPlannedDay(activity, plannedDay.Id);
                        existingPlannedDay.Activities!.Add(activity);
                    } else {
                        var existingActivity = existingPlannedDay.Activities!.FirstOrDefault(a => a.Id == activity.Id);
                        if(existingActivity != null && !existingActivity.Equals(activity)) {
                            await activityManager.UpdateAsync(activity.Id, activity);
                        }
                    }
                }
            }
            if(plannedDay.ShoppingLists != null) {
                foreach(var shoppingList in plannedDay.ShoppingLists) {
                    if(shoppingList.Id == 0) {
                        await shoppingListManager.CreateForPlannedDay(shoppingList, plannedDay.Id);
                        existingPlannedDay.ShoppingLists!.Add(shoppingList);
                    } else {
                        var existingShoppingList = existingPlannedDay.Activities!.FirstOrDefault(a => a.Id == shoppingList.Id);
                        if(existingShoppingList != null && !existingShoppingList.Equals(shoppingList)) {
                            await shoppingListManager.UpdateAsync(shoppingList.Id, shoppingList);
                        }
                    }
                }
            }
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return existingPlannedDay;     
        }

        public async Task<bool> DeleteByIdAsync(int id) {
            var plannedDay = await GetByIdAsync(id);
            if(plannedDay == null) {
                return false;
            }
            database.PlannedDays.Remove(plannedDay);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return true;
        }
    }
}