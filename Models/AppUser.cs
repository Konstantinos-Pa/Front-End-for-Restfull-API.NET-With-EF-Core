using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Assignment.Models
{
    public class AppUser : IdentityUser
    {
      public string? FirstName {  get; set; }
        public string? LastName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get;set; }
        public bool IsEmailConfirmed { get; set; } = true;

    }
}
