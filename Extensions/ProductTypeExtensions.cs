using System;
using System.Linq;
using qsales.Models;

namespace qsales.Extensions {
    public static class ProductTypeExtensions {
        public static IQueryable<ProductType> GetProductTypesForBar(this IQueryable<ProductType> source, Guid b) {
            return source.Where(x => x.BarId == b);
        }
    }
}