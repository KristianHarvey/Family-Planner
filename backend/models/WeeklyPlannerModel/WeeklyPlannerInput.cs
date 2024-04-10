
using FamilyPlanner.Models.PlanModel;

namespace FamilyPlanner.Models.WeeklyPlannerModel {
    public sealed class WeeklyPlannerInput {
        public int? FamilyId { get; set; }
        public ICollection<Plan>? Plans { get; set; }
    }
}