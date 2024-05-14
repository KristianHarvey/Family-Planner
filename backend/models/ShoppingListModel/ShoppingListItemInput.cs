
namespace FamilyPlanner.Models.ShoppingListModel {
    public sealed class ShoppingListItemInput {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public int? ShoppingListId { get; set; }
    }
}