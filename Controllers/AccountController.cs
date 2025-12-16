using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Assignment.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Project_Bootcamp_2025.Authentication
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(UserManager<AppUser>
        accountUser, IConfiguration configuration) : ControllerBase// αυτος ειναι ο μοντερνος τροπος να δηλωσω δυναμικα εναν κονστρακτορα
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AddOrUpdateAppUser model)
        {
            if (ModelState.IsValid)
            {
                var existedUser = await accountUser.FindByNameAsync(model.UserName);
                if (existedUser != null)
                {
                    ModelState.AddModelError("", "User name is already taken.");
                    return BadRequest(ModelState);
                }
                var user = new AppUser()
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    SecurityStamp = Guid.NewGuid().ToString()
                };
                //try to save user
                var result = await accountUser.CreateAsync(user, model.Password);
                //If the user is succesfully created, return ok
                if (result.Succeeded)
                {
                    var token = GenerateToken(model.UserName);
                    return Ok(new { token });
                }
                //if there is are errors, add then to the ModelState object
                //and return the error to the client
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(" ", error.Description);
                }
            }
            return BadRequest(ModelState);

        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            if (ModelState.IsValid)
            {
                var user = await accountUser.FindByNameAsync(model.UserName);
                if (user != null)
                {
                    if (await accountUser.CheckPasswordAsync(user, model.Password))
                    {
                        var token = GenerateToken(model.UserName);
                        return Ok(new { token });
                    }
                }
                ModelState.AddModelError("", "Invalid username or password");
            }
            return BadRequest(ModelState);
        }
        private string? GenerateToken(string userName)
        {
            var secret = configuration["JwtConfig:Secret"];
            var issuer = configuration["JwtConfig:ValidIssuer"];
            var audience = configuration["JwtConfig:ValidAudiences"];
            if (secret is null || audience is null || issuer is null)
            {
                throw new ApplicationException("Jwt is not set in the configuration");
            }
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, userName)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature)
            };
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(securityToken);
            return token;
        }
    }
}