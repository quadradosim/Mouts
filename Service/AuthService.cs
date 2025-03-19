using TestMoutsTi.Entity;
using TestMoutsTi.Model;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace TestMoutsTi.Service
{
    public class AuthService : IAuthService
    {
        private readonly EmployeeDbContext _db;
        public AuthService(EmployeeDbContext db)
        {
            _db = db;
        }

        public async Task<Employee?> GetEmployeeAuth(UserLogin loginObject)
        {
            return await _db.Employee.FirstOrDefaultAsync(employee => employee.Email == loginObject.Username);
        }

    }
}
