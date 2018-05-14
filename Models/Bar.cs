using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace qsales.Models
{
    public class Bar
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; internal set; }
        public string Name { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<Location> Locations { get; set; }
        public virtual ICollection<Organization> Organizations { get; set; }
        public virtual ICollection<Performer> Performers { get; set; }
        public virtual ICollection<ProductType> ProductTypes { get; set; }
    }
}