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
    public class HomeController : Controller
    {
        private ISalesRepository _repository;

        public HomeController(ISalesRepository repository)
        {
            _repository = repository;
        }
        public async Task<IActionResult> Index()
        {
            return View(await _repository.GetBars());
        }

        public async Task<IActionResult> Dashboard([FromQuery] Guid b)
        {
            ViewData["b"] = b;
            return View(await _repository.GetSalesByDateAsync(b, DateTime.Now.AddDays(-1).Date));
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
            return Json(await _repository.GetSalesByDateAsync(b, entryDate));
        }
    }
}
