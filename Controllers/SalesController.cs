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
        public async Task<IActionResult> Index()
        {
            return View(await _facetRepository.GetFacetsAsync());
        }

        [AllowAnonymous]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public async Task<IActionResult> PostSales([FromQuery] DateTime entryDate)
        {
            return Json(await _salesRepository.GetSalesByDateAsync(entryDate));
        }
    }
}
