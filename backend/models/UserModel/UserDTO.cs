
using FamilyPlanner.models;
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.InviteModel;
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.PlannedTaskModel;

namespace FamilyPlanner.Models.UserModel {
    public class UserDTO {
        public int Id { get; set; }
        public string Uid { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public string Username { get; set; }
        public int? ProfileImageId { get; set; }
        public Image ProfileImage { get; set; }
        public int? SelectedFamilyId { get; set; }
        public Family? SelectedFamily { get; set; }
        public List<Family>? Families { get; set; }
        public List<PlannedDay>? PlannedDays { get; set; }
        public List<PlannedTask>? AssignedTasks { get; set; }
        public List<Invite>? SentInvites { get; set; }
        public List<Invite>? ReceivedInvites { get; set; }
    }
}