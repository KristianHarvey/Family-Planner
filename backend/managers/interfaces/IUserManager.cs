
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IUserManager {
        public Task<User> CreateUserAsync(UserInput newUser);
        public Task<IEnumerable<User>> GetAllAsync();
        public Task<User> GetByIdAsync(int id);
        public string GetCurrentUserId();
        public Task<User> GetByUidAsync(string uid);
        public Task<User> GetByEmailAsync(string email);
        public Task<bool> UpdateAsync(int id, UserUpdate user);
    }
}