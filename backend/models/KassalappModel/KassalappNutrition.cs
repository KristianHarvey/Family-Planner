
namespace FamilyPlanner.Models.KassalappModel {
    public sealed class KassalappNutrition {
        public int Id { get; set; }
        public string? Code { get; set; }
        public string? DisplayName { get; set; }
        public decimal? Amount { get; set; }
        public string? Unit { get; set; }
    }
}