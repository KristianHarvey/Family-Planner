
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.models {
    public sealed class Image {
        public int Id { get; set; }
        public string? Url { get; set; }
        public string? UserUid { get; set; }
        public User? User { get; set; }
        public Uri? Uri { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? FileType { get; set; }
    }
}