

using System.Runtime.CompilerServices;
using System.Security.Claims;
using AutoMapper;
using FamilyPlanner.Context;
using FamilyPlanner.Db;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.models;
using FamilyPlanner.Models;
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.InviteModel;
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.RefreshTokenModel;
using FamilyPlanner.Models.UserModel;
using FamilyPlanner.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FamilyPlanner.Managers {
    public class UserManager : IUserManager
    {
        private readonly DatabaseContext database;
        private readonly IContextService contextService;
        private readonly IInviteManager inviteManager;
        private readonly IFamilyManager familyManager;
        private readonly IPlannedDayManager plannedDayManager;
        private readonly IMapper mapper;
        public UserManager(DatabaseContext context, 
        IContextService contextService, 
        IInviteManager inviteManager, 
        IFamilyManager familyManager, 
        IPlannedDayManager plannedDayManager, 
        IMapper mapper
        ) {
            database = context;
            this.inviteManager = inviteManager;
            this.contextService = contextService;
            this.familyManager = familyManager;
            this.plannedDayManager = plannedDayManager;
            this.mapper = mapper;
        }
        public async Task<User> CreateUserAsync(UserInput newUser)
        {
            string uid = Guid.NewGuid().ToString();
            User user = new User()
            {
                Uid = uid,
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                Email = newUser.Email.ToLower(),
                Username = newUser.Username,
                Password = BCrypt.Net.BCrypt.EnhancedHashPassword(newUser.Password),
                Families = new List<Family>(),
                Role = Role.Regular,
            };
            database.Users.Add(user);
            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return user;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            var users = await database.Users.ToListAsync();
            return users;
        }
        public async Task<bool> DoesUsernameExist(string username) {
            var user = await database.Users.FirstOrDefaultAsync(u => u.Username == username);
            if(user != null) {
                return true;
            }
            return false;
        }
        private async Task<string> GenerateUniqueUsernameAsync(string lastName) {
            string username = $"{lastName}#{UserUtility.GetRandomUserNameNumber()}";
            Console.WriteLine(username);
            while (await DoesUsernameExist(username)) {
                username = $"{lastName}#{UserUtility.GetRandomUserNameNumber()}";
            }
            return username;
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            Console.WriteLine(email);
            var userDB = await database.Users
                .Include(u => u.Families)
                .Include(u => u.PlannedDays)
                .Include(u => u.SentInvites)
                .Include(u => u.ReceivedInvites)
                .Include(u => u.ProfileImage)
                .Include(u => u.SelectedFamily)
                .FirstOrDefaultAsync(u => u.Email == email);

            var user = mapper.Map<User>(userDB);
            return user;
        }
        public async Task<List<Invite>> GetAllInvites() {
            var currentUserUid = contextService.GetCurrentUserUid();
            var invites = await inviteManager.GetAllReceivedInvitesForUser(currentUserUid);
            
            return invites;
        }

        public async Task SaveOrUpdateRefreshTokenAsync(string userId, string refreshToken)
        {
            // Check if the user already has a refresh token in the database
            var existingRefreshToken = await database.RefreshTokens.FirstOrDefaultAsync(rt => rt.UserUid == userId);

            if (existingRefreshToken != null)
            {
                // If a refresh token already exists for the user, update it
                existingRefreshToken.Token = refreshToken;
                existingRefreshToken.ExpiryDate = DateTime.UtcNow.AddDays(30); // Set expiration date as needed
                database.RefreshTokens.Update(existingRefreshToken);
            }
            else
            {
                // If no refresh token exists for the user, create a new one
                var newRefreshToken = new RefreshToken
                {
                    UserUid = userId,
                    Token = refreshToken,
                    ExpiryDate = DateTime.UtcNow.AddDays(30) // Set expiration date as needed
                };

                database.RefreshTokens.Add(newRefreshToken);
            }

            await database.SaveChangesAsync();
        }

        public async Task<RefreshToken> GetRefreshTokenAsync(string UserUid) {
            var refreshToken = await database.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.UserUid == UserUid);
            
            return refreshToken;
        }

        public async Task<bool> AcceptInvite(Invite invite) {
            if(invite == null) {
                return false;
            }
            if(invite.Family == null) {
                Console.WriteLine("Family is null");
            } else {
                Console.WriteLine(invite.Family.Name);
            }
            if(invite.ToFamilyId == 0) {
                return false;
            }
            var toUser = await GetByUidAsync(invite.ToUserUid);
            if(toUser == null) {
                return false;
            }
            if(toUser.Families == null || toUser.Families.Count <= 0 || toUser.SelectedFamilyId == 0) {
                if(!await UpdateSelectedFamily(toUser.Id, invite.ToFamilyId)) {
                    return false;
                }
            }
            var fromUser = await GetByUidAsync(invite.FromUserUid);
            if(fromUser == null) {
                return false;
            }
            if(fromUser.SentInvites == null) {
                return false;
            }
            if(toUser.ReceivedInvites == null) {
                return false;
            }
            toUser.ReceivedInvites.Remove(invite);
            fromUser.SentInvites.Remove(invite);
            Console.WriteLine(invite.ToFamilyId);
            if(!await familyManager.InsertUser(invite.ToFamilyId, toUser)) {
                return false;
            }
            if(!await inviteManager.DeleteById(invite.Id)) {
                return false;
            }
            if(!await UpdateAsync(toUser.Id, toUser) || !await UpdateAsync(fromUser.Id, fromUser)) {
                return false;
            }
            return true;
        }

        public async Task<bool> DeclineInvite(Invite invite) {
            if(invite == null) {
                return false;
            }
            var toUser = await GetByUidAsync(invite.ToUserUid);
            var fromUser = await GetByUidAsync(invite.FromUserUid);
            if(toUser == null || fromUser == null) {
                return false;
            }
            if(toUser.ReceivedInvites == null || fromUser.SentInvites == null) {
                return false;
            }
            toUser.ReceivedInvites.Remove(invite);
            fromUser.SentInvites.Remove(invite);
            if(!await inviteManager.DeleteById(invite.Id)) {
                return false;
            }
            if(!await UpdateAsync(toUser.Id, toUser) || !await UpdateAsync(fromUser.Id, fromUser)) {
                return false;
            }
            return true;
        }

        private async Task<Invite> sendInvite(Invite invite) {
            if(invite == null) {
                return null;
            }
            var family = await familyManager.GetByIdAsync(invite.ToFamilyId);
            var toUser = await GetByUidAsync(invite.ToUserUid);
            if(family.Members != null && family.Members.Contains(toUser)) {
                return null;
            }
            var sendingUser = await GetByUidAsync(invite.FromUserUid);
            if(sendingUser == null) {
                return null;
            }
            var newInvite = await inviteManager.Create(invite);
            if(newInvite == null) {
                return null;
            }
            if(sendingUser.SentInvites == null) {
                sendingUser.SentInvites = new List<Invite>();
            }
            sendingUser.SentInvites.Add(newInvite);
            if(!await UpdateAsync(sendingUser.Id, sendingUser)) {
                return null;
            }
            await inviteManager.OnInviteSent(newInvite, InviteStatus.Sent);
            return newInvite;
        }

        public async Task<bool> SendInviteToUser(Invite invite) {
            if(invite == null) {
                return false;
            }
            var newInvite = await sendInvite(invite);

            var receiveResults = await ReceiveInvite(newInvite);
            if(!receiveResults) {
                return false;
            }

            return true;
        }


        public async Task<bool> ReceiveInvite(Invite invite) {
            var user = await GetByUidAsync(invite.ToUserUid);
            if(user == null) {
                return false;
            }
            if(user.ReceivedInvites == null) {
                user.ReceivedInvites = new List<Invite>();
            }
            user.ReceivedInvites.Add(invite);
            if(!await UpdateAsync(user.Id, user)) {
                return false;
            }
            await inviteManager.OnInviteReceived(invite, InviteStatus.Pending);
            return true;
        }

        public async Task<User> GetByIdAsync(int id)
        {
            var user = await database.Users
                .Include(u => u.PlannedDays)
                .Include(u => u.AssignedTasks)
                .Include(u => u.SentInvites)
                .Include(u => u.Families)
                .Include(u => u.ReceivedInvites)
                .Include(u => u.ProfileImage)
                .Include(u => u.SelectedFamily)
                .FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<User> GetByUidAsync(string uid)
        {
            var user = await database.Users
                .Include(u => u.PlannedDays)
                .Include(u => u.AssignedTasks)
                .Include(u => u.SentInvites)
                .Include(u => u.Families)
                .Include(u => u.ReceivedInvites)
                .Include(u => u.ProfileImage)
                .Include(u => u.SelectedFamily)
                .FirstOrDefaultAsync(u => u.Uid == uid);
            return user;
        }

        public async Task<bool> UpdateSelectedFamily(int userId, int familyId)
        {
            var user = await GetByIdAsync(userId);
            if (user == null)
            {
                return false;
            }

            var family = await familyManager.GetByIdAsync(familyId);
            if(family == null) {
                Console.WriteLine($"Family is null, with id {familyId}");
                return false;
            }

            user.SelectedFamilyId = familyId;

            try
            {
                await database.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw;
            }
            return true;
        }

        public async Task<IEnumerable<User>> Search(string query) {
            var resultsDB = await database.Users
                .Where(u => u.FirstName.Contains(query) || 
                u.LastName.Contains(query) || 
                u.Email.Contains(query))
                .Select(u => new {
                    User = u,
                    RelevanceScore = (u.FirstName.Contains(query) ? 3 : 0) + (u.LastName.Contains(query) ? 2 : 0) + (u.Email.Contains(query) ? 1 : 0)
                })
                .OrderByDescending(r => r.RelevanceScore)
                .Select(u => u.User)
                .Take(10)
                .Include(u => u.ProfileImage)
                .Include(u => u.Families)
                .ToListAsync();
            return resultsDB;
        }
        public async Task<bool> UpdateAsync(int id, User user)
        {
            var existingUser = await GetByIdAsync(id);
            if(existingUser == null) {
                return false;
            }


            // foreach (var plannedDay in existingUser.PlannedDays!)
            // {
            //     database.Entry(plannedDay).State = EntityState.Detached;
            // }
            existingUser.ProfileImage = user.ProfileImage;
            var updatedPlannedDays = new List<PlannedDay>();
            if(user.PlannedDays != null) {
                foreach(var plannedDay in user.PlannedDays) {
                    var updatedPlannedDay = await plannedDayManager.CreateUpdateAsync(plannedDay.DayKey, plannedDay);
                    updatedPlannedDays.Add(updatedPlannedDay);
                }
            }
            existingUser.PlannedDays = updatedPlannedDays;
            if(!string.IsNullOrEmpty(user.FirstName)) {
                existingUser.FirstName = user.FirstName;
            }
            if(!string.IsNullOrEmpty(user.LastName)) {
                existingUser.LastName = user.LastName;
            }
            if(user.SentInvites != null && user.SentInvites.Count > 0) {
                existingUser.SentInvites = user.SentInvites;
                
            }
            if(user.ReceivedInvites != null && user.ReceivedInvites.Count > 0) {
                existingUser.ReceivedInvites = user.ReceivedInvites;
            
            }
            if(user.SelectedFamilyId != null && user.SelectedFamilyId != 0) {
                existingUser.SelectedFamilyId = user.SelectedFamilyId;

            }

            try {
                await database.SaveChangesAsync();
            } catch(DbUpdateException) {
                throw;
            }
            return true;
        }

        public async Task<User> GetCurrentUserFromToken()
        {
            var userUid = contextService.GetCurrentUserUid();

            return await GetByUidAsync(userUid);
        }
    }
}