

using FamilyPlanner.Models.MealModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IMealManager {
        public Task<Meal> CreateAsync(Meal newMeal);
        public Task<Meal> CreateForPlannedDay(Meal newMeal, int plannedDayId);
        public Task<IEnumerable<Meal>> GetAllAsync();
        public Task<Meal> GetByIdAsync(int id);
        public Task<bool> UpdateAsync(int id, Meal meal);
        public void RemoveForPlannedDay(List<Meal> meals);
    }
}