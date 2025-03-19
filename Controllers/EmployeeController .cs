using TestMoutsTi.Model;
using TestMoutsTi.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;

namespace TestMoutsTi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _employeeService;
    private readonly ILogger<EmployeeController> _logger;
    public EmployeeController(IEmployeeService employeeService, ILogger<EmployeeController> logger)
    {
        _employeeService = employeeService;
        _logger = logger;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Get([FromQuery] bool? isActive = null)
    {
        var employees = await _employeeService.GetAllEmployees(isActive);
        return Ok(employees);
    }

    [HttpGet("{id}")]
    [Authorize]
    //[Route("{id}")] // /api/employee/:id
    public async Task<IActionResult> Get(int id)
    {
        var employee = await _employeeService.GetEmployeeByID(id);
        if (employee == null)
        {
            return NotFound();
        }
        return Ok(employee);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Post([FromBody] Employee employeeObject)
    {
        var employee = await _employeeService.AddEmployee(employeeObject);

        if (employee == null)
        {
            return BadRequest();
        }

        return Ok(new
        {
            message = "Employee Created Successfully!!!",
            id = employee!.Id
        });
    }

    [HttpPut]
    [Route("{id}")]
    [Authorize]
    public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Employee employeeObject)
    {
        var employee = await _employeeService.UpdateEmployee(id, employeeObject);
        if (employee == null)
        {
            return NotFound();
        }

        return Ok(new
        {
            message = "Employee Updated Successfully!!!",
            id = employee!.Id
        });
    }

    [HttpDelete]
    [Route("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        if (!await _employeeService.DeleteEmployeeByID(id))
        {
            return NotFound();
        }

        return Ok(new
        {
            message = "Employee Deleted Successfully!!!",
            id = id
        });
    }
}
