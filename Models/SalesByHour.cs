using System;

namespace qsales.Models
{
    public class SalesByHour : ITimestampable
    {
        public int Id { get; set; }
        public int OperationHourId { get; set; }
        public int ConditionId { get; set; }
        public DateTime EntryDate { get; set; }
        public int Amount { get; set; }
        public int Customers { get; set; }

        public virtual OperationHour OperationHour { get; set; }
        public virtual Condition Condition { get; set; }
    }
}