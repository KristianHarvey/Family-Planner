

using FamilyPlanner.Db;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models.MealModel;
using Microsoft.EntityFrameworkCore;

namespace FamilyPlanner.Managers {
    public class MealManager : IMealManager
    {
        private readonly DatabaseContext database;
        public MealManager(DatabaseContext context) {
            database = context;
        }
        public async Task<Meal> CreateAsync(Meal newMeal)
        {
            Meal meal = new()
            {
                Name = newMeal.Name,
                Description = newMeal.Description ?? "",
                RecipeId = newMeal.RecipeId,
            };
            database.Meals.Add(meal);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return meal;
        }

        public async Task<Meal> CreateForPlannedDay(Meal newMeal, int plannedDayId)
        {
            Meal meal = new()
            {
                Name = newMeal.Name,
                Description = newMeal.Description ?? "",
                RecipeId = newMeal.RecipeId,
                PlannedDayId = plannedDayId
            };
            database.Meals.Add(meal);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return meal;
        }

        public async Task<IEnumerable<Meal>> GetAllAsync()
        {
            var meals = await database.Meals
                .Include(m => m.Recipe)
                .ToListAsync();
            
            return meals;
        }

        public async Task<Meal> GetByIdAsync(int id)
        {
            var meal = await database.Meals
                .Include(m => m.Recipe)
                .FirstOrDefaultAsync(m => m.Id == id);

            return meal;
        }

        public void RemoveForPlannedDay(List<Meal> meals)
        {
            database.Meals.RemoveRange(meals);
        }

        public async Task<bool> UpdateAsync(int id, Meal meal)
        {
            var existingMeal = await GetByIdAsync(id);
            bool success;
            if(existingMeal == null) {
                success = false;
            } else {
                existingMeal.Name = meal.Name;
                existingMeal.Description = meal.Description ?? "";
                existingMeal.RecipeId = meal.RecipeId;
            }
            try {
                await database.SaveChangesAsync();
                success = true;
            } catch(DbUpdateException) {
                success = false;
                throw;
            }
            return success;
        }
    }
}