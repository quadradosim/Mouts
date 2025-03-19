using TestMoutsTi.Model;

namespace TestMoutsTi.Service
{
    public interface IAuthService
    {
        Task<Employee?> GetEmployeeAuth(UserLogin loginObject);
    }
}
