using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ChangedShoppingList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "ShoppingLists",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "ShoppingLists",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "ShoppingListItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "CurrentPrice",
                table: "ShoppingListItems",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "CurrentUnitPrice",
                table: "ShoppingListItems",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ShoppingListItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EAN",
                table: "ShoppingListItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "ShoppingListItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ingredients",
                table: "ShoppingListItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "ShoppingListItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "ShoppingListItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ShoppingListItemId",
                table: "KassalappPriceHistory",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ShoppingListItemId",
                table: "KassalappNutrition",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ShoppingListItemId",
                table: "KassalappAllergen",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_KassalappPriceHistory_ShoppingListItemId",
                table: "KassalappPriceHistory",
                column: "ShoppingListItemId");

            migrationBuilder.CreateIndex(
                name: "IX_KassalappNutrition_ShoppingListItemId",
                table: "KassalappNutrition",
                column: "ShoppingListItemId");

            migrationBuilder.CreateIndex(
                name: "IX_KassalappAllergen_ShoppingListItemId",
                table: "KassalappAllergen",
                column: "ShoppingListItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_KassalappAllergen_ShoppingListItems_ShoppingListItemId",
                table: "KassalappAllergen",
                column: "ShoppingListItemId",
                principalTable: "ShoppingListItems",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KassalappNutrition_ShoppingListItems_ShoppingListItemId",
                table: "KassalappNutrition",
                column: "ShoppingListItemId",
                principalTable: "ShoppingListItems",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KassalappPriceHistory_ShoppingListItems_ShoppingListItemId",
                table: "KassalappPriceHistory",
                column: "ShoppingListItemId",
                principalTable: "ShoppingListItems",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KassalappAllergen_ShoppingListItems_ShoppingListItemId",
                table: "KassalappAllergen");

            migrationBuilder.DropForeignKey(
                name: "FK_KassalappNutrition_ShoppingListItems_ShoppingListItemId",
                table: "KassalappNutrition");

            migrationBuilder.DropForeignKey(
                name: "FK_KassalappPriceHistory_ShoppingListItems_ShoppingListItemId",
                table: "KassalappPriceHistory");

            migrationBuilder.DropIndex(
                name: "IX_KassalappPriceHistory_ShoppingListItemId",
                table: "KassalappPriceHistory");

            migrationBuilder.DropIndex(
                name: "IX_KassalappNutrition_ShoppingListItemId",
                table: "KassalappNutrition");

            migrationBuilder.DropIndex(
                name: "IX_KassalappAllergen_ShoppingListItemId",
                table: "KassalappAllergen");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "ShoppingLists");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "ShoppingLists");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "ShoppingListItems");

            migrationBuilder.DropColumn(
                name: "CurrentPrice",
                table: "ShoppingListItems");

            migrationBuilder.DropColumn(
                name: "CurrentUnitPrice",
                table: "ShoppingListItems");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ShoppingListItems");

            migrationBuilder.DropColumn(
                name: "EAN",
                table: "ShoppingListItems");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "ShoppingListItems");

            migrationBuilder.DropColumn(
                name: "Ingredients",
                table: "ShoppingListItems");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "ShoppingListItems");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "ShoppingListItems");

            migrationBuilder.DropColumn(
                name: "ShoppingListItemId",
                table: "KassalappPriceHistory");

            migrationBuilder.DropColumn(
                name: "ShoppingListItemId",
                table: "KassalappNutrition");

            migrationBuilder.DropColumn(
                name: "ShoppingListItemId",
                table: "KassalappAllergen");
        }
    }
}
