using System.Collections.Generic;

namespace qsales.Models
{
    public class SalesEntryViewModel
    {
        public IEnumerable<Condition> Conditions { get; set; }
        public IEnumerable<Employee> Employees { get; set; }
        public IEnumerable<Event> Events { get; set; }
        public IEnumerable<OperationHour> OperationHours { get; set; }
        public IEnumerable<Location> Locations { get; set; }
        public IEnumerable<Organization> Organizations { get; set; }
        public IEnumerable<Performer> Performers { get; set; }
        public IEnumerable<ProductType> ProductTypes { get; set; }
        public Sales Sales { get; set; }
    }
}