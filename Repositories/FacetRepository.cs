using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using qsales.Extensions;
using qsales.Models;

namespace qsales.Repositories
{
    public class FacetRepository : IFacetRepository
    {
        private readonly QSalesDbContext _context;

        public FacetRepository(QSalesDbContext context)
        {
            _context = context;
        }

        /* public async Task<FacetViewModel> GetFacetsAsync()
        {
            var conditionTask = _context.Condition.ToListAsync();
            var employeeTask = _context.Employee.ToListAsync();
            var hourTask = _context.OperationHour.ToListAsync();
            var locationTask = _context.Location.ToListAsync();
            var productTypeTask = _context.ProductType.ToListAsync();

            await Task.WhenAll(new Task[] {
                employeeTask,
                hourTask,
                locationTask,
                productTypeTask,
                conditionTask
            });

            return new FacetViewModel
            {
                Employees = employeeTask.Result,
                OperationHours = hourTask.Result,
                Locations = locationTask.Result,
                ProductTypes = productTypeTask.Result,
                Conditions = conditionTask.Result
            };
        } */

        public async Task<IEnumerable<Bar>> GetBars() {
            return await _context.Bar.ToListAsync();
        }

        public async Task<IEnumerable<Condition>> GetConditionsAsync()
        {
            return await _context.Condition.ToListAsync();
        }

        public async Task<IEnumerable<Employee>> GetEmployeesAsync(Guid b)
        {
            return await _context.Employee.GetEmployeesForBar(b).ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetEventsAsync(Guid b)
        {
            return await _context.Event.GetEventsForBar(b).ToListAsync();
        }

        public async Task<IEnumerable<Location>> GetLocationsAsync(Guid b)
        {
            return await _context.Location.GetLocationsForBar(b).ToListAsync();
        }

        public async Task<IEnumerable<OperationHour>> GetOperationHoursAsync()
        {
            return await _context.OperationHour.ToListAsync();
        }

        public async Task<IEnumerable<Organization>> GetOrganizationsAsync(Guid b)
        {
            return await _context.Organization.GetOrganizationsForBar(b).ToListAsync();
        }

        public async Task<IEnumerable<Performer>> GetPerformersAsync(Guid b)
        {
            return await _context.Performer.GetPerformersForBar(b).ToListAsync();
        }

        public async Task<IEnumerable<ProductType>> GetProductTypesAsync(Guid b)
        {
            return await _context.ProductType.GetProductTypesForBar(b).ToListAsync();
        }

        public async Task<IEnumerable<Condition>> SaveConditionsAsync(List<Condition> facets)
        {
            var currentFacets = await _context.Condition.ToListAsync();

            currentFacets.ForEach(f =>
            {
                var facet = facets.Find(x => x.Id == f.Id);

                if (facet != null)
                {
                    if (f.Name != facet.Name)
                    {
                        f.Name = facet.Name;
                        _context.Condition.Update(f);
                    }
                }
                else
                {
                    _context.Condition.Remove(f);
                }
            });

            facets.ForEach(f =>
            {
                var match = currentFacets.Find(x => x.Id == f.Id);

                if (match == null)
                {
                    _context.Condition.Add(f);
                }
            });

            await _context.SaveChangesAsync();

            return await _context.Condition.ToListAsync();
        }

        public async Task<IEnumerable<Employee>> SaveEmployeesAsync(Guid b, List<Employee> facets)
        {
            var currentFacets = await _context.Employee.ToListAsync();

            currentFacets.ForEach(f =>
            {
                var facet = facets.Find(x => x.Id == f.Id);

                if (facet != null)
                {
                    if (f.Name != facet.Name)
                    {
                        f.Name = facet.Name;
                        _context.Employee.Update(f);
                    }
                }
                else
                {
                    _context.Employee.Remove(f);
                }
            });

            facets.ForEach(f =>
            {
                var match = currentFacets.Find(x => x.Id == f.Id);

                if (match == null)
                {
                    _context.Employee.Add(f);
                }
            });

            await _context.SaveChangesAsync();

            return await _context.Employee.ToListAsync();
        }

        public async Task<IEnumerable<Event>> SaveEventsAsync(Guid b, List<Event> facets)
        {
            var currentFacets = await _context.Event.ToListAsync();

            currentFacets.ForEach(f =>
            {
                var facet = facets.Find(x => x.Id == f.Id);

                if (facet != null)
                {
                    if (f.Name != facet.Name)
                    {
                        f.Name = facet.Name;
                        _context.Event.Update(f);
                    }
                }
                else
                {
                    _context.Event.Remove(f);
                }
            });

            facets.ForEach(f =>
            {
                var match = currentFacets.Find(x => x.Id == f.Id);

                if (match == null)
                {
                    _context.Event.Add(f);
                }
            });

            await _context.SaveChangesAsync();

            return await _context.Event.ToListAsync();
        }

        public async Task<IEnumerable<Location>> SaveLocationsAsync(Guid b, List<Location> facets)
        {
            var currentFacets = await _context.Location.ToListAsync();

            currentFacets.ForEach(f =>
            {
                var facet = facets.Find(x => x.Id == f.Id);

                if (facet != null)
                {
                    if (f.Name != facet.Name)
                    {
                        f.Name = facet.Name;
                        _context.Location.Update(f);
                    }
                }
                else
                {
                    _context.Location.Remove(f);
                }
            });

            facets.ForEach(f =>
            {
                var match = currentFacets.Find(x => x.Id == f.Id);

                if (match == null)
                {
                    _context.Location.Add(f);
                }
            });

            await _context.SaveChangesAsync();

            return await _context.Location.ToListAsync();
        }

        public async Task<IEnumerable<OperationHour>> SaveOperationHoursAsync(List<OperationHour> facets)
        {
            var currentFacets = await _context.OperationHour.ToListAsync();

            currentFacets.ForEach(f =>
            {
                var facet = facets.Find(x => x.Id == f.Id);

                if (facet != null)
                {
                    if (f.Name != facet.Name)
                    {
                        f.Name = facet.Name;
                        _context.OperationHour.Update(f);
                    }
                }
                else
                {
                    _context.OperationHour.Remove(f);
                }
            });

            facets.ForEach(f =>
            {
                var match = currentFacets.Find(x => x.Id == f.Id);

                if (match == null)
                {
                    _context.OperationHour.Add(f);
                }
            });

            await _context.SaveChangesAsync();

            return await _context.OperationHour.ToListAsync();
        }

        public async Task<IEnumerable<Organization>> SaveOrganizationsAsync(Guid b, List<Organization> facets) {
            var currentFacets = await _context.Organization.ToListAsync();

            currentFacets.ForEach(f => {
                var facet = facets.Find(x => x.Id == f.Id);

                if (facet != null) {
                    if (f.Name != facet.Name) {
                        f.Name = facet.Name;
                        _context.Organization.Update(f);
                    }
                } else {
                    _context.Organization.Remove(f);
                }
            });

            facets.ForEach(f => {
                var match = currentFacets.Find(x => x.Id == f.Id);

                if (match == null){
                    _context.Organization.Add(f);
                }
            });

            await _context.SaveChangesAsync();

            return await _context.Organization.ToListAsync();
        }

        public async Task<IEnumerable<Performer>> SavePerformersAsync(Guid b, List<Performer> facets) {
            var currentFacets = await _context.Performer.ToListAsync();

            currentFacets.ForEach(f => {
                var facet = facets.Find(x => x.Id == f.Id);

                if (facet != null) {
                    if (f.Name != facet.Name) {
                        f.Name = facet.Name;
                        _context.Performer.Update(f);
                    }
                } else {
                    _context.Performer.Remove(f);
                }
            });

            facets.ForEach(f => {
                var match = currentFacets.Find(x => x.Id == f.Id);

                if (match == null){
                    _context.Performer.Add(f);
                }
            });

            await _context.SaveChangesAsync();

            return await _context.Performer.ToListAsync();
        }

        public async Task<IEnumerable<ProductType>> SaveProductTypesAsync(Guid b, List<ProductType> facets)
        {
            var currentFacets = await _context.ProductType.ToListAsync();

            currentFacets.ForEach(f =>
            {
                var facet = facets.Find(x => x.Id == f.Id);

                if (facet != null)
                {
                    if (f.Name != facet.Name)
                    {
                        f.Name = facet.Name;
                        _context.ProductType.Update(f);
                    }
                }
                else
                {
                    _context.ProductType.Remove(f);
                }
            });

            facets.ForEach(f =>
            {
                var match = currentFacets.Find(x => x.Id == f.Id);

                if (match == null)
                {
                    _context.ProductType.Add(f);
                }
            });

            await _context.SaveChangesAsync();

            return await _context.ProductType.ToListAsync();
        }
    }
}