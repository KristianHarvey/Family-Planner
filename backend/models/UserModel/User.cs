
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.WeeklyPlannerModel;
using Microsoft.EntityFrameworkCore;

namespace FamilyPlanner.Models.UserModel {
    public sealed class User {
        public int Id { get; set; }
        public string Uid { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public List<Family>? Families { get; set; }
        public List<WeeklyPlanner>? WeeklyPlanners { get; set; }
    }
}