using TestMoutsTi.Model;
using Microsoft.EntityFrameworkCore;

namespace TestMoutsTi.Entity
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options)
        {
        }
        // Registered DB Model in EmployeeDbContext file
        public DbSet<Employee> Employee { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Setting a primary key in employee model
            modelBuilder.Entity<Employee>().HasKey(x => x.Id);

            // Inserting record in employee table
            modelBuilder.Entity<Employee>().HasData(
                new Employee
                {
                    Id = 1,
                    FirstName = "System",
                    LastName = "",
                    Email = "admin@admin",
                    DocNumber = "",
                    Phone = "",
                    ManagerName = "admin",
                    Password = "1234",
                    BirthDay = "01/01/1900"
                }
            );
        }
    }
}