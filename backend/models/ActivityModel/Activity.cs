
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.PlannedTaskModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.ActivityModel {
    public sealed class Activity {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Completed { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? UserUid { get; set; }
        public List<User>? Users { get; set; }
        public int? FamilyId { get; set; }
        public Family? Family { get; set; }
        public int? PlannedDayId { get; set; }
        public PlannedDay? PlannedDay { get; set; }
    }
}