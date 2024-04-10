
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.WeeklyPlannerModel;

namespace FamilyPlanner.Models.UserModel {
    public sealed class UserUpdate {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public List<Family>? Families { get; set; }
        public List<WeeklyPlanner>? WeeklyPlanners { get; set; }
    }
}