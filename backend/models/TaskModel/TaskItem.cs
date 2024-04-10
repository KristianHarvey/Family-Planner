
using FamilyPlanner.Models.PlanModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.TaskModel {
    public sealed class TaskItem {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        // public string Priority { get; set; }     // Unsure if i want to use this one
        public DateTime DueDate { get; set; }
        public Plan Plan { get; set; }
        public User AssignedUser { get; set; }
    }
}