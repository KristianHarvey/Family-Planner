
namespace FamilyPlanner.Models.TokenInfoModel {
    public sealed class TokenInfo {
        public int Id { get; set; }
        public string Uid { get; set; }
        public string Role { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}