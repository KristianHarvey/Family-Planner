
using FamilyPlanner.Context;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models.ActivityModel;
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.PlannedTaskModel;
using FamilyPlanner.Models.ShoppingListModel;
using FamilyPlanner.Services.Interfaces;
using FamilyPlanner.Utils;

namespace FamilyPlanner.Services {
    public class PlannedDayService : IPLannedDayService {
        private readonly IPlannedDayManager plannedDayManager;
        private readonly IShoppingListManager shoppingListManager;
        private readonly IActivityManager activityManager;
        private readonly IPlannedTaskManager plannedTaskManager;
        private readonly IContextService contextService;

        public PlannedDayService(IPlannedDayManager plannedDayManager, IPlannedTaskManager plannedTaskManager, IShoppingListManager shoppingListManager, IActivityManager activityManager) {
            this.plannedDayManager = plannedDayManager;
            this.plannedTaskManager = plannedTaskManager;
            this.shoppingListManager = shoppingListManager;
            this.activityManager = activityManager;
        }

        public Task<Activity> CreateUpdateActivity(string dayKey, Activity activity)
        {
            throw new NotImplementedException();
        }

        public Task<PlannedTask> CreateUpdatePlannedTask(string dayKey, PlannedTask plannedTask)
        {
            throw new NotImplementedException();
        }

        public async Task<ShoppingList> CreateUpdateShoppingList(string dayKey, ShoppingList list)
        {
            if(string.IsNullOrEmpty(list.Name)) {
                return null;
            }
            Console.WriteLine(list.Name);
            var createdShoppingList = await shoppingListManager.CreateUpdateAsync(list);
            if(createdShoppingList == null) {
                return null;
            }
            if(createdShoppingList.UserUid == null) {
                return null;
            }
            var plannedDay = await plannedDayManager.GetByDayKey(dayKey);
            if(plannedDay == null) {
                plannedDay = await plannedDayManager.CreateUpdateAsync(dayKey, new PlannedDay()
                {
                    ShoppingLists = new List<ShoppingList>() {createdShoppingList},
                    DayKey = dayKey,
                    UserUid = createdShoppingList.UserUid,
                    FamilyId = createdShoppingList.FamilyId
                });
            } else {
                if(plannedDay.ShoppingLists == null) {
                    plannedDay.ShoppingLists = new List<ShoppingList>();
                }
                plannedDay.ShoppingLists.Add(createdShoppingList);
            }
            await plannedDayManager.UpdateAsync(plannedDay.Id, plannedDay);
            
            createdShoppingList.PlannedDayId = plannedDay.Id;
            var updatedShoppingList = await shoppingListManager.UpdateAsync(createdShoppingList.Id, createdShoppingList);
            return updatedShoppingList;
        }
        public async Task<bool> DeleteShoppingList(int id)
        {
            var shoppingList = await shoppingListManager.GetByIdAsync(id);
            if(shoppingList == null) {
                return false;
            }
            var plannedDayId = shoppingList.PlannedDayId ?? 0;
            var plannedDay = await plannedDayManager.GetByIdAsync(plannedDayId);
            if(plannedDay != null) {
                plannedDay.ShoppingLists!.Remove(shoppingList);

            }
            if(!await shoppingListManager.DeleteByIdAsync(id)) {
                return false;
            }
            return true;
        }
    }
}