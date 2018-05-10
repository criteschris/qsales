using System.Collections.Generic;

namespace qsales.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<SalesByLocation> SalesByLocations { get; set; }
    }
}