
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.PlannedTaskModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.ShoppingListModel {
    public sealed class ShoppingList {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? FamilyId { get; set; }
        public string? UserUid { get; set; }
        public List<ShoppingListItem>? Items { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? PlannedDayId { get; set; }
        public PlannedDay? PlannedDay { get; set; }
    }
}