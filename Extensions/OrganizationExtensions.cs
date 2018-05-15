using System;
using System.Linq;
using qsales.Models;

namespace qsales.Extensions {
    public static class OrganizationExtensions {
        public static IQueryable<Organization> GetOrganizationsForBar(this IQueryable<Organization> source, Guid b) {
            return source.Where(x => x.BarId == b);
        }
    }
}