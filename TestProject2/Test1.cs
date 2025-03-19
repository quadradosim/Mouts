using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Testing.Platform.Configurations;
using System;
using System.Runtime.InteropServices;
using TestMoutsTi.Controllers;
using TestMoutsTi.Entity;
using TestMoutsTi.Model;
using TestMoutsTi.Service;

namespace TestProject2
{
    [TestClass]
    public sealed class Test1
    {
        [TestMethod]
        public async Task PostEmployee()
        {
            var serviceProvider = new ServiceCollection()
            .AddLogging()
            .BuildServiceProvider();

            var factory = serviceProvider.GetService<ILoggerFactory>();
            var logger = factory.CreateLogger<EmployeeController>();

            Employee user = new Employee();

            user.FirstName = "Test";
            user.LastName = "Last";
            user.DocNumber = "12345";
            user.BirthDay = "22/02/1980";
            user.ManagerName = "employee";
            user.Password = "12345";
            user.Phone = "41988557044";
            user.Email = "t@t";

            var options = new DbContextOptionsBuilder<EmployeeDbContext>()
            .UseSqlServer("Server=localhost\\SQLEXPRESS;Database=Employee;Trusted_Connection=True;TrustServerCertificate=true;")
            .Options;

            EmployeeDbContext context = new EmployeeDbContext(options);

            EmployeeService register = new EmployeeService(context);

            EmployeeController addEmployee = new EmployeeController(register, logger);
            var result = await addEmployee.Post(user);

            Assert.IsNotNull(result);

        }

        [TestMethod]
        public async Task GetAllEmployees()
        {
            var serviceProvider = new ServiceCollection()
            .AddLogging()
            .BuildServiceProvider();

            var factory = serviceProvider.GetService<ILoggerFactory>();
            var logger = factory.CreateLogger<EmployeeController>();

            var options = new DbContextOptionsBuilder<EmployeeDbContext>()
            .UseSqlServer("Server=localhost\\SQLEXPRESS;Database=Employee;Trusted_Connection=True;TrustServerCertificate=true;")
            .Options;

            EmployeeDbContext context = new EmployeeDbContext(options);

            EmployeeService register = new EmployeeService(context);

            EmployeeController addEmployee = new EmployeeController(register, logger);
            var result = await addEmployee.Get();

            Assert.IsNotNull(result);

        }

        [TestMethod]
        public async Task GetEmployee()
        {
            var serviceProvider = new ServiceCollection()
            .AddLogging()
            .BuildServiceProvider();

            var factory = serviceProvider.GetService<ILoggerFactory>();
            var logger = factory.CreateLogger<EmployeeController>();

            var options = new DbContextOptionsBuilder<EmployeeDbContext>()
            .UseSqlServer("Server=localhost\\SQLEXPRESS;Database=Employee;Trusted_Connection=True;TrustServerCertificate=true;")
            .Options;

            EmployeeDbContext context = new EmployeeDbContext(options);

            EmployeeService register = new EmployeeService(context);

            EmployeeController addEmployee = new EmployeeController(register, logger);
            var result = await addEmployee.Get(1);

            Assert.IsNotNull(result);

        }

        [TestMethod]
        public async Task PutEmployee()
        {
            var serviceProvider = new ServiceCollection()
            .AddLogging()
            .BuildServiceProvider();

            var factory = serviceProvider.GetService<ILoggerFactory>();
            var logger = factory.CreateLogger<EmployeeController>();

            var options = new DbContextOptionsBuilder<EmployeeDbContext>()
            .UseSqlServer("Server=localhost\\SQLEXPRESS;Database=Employee;Trusted_Connection=True;TrustServerCertificate=true;")
            .Options;

            Employee user = new Employee();

            user.FirstName = "Test2";
            user.LastName = "Last2";
            user.DocNumber = "77916538";
            user.BirthDay = "22/02/1981";
            user.ManagerName = "director";
            user.Phone = "41988557043";
            user.Email = "t2@t";


            EmployeeDbContext context = new EmployeeDbContext(options);

            EmployeeService register = new EmployeeService(context);

            EmployeeController addEmployee = new EmployeeController(register, logger);
            var result = await addEmployee.Put(14, user);

            Assert.IsNotNull(result);

        }

        [TestMethod]
        public async Task DeleteEmployee()
        {
            var serviceProvider = new ServiceCollection()
            .AddLogging()
            .BuildServiceProvider();

            var factory = serviceProvider.GetService<ILoggerFactory>();
            var logger = factory.CreateLogger<EmployeeController>();

            var options = new DbContextOptionsBuilder<EmployeeDbContext>()
            .UseSqlServer("Server=localhost\\SQLEXPRESS;Database=Employee;Trusted_Connection=True;TrustServerCertificate=true;")
            .Options;

            EmployeeDbContext context = new EmployeeDbContext(options);

            EmployeeService register = new EmployeeService(context);

            EmployeeController addEmployee = new EmployeeController(register, logger);
            var result = await addEmployee.Delete(14);

            //<> 404
            Assert.IsNotNull(result);

        }
    }
}
