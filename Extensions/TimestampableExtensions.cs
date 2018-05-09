using System;
using System.Linq;
using qsales.Models;

namespace qsales.Extensions
{
    public static class ITimestampableExtensions
    {
        public static IQueryable<T> GetEntryForDate<T>(this IQueryable<T> source, DateTime entryDate) where T : ITimestampable
        {
            return source
            .Where(x => x.EntryDate < entryDate.AddDays(1))
            .Where(x => x.EntryDate >= entryDate);
        }
    }
}