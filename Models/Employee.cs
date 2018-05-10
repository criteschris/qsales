using System.Collections.Generic;

namespace qsales.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Payroll> Payrolls { get; set; }
    }
}