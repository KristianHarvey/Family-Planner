

using FamilyPlanner.Context;
using FamilyPlanner.Db;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.models;
using FamilyPlanner.Utils;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;

namespace FamilyPlanner.Managers {
    public sealed class ImageManager : IImageManager
    {
        private readonly DatabaseContext database;
        private readonly IContextService contextService;
        private readonly IUserManager userManager;
        private readonly GcsService gcsService;

        public ImageManager(DatabaseContext database, IContextService contextService, IUserManager userManager) {
            this.database = database;
            this.contextService = contextService;
            this.userManager = userManager;
            gcsService = new GcsService();
        }
        public async Task<Image> UploadImage(IFormFile image)
        {
            try
            {
                // Get current user ID
                var currentUserUid = contextService.GetCurrentUserUid();
                var currentUser = await userManager.GetByUidAsync(currentUserUid);
                if(currentUser == null) {
                    return null;
                }
                if(currentUser.ProfileImage != null) {
                    var profileImageId = currentUser.ProfileImageId ?? 0;
                    if(!await DeleteById(profileImageId)) {
                        return null;
                    }
                }

                var credential = GoogleCredential.FromFile("./utils/angular-rhythm-422608-a2-918cdf26a713.json");
                var storage = StorageClient.Create(credential);
                // Upload image to GCS
                using (var memoryStream = new MemoryStream())
                {
                    // Copy image content to memory stream
                    await image.CopyToAsync(memoryStream);
                    memoryStream.Position = 0;

                    // Generate a unique object name for the image in GCS
                    var objectName = $"{currentUserUid}/{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";

                    // Upload image to GCS bucket
                    await storage.UploadObjectAsync(
                        bucket: CloudStorageInfo.BucketName,
                        objectName: objectName,
                        contentType: image.ContentType,
                        source: memoryStream);

                    // Construct GCS URL for the uploaded image
                    var imageUrl = $"https://storage.googleapis.com/{CloudStorageInfo.BucketName}/{objectName}";

                    // Save image metadata or perform other necessary operations in the database
                    var newImage = new Image
                    {
                        Uri = new Uri(imageUrl),
                        Url = imageUrl,
                        UserUid = currentUserUid,
                        CreatedAt = DateTime.UtcNow,
                        FileType = Path.GetExtension(image.FileName),
                        ObjectName = objectName
                    };

                    // Add new image to the database
                    await database.Images.AddAsync(newImage);
                    await database.SaveChangesAsync();

                    // Update user's profile image information
                    var user = await userManager.GetByUidAsync(currentUserUid);
                    if (user != null)
                    {
                        user.ProfileImage = newImage;
                        user.ProfileImageId = newImage.Id;
                        await database.SaveChangesAsync();
                    }

                    // Return the newly uploaded image
                    return newImage;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw;
            }
        }

        public async Task<Image> GetByIdAsync(int id) {
            var image = await database.Images
                .FindAsync(id);
            
            return image;
        }


        public Task<Image> UpdateImage(IFormFile image)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteById(int id) {
            var image = await GetByIdAsync(id);
            if(image == null) {
                return false;
            }

            try
            {
                // Get the object name of the image in GCS

                // Create a credential from the service account key file
                var credential = GoogleCredential.FromFile("./utils/angular-rhythm-422608-a2-918cdf26a713.json");

                // Create a GCS client
                var storage = StorageClient.Create(credential);

                // Delete the object from GCS
                await storage.DeleteObjectAsync(CloudStorageInfo.BucketName, image.ObjectName);

                // Remove the image from the database
                database.Images.Remove(image);

                await database.SaveChangesAsync();

                return true;

            } catch(Exception ex) {
                Console.WriteLine($"Error deleting image: {ex.Message}");
                throw;
            }
            return false;
        }
    }
}