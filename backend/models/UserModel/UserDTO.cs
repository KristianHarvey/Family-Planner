
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.PlannedDayModel;

namespace FamilyPlanner.Models.UserModel {
    public class UserDTO {
        public int Id { get; set; }
        public string Uid { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public List<Family>? Families { get; set; }
        public List<PlannedDay>? PlannedDays { get; set; }
    }
}