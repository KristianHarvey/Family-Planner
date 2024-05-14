
using FamilyPlanner.Db;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models.ShoppingListModel;
using Microsoft.EntityFrameworkCore;

namespace FamilyPlanner.Managers {
    public class ShoppingListItemManager : IShoppingListItemManager
    {
        private readonly DatabaseContext database;
        public ShoppingListItemManager(DatabaseContext context) {
            database = context;
        }

        public async Task<ShoppingListItem> CreateUpdateAsync(int shoppingListId, ShoppingListItem shoppingListItem) {
            if(!database.ShoppingListItems.Contains(shoppingListItem)) {
                return await CreateAsync(shoppingListId, shoppingListItem);
            }
            else {
                return await UpdateAsync(shoppingListItem.Id, shoppingListItem);
            }
        }

        public async Task<ShoppingListItem> CreateAsync(int shoppingListId, ShoppingListItem newItem)
        {
            ShoppingListItem item = new()
            {
                Id = newItem.Id,
                Name = newItem.Name,
                Quantity = newItem.Quantity,
                EAN = newItem.EAN ?? "",
                Url = newItem.Url ?? "",
                Image = newItem.Image ?? "",
                Description = newItem.Description ?? "",
                Ingredients = newItem.Ingredients ?? "",
                CurrentPrice = newItem.CurrentPrice ?? 0,
                CurrentUnitPrice = newItem.CurrentUnitPrice ?? 0,
                PriceHistory = newItem.PriceHistory,
                Allergens = newItem.Allergens,
                Nutritions = newItem.Nutritions,
                CreatedAt = newItem.CreatedAt ?? DateTime.Now,
                UpdatedAt = newItem.UpdatedAt ?? DateTime.Now,
                ShoppingListId = shoppingListId

            };
            database.ShoppingListItems.Add(item);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return item;
        }

        public async Task<IEnumerable<ShoppingListItem>> GetAllForShoppingListAsync(int shoppingListId)
        {
            var items = await database.ShoppingListItems
                .Where(s => s.ShoppingListId == shoppingListId)
                .ToListAsync();

            return items;
        }

        public async Task<IEnumerable<ShoppingListItem>> GetAllStoredAsync()
        {
            var items = await database.ShoppingListItems.ToListAsync();
            return items;
        }

        public async Task<ShoppingListItem> GetByIdAsync(int id)
        {
            var item = await database.ShoppingListItems.FindAsync(id);
            return item;
        }

        public async Task<ShoppingListItem> UpdateAsync(int id, ShoppingListItem item)
        {
            var existingItem = await GetByIdAsync(id);
            if(existingItem == null) {
                return null;
            }
            existingItem.Name = item.Name;
            existingItem.Quantity = item.Quantity;
            existingItem.EAN = item.EAN ?? "";
            existingItem.Url = item.Url ?? "";
            existingItem.Image = item.Image ?? "";
            existingItem.Description = item.Description ?? "";
            existingItem.Ingredients = item.Ingredients ?? "";
            existingItem.CurrentPrice = item.CurrentPrice ?? 0;
            existingItem.CurrentUnitPrice = item.CurrentUnitPrice ?? 0;
            existingItem.PriceHistory = item.PriceHistory ?? new List<Models.KassalappModel.KassalappPriceHistory>();
            existingItem.Allergens = item.Allergens ?? new List<Models.KassalappModel.KassalappAllergen>();
            existingItem.Nutritions = item.Nutritions ?? new List<Models.KassalappModel.KassalappNutrition>();
            existingItem.CreatedAt = item.CreatedAt ?? DateTime.Now;
            existingItem.UpdatedAt = item.UpdatedAt ?? DateTime.Now;
            existingItem.ShoppingListId = item.ShoppingListId;

            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return existingItem;
        }
    }
}