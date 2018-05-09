using System;
using System.Linq;
using qsales.Models;

namespace qsales.Extensions
{
    public static class SalesExtensions
    {
        public static IQueryable<Sales> GetSalesForDate(this IQueryable<Sales> source, DateTime entryDate)
        {
            return source
            .Where(x => x.EntryDate < entryDate.AddDays(1))
            .Where(x => x.EntryDate >= entryDate);
        }
    }
}