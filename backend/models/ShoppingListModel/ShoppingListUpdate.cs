
namespace FamilyPlanner.Models.ShoppingListModel {
    public sealed class ShoppingListUpdate {
        public int? FamilyId { get; set; }
        public List<ShoppingListItemInput> Items { get; set; }
        public int? PlannedDayId { get; set; }
    }
}