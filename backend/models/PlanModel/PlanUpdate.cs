
using FamilyPlanner.Models.ActivityModel;
using FamilyPlanner.Models.MealModel;
using FamilyPlanner.Models.ShoppingListModel;
using FamilyPlanner.Models.TaskModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.PlanModel {
    public sealed class PlanUpdate {
        public string Name { get; set; }
        public DateTime DayKey { get; set; }
        public List<TaskItem>? Tasks { get; set; }
        public List<Activity>? Activities { get; set; }
        public List<Meal>? Meals { get; set; }
        public List<ShoppingList>? ShoppingLists { get; set; }
        public List<User> ForUsers { get; set; }
        public int? WeeklyPlannerId { get; set; }
    }
}