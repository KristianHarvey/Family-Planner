using System.Net;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Models;
using FamilyPlanner.Models.ShoppingListModel;
using Microsoft.AspNetCore.Mvc;

namespace FamilyPlanner.Controllers {
    [ApiController]
    [Route("/api/[controller]")]
    public class ShoppingListController : ControllerBase {
        private readonly IShoppingListManager shoppingListManager;

        public ShoppingListController(IShoppingListManager shoppingListManager) {
            this.shoppingListManager = shoppingListManager;
        }
        [HttpPost]
        public async Task<APIResponse> Create(ShoppingList shoppingList) {
            var createdShoppingList = await shoppingListManager.CreateAsync(shoppingList);
            if(createdShoppingList == null) {
                return new APIResponse("Failed to create a new shopping list", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(createdShoppingList, "Successfully created a new shopping list", false, HttpStatusCode.OK);
        }
        [HttpGet]
        public async Task<APIResponse> GetAllForCurrentUser() {
            var shoppingLists = await shoppingListManager.GetAllAsync();
            if(shoppingLists == null) {
                return new APIResponse("No shopping lists exists for current user", true, HttpStatusCode.NotFound);
            }
            return new APIResponse(shoppingLists, "Successfully retrieved all shopping lists for current user", false, HttpStatusCode.OK);
        }
        [HttpGet("{id}")]
        public async Task<APIResponse> GetById(int id) {
            var shoppingList = await shoppingListManager.GetByIdAsync(id);
            if(shoppingList == null) {
                return new APIResponse($"Failed to get shopping list with id {id}", true, HttpStatusCode.NotFound);
            }
            return new APIResponse(shoppingList, $"Successfully fetched shopping list with id {id}", false, HttpStatusCode.OK);
        }
        [HttpPut("{id}")]
        public async Task<APIResponse> Update(int id, ShoppingList shoppingList) {
            var updatedShoppingList = await shoppingListManager.UpdateAsync(id, shoppingList);
            if(updatedShoppingList == null) {
                return new APIResponse("Failed to create a new shopping list", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(updatedShoppingList, "Successfully created a new shopping list", false, HttpStatusCode.OK);
        }
        [HttpDelete("{id}")]
        public async Task<APIResponse> Update(int id) {
            if(!await shoppingListManager.DeleteByIdAsync(id)) {
                return new APIResponse("Failed to delete shopping list", true, HttpStatusCode.BadRequest);

            }
            return new APIResponse("Successfully deleted shopping list", false, HttpStatusCode.OK);
        }
    }
}