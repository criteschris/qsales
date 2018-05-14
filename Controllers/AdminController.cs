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
            return View(await _repository.GetEmployeesAsync());
        }

        public async Task<IActionResult> Locations([FromQuery] Guid b)
        {
            if (b == Guid.Empty)
            {
                return Redirect("/");
            }

            ViewData["b"] = b;
            return View(await _repository.GetLocationsAsync());
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

        public async Task<IActionResult> ProductTypes([FromQuery] Guid b)
        {
            if (b == Guid.Empty)
            {
                return Redirect("/");
            }

            ViewData["b"] = b;
            return View(await _repository.GetProductTypesAsync());
        }

        [AllowAnonymous]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public async Task<IActionResult> SaveConditions([FromBody] List<Condition> facets)
        {
            return Json(await _repository.SaveConditionsAsync(facets));
        }

        [HttpPost]
        public async Task<IActionResult> SaveEmployees([FromBody] List<Employee> facets)
        {
            return Json(await _repository.SaveEmployeesAsync(facets));
        }

        [HttpPost]
        public async Task<IActionResult> SaveLocations([FromBody] List<Location> facets)
        {
            return Json(await _repository.SaveLocationsAsync(facets));
        }

        [HttpPost]
        public async Task<IActionResult> SaveOperationHours([FromBody] List<OperationHour> facets)
        {
            return Json(await _repository.SaveOperationHoursAsync(facets));
        }

        [HttpPost]
        public async Task<IActionResult> SaveProductTypes([FromBody] List<ProductType> facets)
        {
            return Json(await _repository.SaveProductTypesAsync(facets));
        }
    }
}
