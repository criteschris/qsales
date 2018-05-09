using System.Collections.Generic;

namespace qsales.Models
{
    public class SalesEntryViewModel
    {
        public Sales Sales { get; set; }
        public IEnumerable<SalesByHour> SalesByHour { get; set; }
        public IEnumerable<SalesByLocation> SalesByLocation { get; set; }
        public IEnumerable<SalesByProductType> SalesByProductType { get; set; }
    }
}