
using FamilyPlanner.Models.ActivityModel;
using FamilyPlanner.Models.MealModel;
using FamilyPlanner.Models.PlannedTaskModel;
using FamilyPlanner.Models.ShoppingListModel;

namespace FamilyPlanner.Models.PlannedDayModel {
    public sealed class PlannedDayDTO {
        public List<PlannedTask>? PlannedTasks { get; set; }
        public List<ShoppingList>? ShoppingLists { get; set; }
        public List<Activity>? Activities { get; set; }
        public List<Meal>? Meals { get; set; }
        public int? FamilyId { get; set; }
    }
}