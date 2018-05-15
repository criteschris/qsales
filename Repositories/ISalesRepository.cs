using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using qsales.Models;

namespace qsales.Repositories
{
    public interface ISalesRepository
    {
        Task<Sales> GetSalesByDateAsync(Guid b, DateTime entryDate);
        Task<ReportPageViewModel> GetReportPageViewModelAsync(Guid b);
        Task<IEnumerable<SalesReportViewModel>> GetSalesReportDataAsync(Guid b, int dw, int e, int o, int p);
    }
}