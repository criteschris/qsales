using System;

namespace qsales.Models
{
    public class SalesByHour : ITimestampable
    {
        public int Id { get; set; }
        public int WeatherId { get; set; }
        public DateTime EntryDate { get; set; }
        public int Hour { get; set; }
        public int Amount { get; set; }
        public int Customers { get; set; }

        public virtual Weather Weather { get; set; }
    }
}