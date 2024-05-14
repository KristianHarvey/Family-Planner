

using FamilyPlanner.Db;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models;
using FamilyPlanner.Models.InviteModel;
using Microsoft.EntityFrameworkCore;

namespace FamilyPlanner.Managers {
    public class InviteManager : IInviteManager
    {
        private readonly DatabaseContext database;
        
        public InviteManager(DatabaseContext database) {
            this.database = database;
        }
        public async Task<Invite> Create(Invite invite)
        {
            invite.Status = InviteStatus.Pending;

            database.Invites.Add(invite);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return invite;
        }

        public async Task<List<Invite>> GetAllSentInvitesForUser(string userUid) {
            var invites = await database.Invites
                .Where(i => i.FromUserUid == userUid)
                .Include(i => i.FromUser)
                .Include(i => i.ToUser)
                .Include(i => i.Family)
                .ToListAsync();

            return invites;
        }

        public async Task<List<Invite>> GetAllReceivedInvitesForUser(string userUid) {
            var invites = await database.Invites
                .Where(i => i.ToUserUid == userUid)
                .Include(i => i.ToUser)
                .Include(i => i.FromUser)
                .Include(i => i.Family)
                .ToListAsync();
            
            return invites;
        }

        public async Task<Invite> GetById(int id)
        {
            var invite = await database.Invites
                .FindAsync(id);
            return invite;
        }

        public async Task<Invite> GetBySendAndReceive(string sendingUserUid, string receivedUserUid)
        {
            var invite = await database.Invites
                .Where(i => i.FromUserUid == sendingUserUid)
                .Where(i => i.ToUserUid == receivedUserUid)
                .FirstOrDefaultAsync();
            return invite;
        }
        public async Task OnInviteSent(Invite invite, string newStatus) {
            if(invite.Id == 0) {
                return;
            }
            invite.Status = newStatus;
            var updatedInvite = await Update(invite.Id, invite);
            if(updatedInvite == null) {
                return;
            }
        }
        public async Task OnInviteReceived(Invite invite, string newStatus) {
            if(invite.Id == 0) {
                return;
            }
            invite.Status = newStatus;
            var updatedInvite = await Update(invite.Id, invite);
            if(updatedInvite == null) {
                return;
            }
        }
        
        public async Task<bool> DeleteById(int id) {
            var invite = await GetById(id);
            if(invite == null) {
                return false;
            }
            database.Invites.Remove(invite);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return true;
        }

        public async Task<Invite> Update(int id, Invite invite)
        {
            var existingInvite = await GetById(id);
            if(existingInvite == null) {
                return null;
            }
            existingInvite.Status = invite.Status;
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return existingInvite;
        }
    }
}