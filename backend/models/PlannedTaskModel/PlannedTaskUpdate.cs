
using FamilyPlanner.Models.ActivityModel;
using FamilyPlanner.Models.MealModel;
using FamilyPlanner.Models.ShoppingListModel;
using FamilyPlanner.Models.TaskModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.PlannedTaskModel {
    public class PlannedTaskUpdate {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? Status { get; set; }
        public User? AssignedTo { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Type { get; set; }
    }
}