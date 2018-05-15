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

        public async Task<Sales> GetSalesByDateAsync(Guid b, DateTime entryDate)
        {
            return await _context.Sales
                .AsNoTracking()
                .GetByBar(b)
                .GetEntryForDate(entryDate)
                .IncludeSalesBy()
                .MakeSerializable()
                .FirstOrDefaultAsync();
            /* var salesByHourTask = _context.SalesByHour.AsNoTracking().GetEntryForDate(entryDate).IncludeCondition().MakeSerializable().ToListAsync();
            var salesByLocationTask = _context.SalesByLocation.AsNoTracking().GetEntryForDate(entryDate).IncludeLocation().MakeSerializable().ToListAsync();
            var salesByProductTypeTask = _context.SalesByProductType.AsNoTracking().GetEntryForDate(entryDate).IncludeProductType().MakeSerializable().ToListAsync(); */
            //var operationHoursTask = _context.OperationHour.AsNoTracking().ToListAsync();

            //await Task.WhenAll(new Task[] {
            //    salesTask,
                /* salesByHourTask,
                salesByLocationTask,
                salesByProductTypeTask, */
            //    operationHoursTask
            //});

            //return new DashboardViewModel
            //{
            //    Sales = salesTask.Result,
                /* SalesByHour = salesByHourTask.Result,
                SalesByLocation = salesByLocationTask.Result,
                SalesByProductType = salesByProductTypeTask.Result, */
            //    OperationHours = operationHoursTask.Result
            //};
        }

        public async Task<ReportPageViewModel> GetReportPageViewModelAsync(Guid b) {
            var eventTask = _context.Event.GetEventsForBar(b).ToListAsync();
            var organizationTask = _context.Organization.GetOrganizationsForBar(b).ToListAsync();
            var performerTask = _context.Performer.GetPerformersForBar(b).ToListAsync();

            await Task.WhenAll( new Task[] {
                eventTask,
                organizationTask,
                performerTask
            });

            return new ReportPageViewModel {
                Events = eventTask.Result,
                Organizations = organizationTask.Result,
                Performers = performerTask.Result
            };
        }

        public async Task<IEnumerable<SalesReportViewModel>> GetSalesReportDataAsync(Guid b, int dw, int e, int o, int p) {
            var sales = _context.Sales.GetByBar(b);

            if (dw > 0) {
                sales = sales.GetSalesByDayOfWeek(dw);
            }

            if (e > 0) {
                sales = sales.GetSalesByEventId(e);
            }

            if (o > 0) {
                sales = sales.GetSalesByOrganizationId(o);
            }

            if (p > 0) {
                sales = sales.GetSalesByPerformerId(p);
            }

            return await sales.ToSalesReportViewModel().ToListAsync();
        }
    }
}