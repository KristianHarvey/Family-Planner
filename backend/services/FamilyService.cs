
using FamilyPlanner.Context;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.UserModel;
using FamilyPlanner.Services.Interfaces;

namespace FamilyPlanner.Services {
    public class FamilyService: IFamilyService {
        IFamilyManager familyManager;
        IUserManager userManager;
        IContextService contextService;
        public FamilyService(IFamilyManager familyManager, IUserManager userManager, IContextService contextService) {
            this.familyManager = familyManager;
            this.userManager = userManager;
            this.contextService = contextService;
        }

        public async Task<Family> Create(Family family) {
            var currentUserUid = contextService.GetCurrentUserUid();
            var user = await userManager.GetByUidAsync(currentUserUid);
            var newFamily = AddUserToFamilyInitial(family, user);
            var createdFamily = await familyManager.CreateAsync(newFamily);
            if(user == null) {
                return null;
            }
            if(user.Families == null || user.Families.Count <= 0 || user.SelectedFamilyId == 0) {
                if(!await userManager.UpdateSelectedFamily(user.Id, createdFamily.Id)) {
                    return null;
                }
            }
            if(user.Families == null) {
                user.Families = new List<Family>();
            }
            user.Families.Add(createdFamily);
            if(!await userManager.UpdateAsync(user.Id, user)) {
                return null;
            }
            return createdFamily;
        }

        public Family AddUserToFamilyInitial(Family family, User user) {
            if(family == null) {
                return null;
            }
            if(family.Members == null) {
                family.Members = new List<User>();
            }
            family.Members.Add(user);
            return family;
        }
    }
}