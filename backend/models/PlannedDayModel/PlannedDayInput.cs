
using FamilyPlanner.Models.ActivityModel;
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.MealModel;
using FamilyPlanner.Models.PlannedTaskModel;
using FamilyPlanner.Models.ShoppingListModel;
using FamilyPlanner.Models.TaskModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.PlannedDayModel {
    public sealed class PlannedDayInput {
        public List<PlannedTaskInput>? PlannedTasks { get; set; }
        public List<ShoppingListInput>? ShoppingLists { get; set; }
        public List<ActivityInput>? Activities { get; set; }
        public List<MealInput>? Meals { get; set; }
        public int? FamilyId { get; set; }
    }
}