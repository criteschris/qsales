using System;
using System.Linq;
using qsales.Models;

namespace qsales.Extensions {
    public static class PerformerExtensions {
        public static IQueryable<Performer> GetPerformersForBar(this IQueryable<Performer> source, Guid b) {
            return source.Where(x => x.BarId == b);
        }
    }
}