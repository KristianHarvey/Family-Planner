using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class MadeUserUidForPlannedDayNotNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlannedDays_Users_UserUid",
                table: "PlannedDays");

            migrationBuilder.AlterColumn<string>(
                name: "UserUid",
                table: "PlannedDays",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PlannedDays_Users_UserUid",
                table: "PlannedDays",
                column: "UserUid",
                principalTable: "Users",
                principalColumn: "Uid",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlannedDays_Users_UserUid",
                table: "PlannedDays");

            migrationBuilder.AlterColumn<string>(
                name: "UserUid",
                table: "PlannedDays",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_PlannedDays_Users_UserUid",
                table: "PlannedDays",
                column: "UserUid",
                principalTable: "Users",
                principalColumn: "Uid");
        }
    }
}
