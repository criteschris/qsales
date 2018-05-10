using System;
using System.Threading.Tasks;
using qsales.Models;

namespace qsales.Repositories
{
    public interface ISalesRepository
    {
        Task<DashboardViewModel> GetSalesByDateAsync(DateTime entryDate);
    }
}