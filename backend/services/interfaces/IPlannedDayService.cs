
using FamilyPlanner.Models.ActivityModel;
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.PlannedTaskModel;
using FamilyPlanner.Models.ShoppingListModel;

namespace FamilyPlanner.Services.Interfaces {
    public interface IPLannedDayService {
        public Task<ShoppingList> CreateUpdateShoppingList(string dayKey, ShoppingList shoppingList);
        public Task<PlannedTask> CreateUpdatePlannedTask(string dayKey, PlannedTask plannedTask);
        public Task<Activity> CreateUpdateActivity(string dayKey, Activity activity);
        public Task<bool> DeleteShoppingList(int id);
    }
}