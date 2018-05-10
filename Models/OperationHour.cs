using System.Collections.Generic;

namespace qsales.Models
{
    public class OperationHour
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<SalesByHour> SalesByHours { get; set; }
    }
}