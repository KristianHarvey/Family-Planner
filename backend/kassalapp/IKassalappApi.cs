
using FamilyPlanner.Models.KassalappModel;

namespace FamilyPlanner.Kassalapp {
    public interface IKassalappApi {
        public Task GetAllProducts();
        public Task<KassalappModel> GetProductById(int id);
        public Task<KassalappModel> GetProductByEan(string ean);
    }
}