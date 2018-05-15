using System.Collections.Generic;

namespace qsales.Models
{
    public class ReportPageViewModel
    {
        public IEnumerable<Event> Events { get; set; }
        public IEnumerable<Organization> Organizations { get; set; }
        public IEnumerable<Performer> Performers { get; set; }
    }
}