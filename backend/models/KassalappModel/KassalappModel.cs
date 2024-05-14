
namespace FamilyPlanner.Models.KassalappModel {
    public sealed class KassalappModel {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Vendor { get; set; }
        public string? EAN { get; set; }
        public string? Url { get; set; }
        public string? ImageUri { get; set; }
        public string? Description { get; set; }
        public string? Ingredients { get; set; }
        public decimal CurrentPrice { get; set; }
        public decimal CurrentUnitPrice { get; set; }
        public decimal? Weight { get; set; }
        public KassalappStore? Store { get; set; }
        public List<KassalappPriceHistory>? PriceHistory { get; set; }
        public List<KassalappAllergen>? Allergens { get; set; }
        public List<KassalappNutrition>? Nutritions { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}