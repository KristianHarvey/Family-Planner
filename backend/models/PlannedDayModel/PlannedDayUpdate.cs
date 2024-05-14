
using FamilyPlanner.Models.ActivityModel;
using FamilyPlanner.Models.MealModel;
using FamilyPlanner.Models.PlannedTaskModel;
using FamilyPlanner.Models.ShoppingListModel;
using FamilyPlanner.Models.TaskModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.PlannedDayModel {
    public sealed class PlannedDayUpdate {
        public List<PlannedTask>? PlannedTasks { get; set; }
        public List<ShoppingList>? ShoppingLists { get; set; }
        public List<Activity>? Activities { get; set; }
        public List<Meal>? Meals { get; set; }
    }
}