using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using qsales.Models;

namespace qsales.Repositories
{
    public interface IFacetRepository
    {
        //Task<FacetViewModel> GetFacetsAsync();
        Task<IEnumerable<Bar>> GetBars();
        Task<IEnumerable<Condition>> GetConditionsAsync();
        Task<IEnumerable<Employee>> GetEmployeesAsync(Guid b);
        Task<IEnumerable<Event>> GetEventsAsync(Guid b);
        Task<IEnumerable<Location>> GetLocationsAsync(Guid b);
        Task<IEnumerable<OperationHour>> GetOperationHoursAsync();
        Task<IEnumerable<Organization>> GetOrganizationsAsync(Guid b);
        Task<IEnumerable<Performer>> GetPerformersAsync(Guid b);
        Task<IEnumerable<ProductType>> GetProductTypesAsync(Guid b);

        Task<IEnumerable<Condition>> SaveConditionsAsync(List<Condition> conditions);
        Task<IEnumerable<Employee>> SaveEmployeesAsync(Guid b, List<Employee> employees);
        Task<IEnumerable<Event>> SaveEventsAsync(Guid b, List<Event> events);
        Task<IEnumerable<Location>> SaveLocationsAsync(Guid b, List<Location> locations);
        Task<IEnumerable<OperationHour>> SaveOperationHoursAsync(List<OperationHour> hours);
        Task<IEnumerable<Organization>> SaveOrganizationsAsync(Guid b, List<Organization> organizations);
        Task<IEnumerable<Performer>> SavePerformersAsync(Guid b, List<Performer> performers);
        Task<IEnumerable<ProductType>> SaveProductTypesAsync(Guid b, List<ProductType> productTypes);
    }
}