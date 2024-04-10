
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.PlanModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.WeeklyPlannerModel {
    public sealed class WeeklyPlanner {
        public int Id { get; set; }
        public string? UserUid { get; set; }
        public int? FamilyId { get; set; }
        public ICollection<Plan>? Plans { get; set; }
    }
}