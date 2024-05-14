
using FamilyPlanner.models;
using FamilyPlanner.Models.InviteModel;
using FamilyPlanner.Models.RefreshTokenModel;
using FamilyPlanner.Models.UserModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IUserManager {
        public Task<User> CreateUserAsync(UserInput newUser);
        public Task<IEnumerable<User>> GetAllAsync();
        public Task<User> GetByIdAsync(int id);
        public Task<User> GetByUidAsync(string uid);
        public Task<User> GetByEmailAsync(string email);

        public Task<bool> SendInviteToUser(Invite invite);
        public Task<List<Invite>> GetAllInvites();
        public Task<bool> ReceiveInvite(Invite invite);
        public Task<bool> AcceptInvite(Invite invite);
        public Task<bool> DeclineInvite(Invite invite);
        public Task<bool> UpdateSelectedFamily(int userId, int familyId);
        public Task<RefreshToken> GetRefreshTokenAsync(string UserUid);
        public Task SaveOrUpdateRefreshTokenAsync(string userId, string refreshToken);
        public Task<bool> UpdateAsync(int id, User user);
    }
}