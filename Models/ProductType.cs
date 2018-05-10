using System.Collections.Generic;

namespace qsales.Models
{
    public class ProductType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<SalesByProductType> SalesByProductTypes { get; set; }
    }
}