
using FamilyPlanner.Models.RecipeModel;

namespace FamilyPlanner.Models.MealModel {
    public sealed class MealInput {
        public string Name { get; set; }
        public string? Description { get; set; }
        public int? RecipeId { get; set; }
        public Recipe? Recipe {get; set; }

    }
}