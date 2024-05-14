using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ChangedFamilyModelAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SelectedFamilyId",
                table: "Users",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FamilyColor",
                table: "Families",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_SelectedFamilyId",
                table: "Users",
                column: "SelectedFamilyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Families_SelectedFamilyId",
                table: "Users",
                column: "SelectedFamilyId",
                principalTable: "Families",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Families_SelectedFamilyId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_SelectedFamilyId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SelectedFamilyId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "FamilyColor",
                table: "Families");
        }
    }
}
