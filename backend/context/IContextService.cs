
namespace FamilyPlanner.Context {
    public interface IContextService {
        public string GetCurrentUserUid();
        public string GetRefreshToken();
    }
}