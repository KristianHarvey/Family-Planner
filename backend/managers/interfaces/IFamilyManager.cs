
using FamilyPlanner.Models.FamilyModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IFamilyManager {
        public Task<Family> CreateAsync(FamilyInput newFamily);
        public Task<Family> GetAllAsync();
        public Task<Family> GetByIdAsync(int id);
        public Task<Family> GetByUserId(int id);
        public Task<bool> UpdateAsync(int id, FamilyUpdate family);
    }
}