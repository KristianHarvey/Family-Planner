
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.RecipeModel {
    public sealed class Recipe {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<string>? Ingredients { get; set; }
        public List<string>? Steps { get; set; }
        public string? ShortDescription { get; set; }
        public string? Description { get; set; }
        public int? CreatorId { get; set; }
        public User? Creator { get; set; }
    }
}