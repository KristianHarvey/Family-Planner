
namespace FamilyPlanner.Models.ShoppingListModel {
    public sealed class ShoppingListInput {
        public int? FamilyId { get; set; }
        public List<ShoppingListItem> Items { get; set; }
        public int? PlannedDayId { get; set; }
    }
}