using System.Collections.Generic;

namespace qsales.Models {
    public class FacetViewModel {
        public IEnumerable<Condition> Conditions { get; set; }
        public IEnumerable<Employee> Employees { get; set; }
        public IEnumerable<OperationHour> OperationHours { get; set; }
        public IEnumerable<Location> Locations { get; set; }
        public IEnumerable<ProductType> ProductTypes {get;set;}
    }
}