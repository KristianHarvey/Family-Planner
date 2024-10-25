
using FamilyPlanner.Models.ActivityModel;
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.MealModel;
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.ShoppingListModel;
using FamilyPlanner.Models.TaskModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.PlannedTaskModel {
    public class PlannedTask {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? Status { get; set; }
        public bool Completed { get; set; }
        public User? AssignedTo { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Type { get; set; }
        public string? UserUid { get; set; }
        public int? PlannedDayId { get; set; }
        public PlannedDay? PlannedDay { get; set; }
        public int? FamilyId { get; set; }
        public Family? Family { get; set; }

        public override string ToString()
        {
            return $"id: {Id}, name: {Name}, description: {Description}";
        }
    }
}