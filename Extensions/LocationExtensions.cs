using System;
using System.Linq;
using qsales.Models;

namespace qsales.Extensions {
    public static class LocationExtensions {
        public static IQueryable<Location> GetLocationsForBar(this IQueryable<Location> source, Guid b) {
            return source.Where(x => x.BarId == b);
        }
    }
}