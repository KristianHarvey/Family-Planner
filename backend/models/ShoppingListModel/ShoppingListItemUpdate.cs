
namespace FamilyPlanner.Models.ShoppingListModel {
    public sealed class ShoppingListItemUpdate {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public int? ShoppingListId { get; set; }
    }
}