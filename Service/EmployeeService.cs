using TestMoutsTi.Entity;
using TestMoutsTi.Model;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace TestMoutsTi.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly EmployeeDbContext _db;
        public EmployeeService(EmployeeDbContext db)
        {
            _db = db;
        }

        public async Task<List<Employee>> GetAllEmployees(bool? isActive)
        {
            if (isActive == null) { return await _db.Employee.ToListAsync(); }

            return await _db.Employee.ToListAsync();
        }

        public async Task<Employee?> GetEmployeeByID(int id)
        {
            return await _db.Employee.FirstOrDefaultAsync(employee => employee.Id == id);
        }

        public async Task<Employee?> AddEmployee(Employee obj)
        {
            var addEmployee = new Employee()
            {
                FirstName = obj.FirstName,
                LastName = obj.LastName,
                Email = obj.Email,
                DocNumber = obj.DocNumber,
                Phone = obj.Phone,
                ManagerName = obj.ManagerName,
                Password = obj.Password,
                BirthDay = obj.BirthDay
            };

            _db.Employee.Add(addEmployee);
            var result = await _db.SaveChangesAsync();
            return result >= 0 ? addEmployee : null;
        }

        public async Task<Employee?> UpdateEmployee(int id, Employee obj)
        {
            var employee = await _db.Employee.FirstOrDefaultAsync(index => index.Id == id);
            if (employee != null)
            {
                employee.FirstName = obj.FirstName;
                employee.LastName = obj.LastName;
                employee.Email = obj.Email;
                employee.DocNumber = obj.DocNumber;
                employee.Phone = obj.Phone;
                employee.ManagerName = obj.ManagerName;
                employee.Password = employee.Password;

                var result = await _db.SaveChangesAsync();
                return result >= 0 ? employee : null;
            }
            return null;
        }

        public async Task<bool> DeleteEmployeeByID(int id)
        {
            var Employee = await _db.Employee.FirstOrDefaultAsync(index => index.Id == id);
            if (Employee != null)
            {
                _db.Employee.Remove(Employee);
                var result = await _db.SaveChangesAsync();
                return result >= 0;
            }
            return false;
        }
    }
}
