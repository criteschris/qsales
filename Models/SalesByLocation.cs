using System;

namespace qsales.Models
{
    public class SalesByLocation : ITimestampable
    {
        public int Id { get; set; }
        public int LocationId { get; set; }
        public DateTime EntryDate { get; set; }
        public decimal Amount { get; set; }

        public virtual Location Location { get; set; }
    }
}