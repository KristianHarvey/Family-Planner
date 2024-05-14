
using FamilyPlanner.Models.PlannedDayModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IPlannedDayManager {
        
        public Task<PlannedDay> CreateForDayKeyAsync(string dayKey, PlannedDay newPlannedDay);
        public Task<PlannedDay> CreateUpdateAsync(string dayKey, PlannedDay plannedDay);
        public Task<IEnumerable<PlannedDay>> GetAllAsync();
        public Task<IEnumerable<PlannedDay>> GetAllStoredAsync();
        public Task<PlannedDay> GetByDayKey(string dayKey);
        public Task<PlannedDay> GetByIdAsync(int id);
        public Task<PlannedDay> UpdateAsync(int id, PlannedDay plannedDay);
        public Task<bool> DeleteByIdAsync(int id);
    }
}