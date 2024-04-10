
using FamilyPlanner.Models.ActivityModel;
using FamilyPlanner.Models.FamilyModel;
using FamilyPlanner.Models.MealModel;
using FamilyPlanner.Models.PlanModel;
using FamilyPlanner.Models.RecipeModel;
using FamilyPlanner.Models.UserModel;
using FamilyPlanner.Models.WeeklyPlannerModel;
using Microsoft.EntityFrameworkCore;

namespace FamilyPlanner.Db {
    public class DatabaseContext : DbContext {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Family> Families { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Plan> Plans { get; set; }
        public DbSet<WeeklyPlanner> WeeklyPlanners { get; set; }

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
                .HasOne<Plan>()
                .WithMany(p => p.Activities)
                .HasForeignKey(a => a.PlanId);

            modelBuilder.Entity<Plan>()
                .HasOne(p => p.User)
                .WithMany()
                .HasForeignKey(p => p.UserUid)
                .HasPrincipalKey(u => u.Uid);

            modelBuilder.Entity<Meal>()
                .HasOne<Recipe>()
                .WithMany()
                .HasForeignKey(m => m.RecipeId);

            modelBuilder.Entity<WeeklyPlanner>()
                .HasOne<User>()
                .WithMany(u => u.WeeklyPlanners)
                .HasForeignKey(w => w.UserUid)
                .HasPrincipalKey(u => u.Uid);
        }
    }
}