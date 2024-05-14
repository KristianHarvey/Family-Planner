

using FamilyPlanner.Models.ShoppingListModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IShoppingListItemManager {
        public Task<ShoppingListItem> CreateAsync(int shoppingListId, ShoppingListItem newItem);
        public Task<ShoppingListItem> CreateUpdateAsync(int shoppingListId, ShoppingListItem shoppingListItem);
        public Task<IEnumerable<ShoppingListItem>> GetAllForShoppingListAsync(int shoppingLisId);
        public Task<IEnumerable<ShoppingListItem>> GetAllStoredAsync();
        public Task<ShoppingListItem> GetByIdAsync(int id);
        public Task<ShoppingListItem> UpdateAsync(int id, ShoppingListItem item);
    }
}