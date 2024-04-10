
using FamilyPlanner.Models.PlanModel;

namespace FamilyPlanner.Models.WeeklyPlannerModel {
    public sealed class WeeklyPlannerUpdate {
        public int? FamilyId { get; set; }
        public ICollection<Plan>? Plans { get; set; }
    }
}