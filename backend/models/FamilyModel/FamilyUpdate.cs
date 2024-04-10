
using FamilyPlanner.Models.UserModel;
using FamilyPlanner.Models.WeeklyPlannerModel;

namespace FamilyPlanner.Models.FamilyModel {
    public sealed class FamilyUpdate {
        public List<User>? Members { get; set; }
        public List<WeeklyPlanner>? WeeklyPlanners { get; set; }
    }
}