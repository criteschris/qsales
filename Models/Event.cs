using System;
using System.Collections.Generic;

namespace qsales.Models
{
    public class Event
    {
        public int Id { get; set; }
        public Guid BarId { get; set; }
        public string Name { get; set; }

        public virtual Bar Bar { get; set; }
        public virtual ICollection<Sales> Sales { get; set; }
    }
}