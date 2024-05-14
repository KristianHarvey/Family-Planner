
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.FamilyModel {
    public sealed class Family {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? UserUid { get; set; }
        public string? FamilyColor { get; set; }
        public List<User>? Members { get; set; }
        public List<PlannedDay>? PlannedDays { get; set; }
    }
}