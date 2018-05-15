using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using qsales.Models;
using qsales.Repositories;

namespace qsales.Controllers
{
    //[Authorize]
    public class AdminController : Controller
    {
        private readonly IFacetRepository _repository;

        public AdminController(IFacetRepository repository)
        {
            _repository = repository;
        }

        public async Task<IActionResult> Conditions([FromQuery] Guid b)
        {
            if (b == Guid.Empty)
            {
                return Redirect("/");
            }

            ViewData["b"] = b;
            return View(await _repository.GetConditionsAsync());
        }

        public async Task<IActionResult> Employees([FromQuery] Guid b)
        {
            if (b == Guid.Empty)
            {
                return Redirect("/");
            }

            ViewData["b"] = b;
            return View(await _repository.GetEmployeesAsync(b));
        }

        public async Task<IActionResult> Events([FromQuery] Guid b)
        {
            if (b == Guid.Empty)
            {
                return Redirect("/");
            }

            ViewData["b"] = b;
            return View(await _repository.GetEventsAsync(b));
        }

        public async Task<IActionResult> Locations([FromQuery] Guid b)
        {
            if (b == Guid.Empty)
            {
                return Redirect("/");
            }

            ViewData["b"] = b;
            return View(await _repository.GetLocationsAsync(b));
        }

        public async Task<IActionResult> OperationHours([FromQuery] Guid b)
        {
            if (b == Guid.Empty)
            {
                return Redirect("/");
            }

            ViewData["b"] = b;
            return View(await _repository.GetOperationHoursAsync());
        }

        public async Task<IActionResult> Organizations([FromQuery] Guid b)
        {
            if (b == Guid.Empty)
            {
                return Redirect("/");
            }

            ViewData["b"] = b;
            return View(await _repository.GetOrganizationsAsync(b));
        }

        public async Task<IActionResult> Performers([FromQuery] Guid b)
        {
            if (b == Guid.Empty)
            {
                return Redirect("/");
            }

            ViewData["b"] = b;
            return View(await _repository.GetPerformersAsync(b));
        }

        public async Task<IActionResult> ProductTypes([FromQuery] Guid b)
        {
            if (b == Guid.Empty)
            {
                return Redirect("/");
            }

            ViewData["b"] = b;
            return View(await _repository.GetProductTypesAsync(b));
        }

        [AllowAnonymous]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public async Task<IActionResult> SaveConditions([FromQuery] Guid b, [FromBody] List<Condition> facets)
        {
            return Json(await _repository.SaveConditionsAsync(facets));
        }

        [HttpPost]
        public async Task<IActionResult> SaveEmployees([FromQuery] Guid b, [FromBody] List<Employee> facets)
        {
            return Json(await _repository.SaveEmployeesAsync(b, facets));
        }

        [HttpPost]
        public async Task<IActionResult> SaveEvents([FromQuery] Guid b, [FromBody] List<Event> facets)
        {
            return Json(await _repository.SaveEventsAsync(b, facets));
        }

        [HttpPost]
        public async Task<IActionResult> SaveLocations([FromQuery] Guid b, [FromBody] List<Location> facets)
        {
            return Json(await _repository.SaveLocationsAsync(b, facets));
        }

        [HttpPost]
        public async Task<IActionResult> SaveOperationHours([FromBody] List<OperationHour> facets)
        {
            return Json(await _repository.SaveOperationHoursAsync(facets));
        }

        [HttpPost]
        public async Task<IActionResult> SaveOrganizations([FromQuery] Guid b, [FromBody] List<Organization> facets)
        {
            return Json(await _repository.SaveOrganizationsAsync(b, facets));
        }

        [HttpPost]
        public async Task<IActionResult> SavePerformers([FromQuery] Guid b, [FromBody] List<Performer> facets)
        {
            return Json(await _repository.SavePerformersAsync(b, facets));
        }

        [HttpPost]
        public async Task<IActionResult> SaveProductTypes([FromQuery] Guid b, [FromBody] List<ProductType> facets)
        {
            return Json(await _repository.SaveProductTypesAsync(b, facets));
        }
    }
}
