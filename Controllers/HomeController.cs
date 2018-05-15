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
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ISalesRepository _salesRepository;
        private readonly IFacetRepository _facetRepository;

        public HomeController(ISalesRepository salesRepository, IFacetRepository facetRepository)
        {
            _salesRepository = salesRepository;
            _facetRepository = facetRepository;
        }
        public async Task<IActionResult> Index()
        {
            return View(await _facetRepository.GetBars());
        }

        public async Task<IActionResult> Dashboard([FromQuery] Guid b)
        {
            if (b == Guid.Empty)
            {
                return Redirect("/");
            }

            ViewData["b"] = b;

            var salesTask = _salesRepository.GetSalesByDateAsync(b, DateTime.Now.AddDays(-1).Date);
            var hoursTask = _facetRepository.GetOperationHoursAsync();

            await Task.WhenAll(new Task[] {
                salesTask,
                hoursTask
            });

            DashboardViewModel vm = new DashboardViewModel
            {
                Sales = salesTask.Result,
                OperationHours = hoursTask.Result
            };

            return View(vm);
        }

        [Authorize("MyAdminRole")]
        public async Task<IActionResult> Report([FromQuery] Guid b)
        {
            if (b == Guid.Empty)
            {
                return Redirect("/");
            }

            ViewData["b"] = b;
            return View(await _salesRepository.GetReportPageViewModelAsync(b));
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
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

        [HttpGet]
        public async Task<IActionResult> GetSalesReportData([FromQuery] Guid b, [FromQuery] int dw, [FromQuery] int e, [FromQuery] int o, [FromQuery] int p)
        {
            return Json(await _salesRepository.GetSalesReportDataAsync(b, dw, e, o, p));
        }
    }
}
