using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using qsales.Models;

namespace qsales.Repositories
{
    public interface ISalesRepository
    {
        Task<IEnumerable<Bar>> GetBars();
        Task<DashboardViewModel> GetSalesByDateAsync(Guid b, DateTime entryDate);
    }
}