
using FamilyPlanner.Models;
using FamilyPlanner.Models.InviteModel;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IInviteManager {
        public Task<Invite> Create(Invite invite);
        public Task<Invite> GetById(int id);
        public Task<Invite> GetBySendAndReceive(string sendingUserUid, string receivedUserUid);
        public Task OnInviteSent(Invite invite, string newStatus);
        public Task OnInviteReceived(Invite invite, string newStatus);
        public Task<List<Invite>> GetAllSentInvitesForUser(string userUid);
        public Task<List<Invite>> GetAllReceivedInvitesForUser(string userUid);
        public Task<bool> DeleteById(int id);
        public Task<Invite> Update(int id, Invite invite);
    }
}