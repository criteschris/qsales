using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using qsales.Models;
using qsales.Extensions;

namespace qsales.Repositories
{
    public class SalesRepository : ISalesRepository
    {
        private readonly QSalesDbContext _context;

        public SalesRepository(QSalesDbContext context)
        {
            _context = context;
        }

        public async Task<SalesEntryViewModel> GetSalesByDateAsync(DateTime entryDate)
        {
            var salesTask = _context.Sales.GetEntryForDate(entryDate).FirstOrDefaultAsync();
            var salesByHourTask = _context.SalesByHour.GetEntryForDate(entryDate).IncludeWeather().ToListAsync();
            var salesByLocationTask = _context.SalesByLocation.GetEntryForDate(entryDate).IncludeLocation().ToListAsync();
            var salesByProductTypeTask = _context.SalesByProductType.GetEntryForDate(entryDate).IncludeProductType().ToListAsync();

            await Task.WhenAll(new Task[] {
            salesTask,
            salesByHourTask,
            salesByLocationTask,
            salesByProductTypeTask
        });

            return new SalesEntryViewModel
            {
                Sales = salesTask.Result,
                SalesByHour = salesByHourTask.Result,
                SalesByLocation = salesByLocationTask.Result,
                SalesByProductType = salesByProductTypeTask.Result
            };
        }
    }
}