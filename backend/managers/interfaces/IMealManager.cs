

using FamilyPlanner.Models.MealModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IMealManager {
        public Task<Meal> CreateAsync(MealInput newMeal);
        public Task<IEnumerable<Meal>> GetAllAsync();
        public Task<Meal> GetByIdAsync(int id);
        public Task<bool> UpdateAsync(int id, MealUpdate meal);
    }
}