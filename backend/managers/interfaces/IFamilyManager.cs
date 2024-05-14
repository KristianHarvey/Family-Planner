
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IFamilyManager {
        public Task<Family> CreateAsync(Family newFamily);
        public Task<IEnumerable<Family>> GetAllAsync();
        public Task<Family> GetByIdAsync(int id);
        public Task<bool> InsertUser(int familyId, User user);
        public Task<bool> UpdateAsync(int id, Family family);
    }
}