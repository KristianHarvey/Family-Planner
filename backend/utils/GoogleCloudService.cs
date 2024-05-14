
using Google.Cloud.Storage.V1;
using Google.Apis.Auth.OAuth2;
using System;
namespace FamilyPlanner.Utils {
    public class GcsService
    {
        private readonly StorageClient _storageClient;
        private ServiceAccountCredential credential;
        public GcsService()
        {
            // Initialize the storage client with your service account credentials
            _storageClient = StorageClient.Create();
        }

        public string GenerateSignedUrl(string bucketName, string objectName)
        {
            var scopes = new string[] {"https://www.googleapis.com/auth/devstorage.read_write"};
            using ( var stream = new FileStream("./utils/angular-rhythm-422608-a2-918cdf26a713.json", FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream)
                                    .CreateScoped(scopes)
                                    .UnderlyingCredential as ServiceAccountCredential;
            }
            DateTime expiration = DateTime.UtcNow.AddYears(100);
            UrlSigner urlSigner = UrlSigner.FromCredential(credential);
            string url = urlSigner.Sign(
                bucketName,
                objectName,
                expiration - DateTime.Now,
                HttpMethod.Get);

            return url;
            
        }
    }
}