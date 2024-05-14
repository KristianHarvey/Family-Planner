using System.Net;
using FamilyPlanner.Kassalapp;
using FamilyPlanner.Models;
using FamilyPlanner.Models.KassalappModel;
using Microsoft.AspNetCore.Mvc;

namespace FamilyPlanner.Controllers {
    [ApiController]
    [Route("/api/[controller]")]
    public class KassalappController : ControllerBase {
        private readonly IKassalappApi kassalappApi;

        public KassalappController(IKassalappApi kassalappApi) {
            this.kassalappApi = kassalappApi;
        }
        [HttpGet]
        public async Task<APIResponse> GetKassalappProducts() {
            await kassalappApi.GetAllProducts();
            return new APIResponse("Successfully fetched all kassalapp products", false, HttpStatusCode.OK);
        }
    }
}