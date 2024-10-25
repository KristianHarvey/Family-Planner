

using FamilyPlanner.Context;
using FamilyPlanner.Db;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.InviteModel;
using FamilyPlanner.Models.UserModel;
using Microsoft.EntityFrameworkCore;

namespace FamilyPlanner.Managers {
    public class FamilyManager : IFamilyManager {
        private readonly IUserManager userManager;
        private readonly IContextService contextService;
        private readonly DatabaseContext database;

        public FamilyManager(DatabaseContext database, IContextService contextService) {
            this.database = database;
            this.contextService = contextService;
        }
        public async Task<Family> CreateAsync(Family newFamily) {
            var currentUserUid = contextService.GetCurrentUserUid();
            if(currentUserUid == null) {
                return null;
            }
            Family family = new()
            {
                Name = newFamily.Name,
                UserUid = currentUserUid,
                Members = newFamily.Members,
                PlannedDays = newFamily.PlannedDays,
                FamilyColor = newFamily.FamilyColor ?? "#303030"
            };
            database.Families.Add(family);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return family;
        }
        public async Task<IEnumerable<Family>> GetAllAsync() {
            var currentUserUid = contextService.GetCurrentUserUid();
            var families = await database.Families
                .Where(f => f.UserUid == currentUserUid)
                .ToListAsync();
            
            return families;
        }
        public async Task<Family> GetByIdAsync(int id) {
            var family = await database.Families
                .Include(f => f.Members)
                .FirstOrDefaultAsync(f => f.Id == id);
            return family;
        }

        public async Task<bool> InsertUser(int familyId, User user)
        {
            var family = await GetByIdAsync(familyId);
            if(family == null) {
                return false;
            }
            if(family.Members == null) {
                family.Members = new List<User>();
            }
            family.Members.Add(user);
            return await UpdateAsync(familyId, family);
        }

        public async Task<bool> UpdateAsync(int id, Family family) {
            var existingFamily = await GetByIdAsync(id);
            if(existingFamily == null) {
                return false;
            }
            Console.WriteLine($"Family update: {family.Name}, {family.FamilyColor}");
            existingFamily.Name = family.Name;
            existingFamily.FamilyColor = family.FamilyColor;
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return true;
        }
    }
}