
namespace FamilyPlanner.Models.TokenInfoModel {
    public sealed class RefreshToken {
        public string Id { get; set; }
        public string UserUid { get; set; }
        public DateTime? ExpiryDate { get; set; }
    }
}