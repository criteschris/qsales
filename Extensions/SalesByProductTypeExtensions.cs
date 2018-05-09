using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using qsales.Models;

namespace qsales.Extensions
{
    public static class SalesByProductTypeExtensions
    {
        public static IQueryable<SalesByProductType> IncludeProductType(this IQueryable<SalesByProductType> source)
        {
            return source.Include("ProductType");
        }
    }
}