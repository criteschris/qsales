using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using qsales.Models;

namespace qsales.Extensions
{
    public static class SalesByLocationExtensions
    {
        public static IQueryable<SalesByLocation> IncludeLocation(this IQueryable<SalesByLocation> source)
        {
            return source.Include("Location");
        }
    }
}