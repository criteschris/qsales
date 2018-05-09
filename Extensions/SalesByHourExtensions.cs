using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using qsales.Models;

namespace qsales.Extensions
{
    public static class SalesByHourExtensions
    {
        public static IQueryable<SalesByHour> IncludeWeather(this IQueryable<SalesByHour> source)
        {
            return source.Include("Weather");
        }
    }
}