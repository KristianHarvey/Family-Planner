
using FamilyPlanner.Models.PlannedTaskModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.TaskModel {
    public sealed class TaskItem {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Status { get; set; }
        // public string Priority { get; set; }     // Unsure if i want to use this one
        public string? CreatedByUid { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? PlannedTaskId { get; set; }
        public PlannedTask? PlannedTask { get; set; }
        public User? AssignedUser { get; set; }
        public override string ToString() {
            return $"id: {Id}, name: {Name}, description: {Description}, created By: {CreatedByUid}, startDate: {StartDate}, endDate: {EndDate}, planId: {PlannedTaskId}, assignedUser: {AssignedUser}";
        }
    }

}