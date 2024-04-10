
using System.ComponentModel.DataAnnotations;

namespace FamilyPlanner.Models.UserModel {
    public sealed class Credentials {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}