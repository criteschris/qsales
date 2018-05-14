namespace qsales.Models
{
    public class Payroll
    {
        public int Id { get; set; }
        public int SalesId { get; set; }
        public int EmployeeId { get; set; }
        public decimal Amount { get; set; }

        public virtual Sales Sales { get; set; }
        public virtual Employee Employee { get; set; }
    }
}