
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.PlanModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Models.ShoppingListModel {
    public sealed class ShoppingList {
        public int Id { get; set; }
        public int? FamilyId { get; set; }
        public string? UserUid { get; set; }
        public List<ShoppingListItem> Items { get; set; }
    }
}