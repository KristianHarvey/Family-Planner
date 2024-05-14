using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
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
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    UserUid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Families", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(type: "TEXT", nullable: true),
                    UserUid = table.Column<string>(type: "TEXT", nullable: true),
                    Uri = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    FileType = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KassalappStore",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Code = table.Column<string>(type: "TEXT", nullable: true),
                    Url = table.Column<string>(type: "TEXT", nullable: true),
                    LogoUri = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KassalappStore", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserUid = table.Column<string>(type: "TEXT", nullable: false),
                    Token = table.Column<string>(type: "TEXT", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KassalappProducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Vendor = table.Column<string>(type: "TEXT", nullable: true),
                    EAN = table.Column<string>(type: "TEXT", nullable: true),
                    Url = table.Column<string>(type: "TEXT", nullable: true),
                    ImageUri = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Ingredients = table.Column<string>(type: "TEXT", nullable: true),
                    CurrentPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    CurrentUnitPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    Weight = table.Column<decimal>(type: "TEXT", nullable: true),
                    StoreId = table.Column<int>(type: "INTEGER", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KassalappProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KassalappProducts_KassalappStore_StoreId",
                        column: x => x.StoreId,
                        principalTable: "KassalappStore",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "KassalappAllergen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Code = table.Column<string>(type: "TEXT", nullable: true),
                    DisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    Contains = table.Column<string>(type: "TEXT", nullable: true),
                    KassalappModelId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KassalappAllergen", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KassalappAllergen_KassalappProducts_KassalappModelId",
                        column: x => x.KassalappModelId,
                        principalTable: "KassalappProducts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "KassalappNutrition",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Code = table.Column<string>(type: "TEXT", nullable: true),
                    DisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    Amount = table.Column<decimal>(type: "TEXT", nullable: true),
                    Unit = table.Column<string>(type: "TEXT", nullable: true),
                    KassalappModelId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KassalappNutrition", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KassalappNutrition_KassalappProducts_KassalappModelId",
                        column: x => x.KassalappModelId,
                        principalTable: "KassalappProducts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "KassalappPriceHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Price = table.Column<decimal>(type: "TEXT", nullable: true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: true),
                    KassalappModelId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KassalappPriceHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KassalappPriceHistory_KassalappProducts_KassalappModelId",
                        column: x => x.KassalappModelId,
                        principalTable: "KassalappProducts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Activities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    StartDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EndDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UserUid = table.Column<string>(type: "TEXT", nullable: true),
                    PlannedDayId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activities", x => x.Id);
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
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    ProfileImageId = table.Column<int>(type: "INTEGER", nullable: true),
                    ActivityId = table.Column<int>(type: "INTEGER", nullable: true),
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
                        name: "FK_Users_Images_ProfileImageId",
                        column: x => x.ProfileImageId,
                        principalTable: "Images",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Invites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FromUserUid = table.Column<string>(type: "TEXT", nullable: false),
                    ToUserUid = table.Column<string>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: true),
                    ToFamilyId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Invites_Families_ToFamilyId",
                        column: x => x.ToFamilyId,
                        principalTable: "Families",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Invites_Users_FromUserUid",
                        column: x => x.FromUserUid,
                        principalTable: "Users",
                        principalColumn: "Uid",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Invites_Users_ToUserUid",
                        column: x => x.ToUserUid,
                        principalTable: "Users",
                        principalColumn: "Uid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PlannedDays",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DayKey = table.Column<string>(type: "TEXT", nullable: false),
                    UserUid = table.Column<string>(type: "TEXT", nullable: true),
                    FamilyId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlannedDays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlannedDays_Families_FamilyId",
                        column: x => x.FamilyId,
                        principalTable: "Families",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PlannedDays_Users_UserUid",
                        column: x => x.UserUid,
                        principalTable: "Users",
                        principalColumn: "Uid");
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
                name: "PlannedTasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Status = table.Column<string>(type: "TEXT", nullable: true),
                    AssignedToId = table.Column<int>(type: "INTEGER", nullable: true),
                    StartDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EndDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: true),
                    UserUid = table.Column<string>(type: "TEXT", nullable: true),
                    PlannedDayId = table.Column<int>(type: "INTEGER", nullable: true),
                    FamilyId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlannedTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlannedTasks_Families_FamilyId",
                        column: x => x.FamilyId,
                        principalTable: "Families",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PlannedTasks_PlannedDays_PlannedDayId",
                        column: x => x.PlannedDayId,
                        principalTable: "PlannedDays",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PlannedTasks_Users_AssignedToId",
                        column: x => x.AssignedToId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ShoppingLists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FamilyId = table.Column<int>(type: "INTEGER", nullable: true),
                    UserUid = table.Column<string>(type: "TEXT", nullable: true),
                    PlannedDayId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShoppingLists_PlannedDays_PlannedDayId",
                        column: x => x.PlannedDayId,
                        principalTable: "PlannedDays",
                        principalColumn: "Id");
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
                    PlannedDayId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Meals_PlannedDays_PlannedDayId",
                        column: x => x.PlannedDayId,
                        principalTable: "PlannedDays",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Meals_Recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipe",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedByUid = table.Column<string>(type: "TEXT", nullable: true),
                    StartDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EndDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    PlannedTaskId = table.Column<int>(type: "INTEGER", nullable: true),
                    AssignedUserId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_PlannedTasks_PlannedTaskId",
                        column: x => x.PlannedTaskId,
                        principalTable: "PlannedTasks",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tasks_Users_AssignedUserId",
                        column: x => x.AssignedUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ShoppingListItems",
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
                    table.PrimaryKey("PK_ShoppingListItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShoppingListItems_ShoppingLists_ShoppingListId",
                        column: x => x.ShoppingListId,
                        principalTable: "ShoppingLists",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Activities_PlannedDayId",
                table: "Activities",
                column: "PlannedDayId");

            migrationBuilder.CreateIndex(
                name: "IX_Invites_FromUserUid",
                table: "Invites",
                column: "FromUserUid");

            migrationBuilder.CreateIndex(
                name: "IX_Invites_ToFamilyId",
                table: "Invites",
                column: "ToFamilyId");

            migrationBuilder.CreateIndex(
                name: "IX_Invites_ToUserUid",
                table: "Invites",
                column: "ToUserUid");

            migrationBuilder.CreateIndex(
                name: "IX_KassalappAllergen_KassalappModelId",
                table: "KassalappAllergen",
                column: "KassalappModelId");

            migrationBuilder.CreateIndex(
                name: "IX_KassalappNutrition_KassalappModelId",
                table: "KassalappNutrition",
                column: "KassalappModelId");

            migrationBuilder.CreateIndex(
                name: "IX_KassalappPriceHistory_KassalappModelId",
                table: "KassalappPriceHistory",
                column: "KassalappModelId");

            migrationBuilder.CreateIndex(
                name: "IX_KassalappProducts_StoreId",
                table: "KassalappProducts",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_PlannedDayId",
                table: "Meals",
                column: "PlannedDayId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_RecipeId",
                table: "Meals",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_PlannedDays_FamilyId",
                table: "PlannedDays",
                column: "FamilyId");

            migrationBuilder.CreateIndex(
                name: "IX_PlannedDays_UserUid",
                table: "PlannedDays",
                column: "UserUid");

            migrationBuilder.CreateIndex(
                name: "IX_PlannedTasks_AssignedToId",
                table: "PlannedTasks",
                column: "AssignedToId");

            migrationBuilder.CreateIndex(
                name: "IX_PlannedTasks_FamilyId",
                table: "PlannedTasks",
                column: "FamilyId");

            migrationBuilder.CreateIndex(
                name: "IX_PlannedTasks_PlannedDayId",
                table: "PlannedTasks",
                column: "PlannedDayId");

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_CreatorId",
                table: "Recipe",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingListItems_ShoppingListId",
                table: "ShoppingListItems",
                column: "ShoppingListId");

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingLists_PlannedDayId",
                table: "ShoppingLists",
                column: "PlannedDayId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_AssignedUserId",
                table: "Tasks",
                column: "AssignedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_PlannedTaskId",
                table: "Tasks",
                column: "PlannedTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFamily_UserUid",
                table: "UserFamily",
                column: "UserUid");

            migrationBuilder.CreateIndex(
                name: "IX_Users_ActivityId",
                table: "Users",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_ProfileImageId",
                table: "Users",
                column: "ProfileImageId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_PlannedDays_PlannedDayId",
                table: "Activities",
                column: "PlannedDayId",
                principalTable: "PlannedDays",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_PlannedDays_PlannedDayId",
                table: "Activities");

            migrationBuilder.DropTable(
                name: "Invites");

            migrationBuilder.DropTable(
                name: "KassalappAllergen");

            migrationBuilder.DropTable(
                name: "KassalappNutrition");

            migrationBuilder.DropTable(
                name: "KassalappPriceHistory");

            migrationBuilder.DropTable(
                name: "Meals");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "ShoppingListItems");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "UserFamily");

            migrationBuilder.DropTable(
                name: "KassalappProducts");

            migrationBuilder.DropTable(
                name: "Recipe");

            migrationBuilder.DropTable(
                name: "ShoppingLists");

            migrationBuilder.DropTable(
                name: "PlannedTasks");

            migrationBuilder.DropTable(
                name: "KassalappStore");

            migrationBuilder.DropTable(
                name: "PlannedDays");

            migrationBuilder.DropTable(
                name: "Families");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Activities");

            migrationBuilder.DropTable(
                name: "Images");
        }
    }
}
