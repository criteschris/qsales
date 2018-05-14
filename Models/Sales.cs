using System;
using System.Collections.Generic;

namespace qsales.Models
{
    public class Sales : ITimestampable
    {
        public int Id { get; set; }
        public Guid BarId { get; set; }
        public int? EventId { get; set; }
        public int? OrganizationId { get; set; }
        public int? PerformerId { get; set; }
        public DateTime EntryDate { get; set; }
        public decimal Hundreds { get; set; }
        public decimal Fifties { get; set; }
        public decimal Twenties { get; set; }
        public decimal Tens { get; set; }
        public decimal Fives { get; set; }
        public decimal Ones { get; set; }
        public decimal CreditCardAmount { get; set; }

        public virtual Bar Bar { get; set; }
        public virtual Event Event { get; set; }
        public virtual Organization Organization { get; set; }
        public virtual Performer Performer { get; set; }
        public virtual ICollection<SalesByHour> SalesByHours { get; set; }
        public virtual ICollection<SalesByLocation> SalesByLocations { get; set; }
        public virtual ICollection<SalesByProductType> SalesByProductTypes { get; set; }
        public virtual ICollection<Payroll> Payrolls { get; set; }
    }
}