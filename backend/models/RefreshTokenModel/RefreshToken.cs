
namespace FamilyPlanner.Models.RefreshTokenModel {
    public sealed class RefreshToken {
        public int Id { get; set; }
        public string UserUid { get; set; }
        public string Token { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}