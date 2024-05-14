
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.TaskModel {
    public sealed class TaskItemInput {
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Status { get; set; }
        // public string Priority { get; set; }     // Unsure if i want to use this one
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? CreatedByUid { get; set; }
        public int? PlannedTaskId { get; set; }
        public User? AssignedUser { get; set; }
    }
}