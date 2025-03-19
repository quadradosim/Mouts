using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.IdentityModel.Tokens;
using System.IO;

namespace TestMoutsTi.Model
{
    public class UserLogin
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
