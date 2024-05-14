
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.PlannedTaskModel;
using FamilyPlanner.Models.RecipeModel;

namespace FamilyPlanner.Models.MealModel {
    public sealed class Meal {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int? RecipeId { get; set; }
        public Recipe? Recipe {get; set; }
        public int? PlannedDayId { get; set; }
        public PlannedDay? PlannedDay { get; set; }
    }
}