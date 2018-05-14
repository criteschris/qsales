using System;

namespace qsales.Models
{
    public class SalesByProductType// : ITimestampable
    {
        public int Id { get; set; }
        public int SalesId { get; set; }
        public int ProductTypeId { get; set; }
        //public DateTime EntryDate { get; set; }
        public decimal Amount { get; set; }

        public virtual Sales Sales { get; set; }
        public virtual ProductType ProductType { get; set; }
    }
}