
using FamilyPlanner.models;
using FamilyPlanner.Models.ActivityModel;
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.InviteModel;
using FamilyPlanner.Models.KassalappModel;
using FamilyPlanner.Models.MealModel;
using FamilyPlanner.Models.PlannedDayModel;
using FamilyPlanner.Models.PlannedTaskModel;
using FamilyPlanner.Models.RecipeModel;
using FamilyPlanner.Models.RefreshTokenModel;
using FamilyPlanner.Models.ShoppingListModel;
using FamilyPlanner.Models.TaskModel;
using FamilyPlanner.Models.UserModel;
using Microsoft.EntityFrameworkCore;

namespace FamilyPlanner.Db {
    public class DatabaseContext : DbContext {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Family> Families { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<ShoppingList> ShoppingLists { get; set; }
        public DbSet<ShoppingListItem> ShoppingListItems { get; set; }
        public DbSet<PlannedDay> PlannedDays { get; set; }
        public DbSet<PlannedTask> PlannedTasks { get; set; }
        public DbSet<Invite> Invites { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<KassalappModel> KassalappProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .Property<string>("UserUid");

            modelBuilder.Entity<Family>()
                .HasMany(f => f.Members)
                .WithMany(m => m.Families)
                .UsingEntity<Dictionary<string, object>>(
                    "UserFamily",
                    b => b.HasOne<User>().WithMany().HasForeignKey("UserUid"),
                    b => b.HasOne<Family>().WithMany().HasForeignKey("FamilyId")
                );

            // Add shadow property for UserUid
            modelBuilder.Entity<User>()
                .Property<string>("UserUid");

            modelBuilder.Entity<Activity>()
                .HasOne(a => a.PlannedDay)
                .WithMany(p => p.Activities)
                .HasForeignKey(a => a.PlannedDayId);

            modelBuilder.Entity<Image>()
                .HasOne(i => i.User)
                .WithOne(u => u.ProfileImage)
                .HasForeignKey<User>(u => u.ProfileImageId);

            modelBuilder.Entity<PlannedDay>()
                .HasOne(p => p.User)
                .WithMany(u => u.PlannedDays)
                .HasForeignKey(p => p.UserUid)
                .HasPrincipalKey(u => u.Uid);

            modelBuilder.Entity<User>()
                .HasOne(u => u.SelectedFamily)
                .WithMany()
                .HasForeignKey(u => u.SelectedFamilyId);

            modelBuilder.Entity<Meal>()
                .HasOne(m => m.Recipe)
                .WithMany()
                .HasForeignKey(m => m.RecipeId);

            modelBuilder.Entity<PlannedDay>()
                .HasOne(p => p.Family)
                .WithMany(f => f.PlannedDays)
                .HasForeignKey(p => p.FamilyId);

            modelBuilder.Entity<PlannedTask>()
                .HasOne(p => p.PlannedDay)
                .WithMany(p => p.PlannedTasks)
                .HasForeignKey(p => p.PlannedDayId);
            
            modelBuilder.Entity<ShoppingListItem>()
                .HasOne(i => i.ShoppingList)
                .WithMany(s => s.Items)
                .HasForeignKey(i => i.ShoppingListId);

            modelBuilder.Entity<Family>()
                .HasMany(f => f.PlannedDays)
                .WithOne(p => p.Family)
                .HasForeignKey(p => p.FamilyId);
            
            modelBuilder.Entity<Meal>()
                .HasOne(m => m.PlannedDay)
                .WithMany(p => p.Meals)
                .HasForeignKey(m => m.PlannedDayId);

            modelBuilder.Entity<ShoppingList>()
                .HasOne(s => s.PlannedDay)
                .WithMany(p => p.ShoppingLists)
                .HasForeignKey(s => s.PlannedDayId);

            modelBuilder.Entity<Invite>()
                .HasOne(i => i.Family)
                .WithMany()
                .HasForeignKey(f => f.ToFamilyId);
            
            modelBuilder.Entity<Invite>()
                .HasOne(i => i.FromUser)
                .WithMany(u => u.SentInvites)
                .HasForeignKey(i => i.FromUserUid)
                .HasPrincipalKey(u => u.Uid)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Invite>()
                .HasOne(i => i.ToUser)
                .WithMany(u => u.ReceivedInvites)
                .HasForeignKey(i => i.ToUserUid)
                .HasPrincipalKey(u => u.Uid)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}