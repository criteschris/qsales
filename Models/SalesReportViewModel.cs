using System;

namespace qsales.Models
{
    public class SalesReportViewModel
    {
        public DateTime EntryDate { get; set; }
        public decimal TotalSales { get; set; }
        public int TotalCustomers { get; set; }
        public int TotalPersonel { get; set; }
    }
}