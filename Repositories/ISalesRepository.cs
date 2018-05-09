using System;
using System.Threading.Tasks;
using qsales.Models;

namespace qsales.Repositories
{
    public interface ISalesRepository
    {
        Task<SalesEntryViewModel> GetSalesByDateAsync(DateTime entryDate);
    }
}