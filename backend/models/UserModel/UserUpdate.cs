
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.PlannedTaskModel;

namespace FamilyPlanner.Models.UserModel {
    public sealed class UserUpdate {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public List<Family>? Families { get; set; }
        public List<PlannedDay>? PlannedDays { get; set; }
        public List<PlannedTask>? AssignedTasks { get; set; }
    }
}