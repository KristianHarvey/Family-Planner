using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ChangedMapping : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Families",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Families", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Activities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DayKey = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    UserUid = table.Column<string>(type: "TEXT", nullable: true),
                    PlanId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Meals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    RecipeId = table.Column<int>(type: "INTEGER", nullable: true),
                    RecipeId1 = table.Column<int>(type: "INTEGER", nullable: true),
                    PlanId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meals", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Plans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    DayKey = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UserUid = table.Column<string>(type: "TEXT", nullable: true),
                    WeeklyPlannerId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShoppingList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FamilyId = table.Column<int>(type: "INTEGER", nullable: true),
                    UserUid = table.Column<string>(type: "TEXT", nullable: true),
                    PlanId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShoppingList_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Uid = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    LastName = table.Column<string>(type: "TEXT", nullable: false),
                    Role = table.Column<string>(type: "TEXT", nullable: false),
                    ActivityId = table.Column<int>(type: "INTEGER", nullable: true),
                    PlanId = table.Column<int>(type: "INTEGER", nullable: true),
                    UserUid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.UniqueConstraint("AK_Users_Uid", x => x.Uid);
                    table.ForeignKey(
                        name: "FK_Users_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Users_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ShoppingListItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    ShoppingListId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingListItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShoppingListItem_ShoppingList_ShoppingListId",
                        column: x => x.ShoppingListId,
                        principalTable: "ShoppingList",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Recipe",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Ingredients = table.Column<string>(type: "TEXT", nullable: true),
                    Steps = table.Column<string>(type: "TEXT", nullable: true),
                    ShortDescription = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    CreatorId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Recipe_Users_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TaskItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: false),
                    DueDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    PlanId = table.Column<int>(type: "INTEGER", nullable: false),
                    AssignedUserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskItem_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskItem_Users_AssignedUserId",
                        column: x => x.AssignedUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserFamily",
                columns: table => new
                {
                    FamilyId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserUid = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFamily", x => new { x.FamilyId, x.UserUid });
                    table.ForeignKey(
                        name: "FK_UserFamily_Families_FamilyId",
                        column: x => x.FamilyId,
                        principalTable: "Families",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserFamily_Users_UserUid",
                        column: x => x.UserUid,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WeeklyPlanners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserUid = table.Column<string>(type: "TEXT", nullable: true),
                    FamilyId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeeklyPlanners", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeeklyPlanners_Families_FamilyId",
                        column: x => x.FamilyId,
                        principalTable: "Families",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WeeklyPlanners_Users_UserUid",
                        column: x => x.UserUid,
                        principalTable: "Users",
                        principalColumn: "Uid");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Activities_PlanId",
                table: "Activities",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_PlanId",
                table: "Meals",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_RecipeId",
                table: "Meals",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_RecipeId1",
                table: "Meals",
                column: "RecipeId1");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_UserUid",
                table: "Plans",
                column: "UserUid");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_WeeklyPlannerId",
                table: "Plans",
                column: "WeeklyPlannerId");

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_CreatorId",
                table: "Recipe",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingList_PlanId",
                table: "ShoppingList",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingListItem_ShoppingListId",
                table: "ShoppingListItem",
                column: "ShoppingListId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskItem_AssignedUserId",
                table: "TaskItem",
                column: "AssignedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskItem_PlanId",
                table: "TaskItem",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFamily_UserUid",
                table: "UserFamily",
                column: "UserUid");

            migrationBuilder.CreateIndex(
                name: "IX_Users_ActivityId",
                table: "Users",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_PlanId",
                table: "Users",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_WeeklyPlanners_FamilyId",
                table: "WeeklyPlanners",
                column: "FamilyId");

            migrationBuilder.CreateIndex(
                name: "IX_WeeklyPlanners_UserUid",
                table: "WeeklyPlanners",
                column: "UserUid");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Plans_PlanId",
                table: "Activities",
                column: "PlanId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Plans_PlanId",
                table: "Meals",
                column: "PlanId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Recipe_RecipeId",
                table: "Meals",
                column: "RecipeId",
                principalTable: "Recipe",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Recipe_RecipeId1",
                table: "Meals",
                column: "RecipeId1",
                principalTable: "Recipe",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Plans_Users_UserUid",
                table: "Plans",
                column: "UserUid",
                principalTable: "Users",
                principalColumn: "Uid");

            migrationBuilder.AddForeignKey(
                name: "FK_Plans_WeeklyPlanners_WeeklyPlannerId",
                table: "Plans",
                column: "WeeklyPlannerId",
                principalTable: "WeeklyPlanners",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Plans_PlanId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Plans_PlanId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Meals");

            migrationBuilder.DropTable(
                name: "ShoppingListItem");

            migrationBuilder.DropTable(
                name: "TaskItem");

            migrationBuilder.DropTable(
                name: "UserFamily");

            migrationBuilder.DropTable(
                name: "Recipe");

            migrationBuilder.DropTable(
                name: "ShoppingList");

            migrationBuilder.DropTable(
                name: "Plans");

            migrationBuilder.DropTable(
                name: "WeeklyPlanners");

            migrationBuilder.DropTable(
                name: "Families");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Activities");
        }
    }
}
