
using FamilyPlanner.Models.PlanModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.ActivityModel {
    public sealed class ActivityUpdate {
        public DateTime DayKey { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<User> Users { get; set; }
        public int? PlanId { get; set; }
        public Plan? Plan { get; set; }
    }
}