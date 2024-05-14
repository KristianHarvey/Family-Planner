

using System.Net;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Server.Kestrel.Https;

namespace FamilyPlanner {
    public class Program {
        public static void Main(string[] args) {
            CreateHostBuilder(args).Build().Run();
        }


        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder => {
                webBuilder.UseStartup<Startup>();
                
                webBuilder.UseUrls("http://localhost:5001");
                // webBuilder.ConfigureKestrel((context, options) =>
                // {
                //     options.use
                //     // var env = context.HostingEnvironment;
                //     // var certificatePath = Path.Combine(env.ContentRootPath, "localhost.pfx");
                //     // var certificateKeyPath = Path.Combine(env.ContentRootPath, "localhost-key.pem");
                //     // Console.WriteLine(certificatePath, certificateKeyPath);
                //     // options.ListenAnyIP(443, listenOptions =>
                //     // {
                //     //     listenOptions.UseHttps(new HttpsConnectionAdapterOptions
                //     //     {
                //     //         ServerCertificate = new X509Certificate2(certificatePath, "harvey97"),
                //     //     });
                //     // });
                // });
            });
    }
}
