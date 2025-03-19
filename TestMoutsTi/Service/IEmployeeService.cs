using TestMoutsTi.Model;

namespace TestMoutsTi.Service
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetAllEmployees(bool? isActive);
        Task<Employee?> GetEmployeeByID(int id);
        Task<Employee?> AddEmployee(Employee obj);
        Task<Employee?> UpdateEmployee(int id, Employee obj);
        Task<bool> DeleteEmployeeByID(int id);
    }
}
