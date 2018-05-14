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

        public static IQueryable<SalesByLocation> MakeSerializable(this IQueryable<SalesByLocation> source)
        {
            return source.Select(x => new SalesByLocation
            {
                Id = x.Id,
                SalesId = x.SalesId,
                LocationId = x.LocationId,
                //EntryDate = x.EntryDate,
                Amount = x.Amount,
                Location = new Location
                {
                    Id = x.Location.Id,
                    Name = x.Location.Name
                }
            });
        }
    }
}