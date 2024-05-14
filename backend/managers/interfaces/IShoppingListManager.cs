
using FamilyPlanner.Models.ShoppingListModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IShoppingListManager {
       public Task<ShoppingList> CreateAsync(ShoppingList newShoppingList);
       public Task<ShoppingList> CreateUpdateAsync(ShoppingList shoppingList);
       public Task<ShoppingList> CreateForPlannedDay(ShoppingList newPlannedTask, int plannedDayId);
        public Task<IEnumerable<ShoppingList>> GetAllAsync();
        public Task<IEnumerable<ShoppingList>> GetAllStoredAsync();
        public Task<ShoppingList> GetByIdAsync(int id);
        public Task<ShoppingList> UpdateAsync(int id, ShoppingList shoppingList);
        public Task<bool> DeleteByIdAsync(int id);
        public void RemoveForPlannedDay(List<ShoppingList> shoppingLists);
    }
}