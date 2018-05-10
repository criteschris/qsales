using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using qsales.Models;

namespace qsales.Repositories {
    public class FacetRepository : IFacetRepository {
        private readonly QSalesDbContext _context;

        public FacetRepository(QSalesDbContext context) {
            _context = context;
        }

        public async Task<FacetViewModel> GetFacetsAsync() {
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

            return new FacetViewModel {
                Employees = employeeTask.Result,
                OperationHours = hourTask.Result,
                Locations = locationTask.Result,
                ProductTypes = productTypeTask.Result,
                Conditions = conditionTask.Result
            };
        }

        public async Task<IEnumerable<Condition>> GetConditionsAsync(){
            return await _context.Condition.ToListAsync();
        }

        public async Task<IEnumerable<Employee>> GetEmployeesAsync(){
            return await _context.Employee.ToListAsync();
        }

        public async Task<IEnumerable<Location>> GetLocationsAsync(){
            return await _context.Location.ToListAsync();
        }

        public async Task<IEnumerable<OperationHour>> GetOperationHoursAsync(){
            return await _context.OperationHour.ToListAsync();
        }

        public async Task<IEnumerable<ProductType>> GetProductTypesAsync(){
            return await _context.ProductType.ToListAsync();
        }

        public async Task<IEnumerable<Condition>> SaveConditionsAsync(List<Condition> facets) {
            var currentFacets = await _context.Condition.ToListAsync();

            currentFacets.ForEach(f => {
                var facet = facets.Find(x => x.Id == f.Id);

                if (facet != null) {
                    if (f.Name != facet.Name) {
                        f.Name = facet.Name;
                        _context.Condition.Update(f);
                    }
                } else {
                    _context.Condition.Remove(f);
                }
            });

            facets.ForEach(f => {
                var match = currentFacets.Find(x => x.Id == f.Id);

                if (match == null){
                    _context.Condition.Add(f);
                }
            });

            await _context.SaveChangesAsync();

            return await _context.Condition.ToListAsync();
        }

        public async Task<IEnumerable<Employee>> SaveEmployeesAsync(List<Employee> facets) {
            var currentFacets = await _context.Employee.ToListAsync();

            currentFacets.ForEach(f => {
                var facet = facets.Find(x => x.Id == f.Id);

                if (facet != null) {
                    if (f.Name != facet.Name) {
                        f.Name = facet.Name;
                        _context.Employee.Update(f);
                    }
                } else {
                    _context.Employee.Remove(f);
                }
            });

            facets.ForEach(f => {
                var match = currentFacets.Find(x => x.Id == f.Id);

                if (match == null){
                    _context.Employee.Add(f);
                }
            });

            await _context.SaveChangesAsync();

            return await _context.Employee.ToListAsync();
        }

        public async Task<IEnumerable<Location>> SaveLocationsAsync(List<Location> facets) {
            var currentFacets = await _context.Location.ToListAsync();

            currentFacets.ForEach(f => {
                var facet = facets.Find(x => x.Id == f.Id);

                if (facet != null) {
                    if (f.Name != facet.Name) {
                        f.Name = facet.Name;
                        _context.Location.Update(f);
                    }
                } else {
                    _context.Location.Remove(f);
                }
            });

            facets.ForEach(f => {
                var match = currentFacets.Find(x => x.Id == f.Id);

                if (match == null){
                    _context.Location.Add(f);
                }
            });

            await _context.SaveChangesAsync();

            return await _context.Location.ToListAsync();
        }

        public async Task<IEnumerable<OperationHour>> SaveOperationHoursAsync(List<OperationHour> facets) {
            var currentFacets = await _context.OperationHour.ToListAsync();

            currentFacets.ForEach(f => {
                var facet = facets.Find(x => x.Id == f.Id);

                if (facet != null) {
                    if (f.Name != facet.Name) {
                        f.Name = facet.Name;
                        _context.OperationHour.Update(f);
                    }
                } else {
                    _context.OperationHour.Remove(f);
                }
            });

            facets.ForEach(f => {
                var match = currentFacets.Find(x => x.Id == f.Id);

                if (match == null){
                    _context.OperationHour.Add(f);
                }
            });

            await _context.SaveChangesAsync();

            return await _context.OperationHour.ToListAsync();
        }

        public async Task<IEnumerable<ProductType>> SaveProductTypesAsync(List<ProductType> facets) {
            var currentFacets = await _context.ProductType.ToListAsync();

            currentFacets.ForEach(f => {
                var facet = facets.Find(x => x.Id == f.Id);

                if (facet != null) {
                    if (f.Name != facet.Name) {
                        f.Name = facet.Name;
                        _context.ProductType.Update(f);
                    }
                } else {
                    _context.ProductType.Remove(f);
                }
            });

            facets.ForEach(f => {
                var match = currentFacets.Find(x => x.Id == f.Id);

                if (match == null){
                    _context.ProductType.Add(f);
                }
            });

            await _context.SaveChangesAsync();

            return await _context.ProductType.ToListAsync();
        }
    }
}