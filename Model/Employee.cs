using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IO;

namespace TestMoutsTi.Model
{
    [Index(nameof(DocNumber), IsUnique = true)]
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string DocNumber { get; set; }
        public string Phone { get; set; }
        public string ManagerName{ get; set; }
        public string Password { get; set; }
        public string BirthDay { get; set; }

    }
}
