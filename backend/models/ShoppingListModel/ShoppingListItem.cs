
using FamilyPlanner.Models.KassalappModel;

namespace FamilyPlanner.Models.ShoppingListModel {
    public sealed class ShoppingListItem {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string? EAN { get; set; }
        public string? Url { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }
        public string? Ingredients { get; set; }
        public decimal? CurrentPrice { get; set; }
        public decimal? CurrentUnitPrice { get; set; }
        public List<KassalappPriceHistory>? PriceHistory { get; set; }
        public List<KassalappAllergen>? Allergens { get; set; }
        public List<KassalappNutrition>? Nutritions { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? ShoppingListId { get; set; }
        public ShoppingList? ShoppingList { get; set; }
    }
}