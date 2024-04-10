

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
        public async Task<Meal> CreateAsync(MealInput newMeal)
        {
            Meal meal = new()
            {
                Name = newMeal.Name,
                Description = newMeal.Description ?? "",
                RecipeId = newMeal.RecipeId,
                Recipe = newMeal.Recipe
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

        public async Task<bool> UpdateAsync(int id, MealUpdate meal)
        {
            var existingMeal = await GetByIdAsync(id);
            bool success;
            if(existingMeal == null) {
                success = false;
            } else {
                existingMeal.Name = meal.Name;
                existingMeal.Description = meal.Description ?? "";
                existingMeal.RecipeId = meal.RecipeId;
                existingMeal.Recipe = meal.Recipe;
                database.Meals.Update(existingMeal);
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