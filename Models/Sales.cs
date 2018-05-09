using System;

namespace qsales.Models
{
    public class Sales : ITimestampable
    {
        public int Id { get; set; }
        public DateTime EntryDate { get; set; }
        public int HundredDollarBills { get; set; }
        public int FiftyDollarBills { get; set; }
        public int TwentyDollarBills { get; set; }
        public int TenDollarBills { get; set; }
        public int FiveDollarBills { get; set; }
        public int OneDollarBills { get; set; }
        public decimal CreditCardAmount { get; set; }
    }
}