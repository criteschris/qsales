using System.Collections.Generic;
using System.Threading.Tasks;
using qsales.Models;

namespace qsales.Repositories
{
    public interface IFacetRepository
    {
        Task<FacetViewModel> GetFacetsAsync();
        Task<IEnumerable<Condition>> GetConditionsAsync();
        Task<IEnumerable<Employee>> GetEmployeesAsync();
        Task<IEnumerable<Location>> GetLocationsAsync();
        Task<IEnumerable<OperationHour>> GetOperationHoursAsync();
        Task<IEnumerable<ProductType>> GetProductTypesAsync();

        Task<IEnumerable<Condition>> SaveConditionsAsync(List<Condition> hours);
        Task<IEnumerable<Employee>> SaveEmployeesAsync(List<Employee> hours);
        Task<IEnumerable<Location>> SaveLocationsAsync(List<Location> hours);
        Task<IEnumerable<OperationHour>> SaveOperationHoursAsync(List<OperationHour> hours);
        Task<IEnumerable<ProductType>> SaveProductTypesAsync(List<ProductType> hours);
    }
}