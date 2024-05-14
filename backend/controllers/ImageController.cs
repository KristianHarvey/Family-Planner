
using System.Net;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.models;
using FamilyPlanner.Models;
using Microsoft.AspNetCore.Mvc;

namespace FamilyPlanner.Controllers {
    [Route("/api/[controller]")]
    [ApiController]
    public class ImageController: ControllerBase {
        private readonly IImageManager imageManager;

        public ImageController(IImageManager imageManager) {
            this.imageManager = imageManager;
        }
        [HttpPost]
        public async Task<APIResponse> UploadImage(IFormFile image) {
            var scheme = HttpContext.Request.Scheme;
            var host = HttpContext.Request.Host;
            var uploadedImage = await imageManager.UploadImage(image);
            if(uploadedImage == null) {
                return new APIResponse("Failed to upload image", true, HttpStatusCode.BadRequest);
            }
            return new APIResponse(uploadedImage, "Successfully uploaded image", false, HttpStatusCode.OK);
        }
    }
}