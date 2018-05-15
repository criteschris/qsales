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
    public class SalesController : Controller
    {
        private readonly ISalesRepository _salesRepository;
        private readonly IFacetRepository _facetRepository;

        public SalesController(ISalesRepository salesRepository, IFacetRepository facetRepository)
        {
            _salesRepository = salesRepository;
            _facetRepository = facetRepository;
        }
        public async Task<IActionResult> Index([FromQuery] Guid b)
        {
            if (b == Guid.Empty)
            {
                return Redirect("/");
            }

            ViewData["b"] = b;

            var conditionTask = _facetRepository.GetConditionsAsync();
            var employeeTask = _facetRepository.GetEmployeesAsync(b);
            var eventTask = _facetRepository.GetEventsAsync(b);
            var hoursTask = _facetRepository.GetOperationHoursAsync();
            var locationTask = _facetRepository.GetLocationsAsync(b);
            var organizationTask = _facetRepository.GetOrganizationsAsync(b);
            var performerTask = _facetRepository.GetPerformersAsync(b);
            var productTypeTask = _facetRepository.GetProductTypesAsync(b);
            var salesTask = _salesRepository.GetSalesByDateAsync(b, DateTime.Now);

            await Task.WhenAll(new Task[] {
                conditionTask,
                employeeTask,
                eventTask,
                hoursTask,
                locationTask,
                organizationTask,
                performerTask,
                productTypeTask,
                salesTask
            });

            var vm = new SalesEntryViewModel {
                Conditions = conditionTask.Result,
                Employees = employeeTask.Result,
                Events = eventTask.Result,
                OperationHours = hoursTask.Result,
                Locations = locationTask.Result,
                Organizations = organizationTask.Result,
                Performers = performerTask.Result,
                ProductTypes = productTypeTask.Result,
                Sales = salesTask.Result
            };

            return View(vm);
        }

        [AllowAnonymous]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpGet]
        public async Task<IActionResult> GetSales([FromQuery] Guid b, [FromQuery] DateTime entryDate)
        {
            return Json(await _salesRepository.GetSalesByDateAsync(b, entryDate));
        }

        [HttpPost]
        public async Task<IActionResult> PostSales([FromQuery] Guid b, [FromQuery] DateTime entryDate)
        {
            return Json(await _salesRepository.GetSalesByDateAsync(b, entryDate));
        }
    }
}
