
using Assignment.Service;
using Microsoft.EntityFrameworkCore;
using Assignment.Repository;
using System;
using System.Text;
using System.Text.Json.Serialization;
using Assignment.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Assignment
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContextPool<PgDbContext>(
                options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
            );

            builder.Services.AddDbContext<PostgresDbContext>(option =>
            {
                option.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
            }); 

            builder.Services.AddSwaggerGen(options =>
            {
                options.CustomSchemaIds(type => type.FullName);
            });

            builder.Services.AddControllers()
             .AddJsonOptions(options =>
             {
                 options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
             });


            builder.Services.AddIdentityCore<AppUser>()
                .AddEntityFrameworkStores<PgDbContext>()
               .AddDefaultTokenProviders();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                var secret = builder.Configuration["JwtConfig:Secret"];
                var issuer = builder.Configuration["JwtConfig:ValidIssuer"];
                var audience = builder.Configuration["JwtConfig:ValidAudiences"];

                if (secret is null || issuer is null || audience is null)
                {
                    throw new ApplicationException("Jwt is not set in the configuration");
                }
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = audience,
                    ValidIssuer = issuer,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret))
                };

            });

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins("http://localhost:5173") // Frontend URL
                          .AllowAnyMethod()  // GET, POST, etc.
                          .AllowAnyHeader(); // Custom headers
                });
            });



            builder.Services.AddScoped<ICandidatesRepository, CandidatesRepository>();
            builder.Services.AddScoped<IAddressRepository, AddressRepository>();
            builder.Services.AddScoped<ICertificateRepository, CertificatesRepository>();
            builder.Services.AddScoped<IMobileRepository, MobileRepository>();
            builder.Services.AddScoped<IPhotoIdRepository, PhotoIdRepository>();
            builder.Services.AddScoped<ICandidatesAnalyticsRepository, CandidatesAnalyticsRepository>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddAuthorization();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
