
using FamilyPlanner.models;

namespace FamilyPlanner.Managers.Interfaces {
    public interface IImageManager {
        public Task<Image> UploadImage(IFormFile image);
        public Task<Image> UpdateImage(IFormFile image);
    }
}