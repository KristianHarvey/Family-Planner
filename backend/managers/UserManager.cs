

using System.Runtime.CompilerServices;
using System.Security.Claims;
using FamilyPlanner.Db;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models;
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.UserModel;
using Microsoft.EntityFrameworkCore;

namespace FamilyPlanner.Managers {
    public class UserManager : IUserManager
    {
        private readonly DatabaseContext database;
        private readonly IHttpContextAccessor contextAccessor;
        public UserManager(DatabaseContext context, IHttpContextAccessor httpContextAccessor) {
            database = context;
            contextAccessor = httpContextAccessor;
        }
        public async Task<User> CreateUserAsync(UserInput newUser)
        {
            string uid = Guid.NewGuid().ToString();
            User user = new User()
            {
                Uid = uid,
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                Email = newUser.Email,
                Password = BCrypt.Net.BCrypt.EnhancedHashPassword(newUser.Password),
                Families = new List<Family>(),
                Role = Role.Regular
            };
            database.Users.Add(user);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return user;
        }

        public string GetCurrentUserId() {
            var userUid = contextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            if(userUid == null) {
                return null;
            }
            return userUid;
        }

        public Task<IEnumerable<User>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            var user = await database.Users
                .Include(u => u.Families)
                .Include(u => u.WeeklyPlanners)
                .FirstOrDefaultAsync(u => u.Email == email);
            return user;
        }

        public Task<User> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetByUidAsync(string uid)
        {
            var user = await database.Users
                .Include(u => u.Families)
                .Include(u => u.WeeklyPlanners)
                .FirstOrDefaultAsync(u => u.Uid == uid);

            return user;
        }

        public Task<bool> UpdateAsync(int id, UserUpdate user)
        {
            throw new NotImplementedException();
        }
    }
}