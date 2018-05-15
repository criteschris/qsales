using System;
using System.Linq;
using qsales.Models;

namespace qsales.Extensions {
    public static class EventExtensions {
        public static IQueryable<Event> GetEventsForBar(this IQueryable<Event> source, Guid b) {
            return source.Where(x => x.BarId == b);
        }
    }
}