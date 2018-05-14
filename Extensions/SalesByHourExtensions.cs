using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using qsales.Models;

namespace qsales.Extensions
{
    public static class SalesByHourExtensions
    {
        public static IQueryable<SalesByHour> IncludeCondition(this IQueryable<SalesByHour> source)
        {
            return source.Include("Condition");
        }

        public static IQueryable<SalesByHour> MakeSerializable(this IQueryable<SalesByHour> source)
        {
            return source.Select(x => new SalesByHour
            {
                Id = x.Id,
                SalesId = x.SalesId,
                OperationHourId = x.OperationHourId,
                ConditionId = x.ConditionId,
                //EntryDate = x.EntryDate,
                Amount = x.Amount,
                OperationHour = new OperationHour
                {
                    Id = x.OperationHour.Id,
                    Name = x.OperationHour.Name
                }
            });
        }
    }
}