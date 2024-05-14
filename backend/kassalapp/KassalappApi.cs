using System.Net;
using System.Net.Http.Headers;
using FamilyPlanner.Db;
using FamilyPlanner.Models.KassalappModel;
using FamilyPlanner.Utils;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace FamilyPlanner.Kassalapp {
    public sealed class KassalappApi : IKassalappApi
    {
        private string baseUrl = "https://kassal.app/api/v1";
        private readonly HttpClient client;
        private readonly DatabaseContext database;
        public KassalappApi(DatabaseContext database) {
            client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", KassalappUtils.ApiToken);
            this.database = database;
        }
        public async Task GetAllProducts()
        {
            var pageSize = 100; // Maximum size per page
            var totalPages = int.MaxValue; // Initialize totalPages to a large number
            var requestCounter = 0; // Counter to keep track of the number of requests sent
            var fetchedProducts = new List<KassalappModel>();
            for (int page = 1; page <= totalPages; page++)
            {
                var products = await GetProductsByPage(page, pageSize);
                requestCounter++;
                fetchedProducts.AddRange(products);
                // If no products were fetched, exit the loop
                if (products.Count == 0)
                    break;

                // Store products in the database
                // Example: await StoreProductsInDatabase(products);
                // If fewer products than pageSize were fetched, it means this is the last page
                if (products.Count < pageSize)
                    break;

                // Check if 60 requests have been sent
                if (requestCounter >= 60)
                {
                    // Wait for 1 minute
                    await Task.Delay(TimeSpan.FromMinutes(1));
                    // Reset the request counter
                    requestCounter = 0;
                }
            }
            if(fetchedProducts.Count > 0) {
                await StoreProductsInDatabase(fetchedProducts);
            }
        }

        public async Task StoreProductsInDatabase(List<KassalappModel> products)
        {
            foreach (var product in products)
            {
                try
                {
                    // Attempt to add or update the product in the database
                    var existingProduct = await database.KassalappProducts.FindAsync(product.Id);
                    if (existingProduct != null)
                    {
                        // Update existing product
                        database.Entry(existingProduct).CurrentValues.SetValues(product);
                    }
                    else
                    {
                        // Add new product
                        database.KassalappProducts.Add(product);
                    }
                    
                    await database.SaveChangesAsync();
                }
                catch (DbUpdateException ex)
                {
                    // Log the exception or handle it gracefully
                    Console.WriteLine($"{ex.Message}");
                    // Optionally, you can skip this product and continue with the next one
                }
            }
        }

        public async Task<List<KassalappModel>> GetProductsByPage(int page, int pageSize) {
            var url = $"{baseUrl}/products?page={page}&size={pageSize}";
            var response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var responseObject = JObject.Parse(jsonResponse);
            var productsArray = (JArray)responseObject["data"]!;
            var products = productsArray.ToObject<List<KassalappModel>>();
            return products;
        }

        public Task<KassalappModel> GetProductByEan(string ean)
        {
            throw new NotImplementedException();
        }

        public Task<KassalappModel> GetProductById(int id)
        {
            throw new NotImplementedException();
        }
    }
}