
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.InviteModel {
    public class Invite {
        public int Id { get; set; }
        public string FromUserUid { get; set; }
        public User? FromUser { get; set; }
        public string ToUserUid { get; set; }
        public User? ToUser { get; set; }
        public string? Status { get; set; }
        public int ToFamilyId { get; set; }
        public Family? Family { get; set; }
    }
}