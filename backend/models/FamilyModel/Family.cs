
using FamilyPlanner.Models.UserModel;
using FamilyPlanner.Models.WeeklyPlannerModel;

namespace FamilyPlanner.Models.FamilyModel {
    public sealed class Family {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public List<User>? Members { get; set; }
        public List<WeeklyPlanner>? WeeklyPlanners { get; set; }
    }
}