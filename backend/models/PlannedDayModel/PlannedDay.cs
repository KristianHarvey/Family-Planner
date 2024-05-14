
using System.Text;
using FamilyPlanner.Models.ActivityModel;
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.MealModel;
using FamilyPlanner.Models.PlannedTaskModel;
using FamilyPlanner.Models.ShoppingListModel;
using FamilyPlanner.Models.TaskModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.PlannedDayModel {
    public sealed class PlannedDay {
        public int Id { get; set; }
        public string DayKey { get; set; }
        public List<PlannedTask>? PlannedTasks { get; set; }
        public List<ShoppingList>? ShoppingLists { get; set; }
        public List<Activity>? Activities { get; set; }
        public List<Meal>? Meals { get; set; }
        public string? UserUid { get; set; }
        public User? User { get; set; }
        public int? FamilyId { get; set; }
        public Family? Family { get; set; }

        public override string ToString()
        {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.AppendLine($"Id: {Id}");
            if(PlannedTasks != null) {
                foreach(var plannedTask in PlannedTasks) {
                    stringBuilder.AppendLine($"Id: {plannedTask.Id}");
                }

            }
            return stringBuilder.ToString();
        }
    }
}