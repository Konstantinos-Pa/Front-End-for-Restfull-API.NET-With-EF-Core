using Assignment.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Assignment.Service
{
    public class PgDbContext:IdentityDbContext<AppUser>
    {
        public PgDbContext(DbContextOptions<PgDbContext> options)
       : base(options) { }
    }
}
