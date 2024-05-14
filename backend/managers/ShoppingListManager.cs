
using FamilyPlanner.Context;
using FamilyPlanner.Db;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.ShoppingListModel;
using Microsoft.EntityFrameworkCore;

namespace FamilyPlanner.Managers {
    public class ShoppingListManager : IShoppingListManager
    {
        private readonly IContextService contextService;
        private readonly IShoppingListItemManager itemManager;
        private readonly DatabaseContext database;
        public ShoppingListManager(DatabaseContext context, IContextService contextService, IShoppingListItemManager itemManager) {
            database = context;
            this.contextService = contextService;
            this.itemManager = itemManager;
        }

        public async Task<ShoppingList> CreateUpdateAsync(ShoppingList shoppingList) {
            if(shoppingList.Id == 0) {
                return await CreateAsync(shoppingList);
            } else {
                return await UpdateAsync(shoppingList.Id, shoppingList);
            }
        }

        public async Task<ShoppingList> CreateAsync(ShoppingList newShoppingList)
        {
            var currentUserUid = contextService.GetCurrentUserUid();
            if(currentUserUid == null) {
                return null;
            }

            ShoppingList shoppingList = new()
            {
                Name = newShoppingList.Name,
                FamilyId = newShoppingList.FamilyId,
                UserUid = currentUserUid,
            };
            database.ShoppingLists.Add(shoppingList);
            await database.SaveChangesAsync();

            var items = new List<ShoppingListItem>();
            if(newShoppingList.Items != null) {
                foreach(var item in newShoppingList.Items) {
                    var createdItem = await itemManager.CreateAsync(shoppingList.Id, item);
                    items.Add(createdItem);
                }
            }
            shoppingList.Items = items;

            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return shoppingList;
        }

        public async Task<ShoppingList> CreateForPlannedDay(ShoppingList newShoppingList, int plannedDayId)
        {
            var currentUserUid = contextService.GetCurrentUserUid();
            if(currentUserUid == null) {
                return null;
            }
            ShoppingList shoppingList = new()
            {
                FamilyId = newShoppingList.FamilyId,
                UserUid = currentUserUid,
                PlannedDayId = plannedDayId
            };
            database.ShoppingLists.Add(shoppingList);
            await database.SaveChangesAsync();
            var items = new List<ShoppingListItem>();
            if(newShoppingList.Items != null) {
                foreach(var item in newShoppingList.Items) {
                    var createdItem = await itemManager.CreateAsync(shoppingList.Id, item);
                    items.Add(createdItem);
                }
            }
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return shoppingList;
        }

        public async Task<IEnumerable<ShoppingList>> GetAllAsync()
        {
            var currentUserUid = contextService.GetCurrentUserUid();
            if(currentUserUid == null) {
                return null;
            }
            var shoppingLists = await database.ShoppingLists
                .Where(s => s.UserUid == currentUserUid)
                .Include(s => s.Items)
                .Include(s => s.PlannedDay)
                .ToListAsync();

            return shoppingLists;
        }

        public async Task<IEnumerable<ShoppingList>> GetAllStoredAsync()
        {
            var shoppingLists = await database.ShoppingLists
                .Include(s => s.Items)
                .Include(s => s.PlannedDay)
                .ToListAsync();

            return shoppingLists;
        }

        public async Task<ShoppingList> GetByIdAsync(int id)
        {
            var shoppingList = await database.ShoppingLists
                .Include(s => s.Items)
                .Include(s => s.PlannedDay)
                .FirstOrDefaultAsync(s => s.Id == id);
            
            return shoppingList;
        }

        public void RemoveForPlannedDay(List<ShoppingList> shoppingLists)
        {
            database.ShoppingLists.RemoveRange(shoppingLists);
        }

        public async Task<ShoppingList> UpdateAsync(int id, ShoppingList shoppingList)
        {
            var existingShoppingList = await GetByIdAsync(id);
            if(existingShoppingList == null) {
                return null;
            }
            var createdOrUpdatedItems = new List<ShoppingListItem>();
            if(shoppingList.Items != null) {
                foreach(var item in shoppingList.Items) {
                    var createdUpdatedItem = await itemManager.CreateUpdateAsync(existingShoppingList.Id, item);
                    Console.WriteLine($"Item: id: {item.Id}, name: {item.Name}");
                    if(createdUpdatedItem != null) {
                        createdOrUpdatedItems.Add(createdUpdatedItem);
                    }
                }

            }
            existingShoppingList.FamilyId = shoppingList.FamilyId;
            existingShoppingList.Items = createdOrUpdatedItems;

            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return existingShoppingList;
        }

        public async Task<bool> DeleteByIdAsync(int id)
        {
            var shoppingList = await GetByIdAsync(id);
            if(shoppingList == null) {
                return false;
            }
            database.ShoppingLists.Remove(shoppingList);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return true;
        }
    }
}