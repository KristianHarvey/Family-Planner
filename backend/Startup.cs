
using System.Text;
using System.Text.Json.Serialization;
using FamilyPlanner.Db;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using FamilyPlanner.Managers.Interfaces;
using FamilyPlanner.Managers;
using FamilyPlanner.Models.PlanModel;

namespace FamilyPlanner
{
    public class Startup {
        public IConfiguration Configuration;
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services) {
            services.AddScoped<IUserManager, UserManager>();
            services.AddScoped<IActivityManager, ActivityManager>();
            services.AddScoped<IAuthManager, AuthManager>();
            services.AddScoped<IMealManager, MealManager>();
            services.AddScoped<IPlanManager, PlanManager>();
            services.AddScoped<IWeeklyPlannerManager, WeeklyPlannerManager>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                // Configure JWT authentication parameters
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("Jwt:Key").Value))
                };
            });

            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                });;

            services.AddDbContext<DatabaseContext>(options => {
                options.UseSqlite(Configuration.GetConnectionString("FamilyPlannerDb"));
            });
            // services.AddSwaggerGen();
            services.AddSwaggerGen(options => {

                var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
            });
            // services.AddSingleton<JwtTokenHandler>();

            services.AddCors(options => 
            {
                options.AddPolicy("AllowFrontend", builder => {
                    builder
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            services.AddHttpClient();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            // Configure the HTTP request pipeline.
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Recipe and Meal Planner API");
                    c.RoutePrefix = string.Empty; // Set RoutePrefix to an empty string
                });
            }
            
            // app.UseStaticFiles(new StaticFileOptions
            // {
            //     FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "images")),
            //     RequestPath = "/images"
            // });

            app.UseRouting();
            app.UseCors("AllowFrontend");
            app.UseAuthorization();
            app.UseAuthentication();
            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });

        }
    }
}