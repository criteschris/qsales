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

        public static IQueryable<SalesByProductType> MakeSerializable(this IQueryable<SalesByProductType> source)
        {
            return source.Select(x => new SalesByProductType
            {
                Id = x.Id,
                ProductTypeId = x.ProductTypeId,
                EntryDate = x.EntryDate,
                Amount = x.Amount,
                ProductType = new ProductType
                {
                    Id = x.ProductType.Id,
                    Name = x.ProductType.Name
                }
            });
        }
    }
}