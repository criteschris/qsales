using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using qsales.Models;
using qsales.Extensions;
using System.Collections.Generic;

namespace qsales.Repositories
{
    public class SalesRepository : ISalesRepository
    {
        private readonly QSalesDbContext _context;

        public SalesRepository(QSalesDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Bar>> GetBars() {
            return await _context.Bar.ToListAsync();
        }

        public async Task<DashboardViewModel> GetSalesByDateAsync(Guid b, DateTime entryDate)
        {
            var salesTask = _context.Sales
                .AsNoTracking()
                .GetByBar(b)
                .GetEntryForDate(entryDate)
                .IncludeSalesBy()
                .MakeSerializable()
                .FirstOrDefaultAsync();
            /* var salesByHourTask = _context.SalesByHour.AsNoTracking().GetEntryForDate(entryDate).IncludeCondition().MakeSerializable().ToListAsync();
            var salesByLocationTask = _context.SalesByLocation.AsNoTracking().GetEntryForDate(entryDate).IncludeLocation().MakeSerializable().ToListAsync();
            var salesByProductTypeTask = _context.SalesByProductType.AsNoTracking().GetEntryForDate(entryDate).IncludeProductType().MakeSerializable().ToListAsync(); */
            var operationHoursTask = _context.OperationHour.AsNoTracking().ToListAsync();

            await Task.WhenAll(new Task[] {
                salesTask,
                /* salesByHourTask,
                salesByLocationTask,
                salesByProductTypeTask, */
                operationHoursTask
            });

            return new DashboardViewModel
            {
                Sales = salesTask.Result,
                /* SalesByHour = salesByHourTask.Result,
                SalesByLocation = salesByLocationTask.Result,
                SalesByProductType = salesByProductTypeTask.Result, */
                OperationHours = operationHoursTask.Result
            };
        }
    }
}