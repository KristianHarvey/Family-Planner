
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.ActivityModel {
    public sealed class ActivityUpdate {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<User>? Users { get; set; }
        public int? PlannedDayId { get; set; }
    }
}