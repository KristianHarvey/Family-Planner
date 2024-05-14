
using System.Security.Claims;

namespace FamilyPlanner.Context {
    public sealed class ContextService : IContextService {
        private readonly IHttpContextAccessor contextAccessor;

        public ContextService(IHttpContextAccessor contextAccessor) {
            this.contextAccessor = contextAccessor;
        }

        public string GetCurrentUserUid()
        {
            var claim = contextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier);
            if(claim == null) {
                return null;
            }
            var userUid = claim.Value;
            return userUid;
        }

        public string GetRefreshToken()
        {
            var refreshToken = contextAccessor.HttpContext!.Request.Headers["RefreshToken"];
            return refreshToken;
        }
    }
}