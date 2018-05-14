using System.Collections.Generic;

namespace qsales.Models
{
    public class DashboardViewModel
    {
        public Sales Sales { get; set; }
        /* public IEnumerable<SalesByHour> SalesByHour { get; set; }
        public IEnumerable<SalesByLocation> SalesByLocation { get; set; }
        public IEnumerable<SalesByProductType> SalesByProductType { get; set; } */
        public IEnumerable<OperationHour> OperationHours { get; set; }
    }
}