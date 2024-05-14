
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.FamilyModel {
    public sealed class FamilyInput {
        public string Name { get; set; }
        public List<User>? Members { get; set; }
        public List<PlannedDay>? PlannedDays { get; set; }
    }
}