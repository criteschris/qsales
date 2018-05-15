using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using qsales.Helpers;
using qsales.Models;

namespace qsales.Extensions
{
    public static class SalesExtensions
    {
        public static IQueryable<Sales> GetByBar(this IQueryable<Sales> source, Guid b) {
            return source.Where(x => x.BarId == b);
        }
        public static IQueryable<Sales> GetSalesForDate(this IQueryable<Sales> source, DateTime entryDate)
        {
            return source
            .Where(x => x.EntryDate < entryDate.AddDays(1))
            .Where(x => x.EntryDate >= entryDate);
        }

        public static IQueryable<Sales> GetSalesByDayOfWeek(this IQueryable<Sales> source, int dayOfWeek) {
            return source.Where(x => x.EntryDate.DayOfWeek == DayOfWeekHelpers.ConvertIntToDayOfWeek(dayOfWeek));
        }

        public static IQueryable<Sales> GetSalesByEventId(this IQueryable<Sales> source, int eventId) {
            return source.Where(x => x.EventId == eventId);
        }

        public static IQueryable<Sales> GetSalesByOrganizationId(this IQueryable<Sales> source, int organizationId) {
            return source.Where(x => x.OrganizationId == organizationId);
        }

        public static IQueryable<Sales> GetSalesByPerformerId(this IQueryable<Sales> source, int performerId) {
            return source.Where(x => x.PerformerId == performerId);
        }

        public static IQueryable<Sales> IncludeSalesBy(this IQueryable<Sales> source)
        {
            return source.Include("SalesByHours").Include("SalesByHours.OperationHour")
                .Include("SalesByLocations").Include("SalesByLocations.Location")
                .Include("SalesByProductTypes").Include("SalesByProductTypes.ProductType");
        }

        public static IQueryable<Sales> MakeSerializable(this IQueryable<Sales> source)
        {
            return source.Select(x => new Sales
            {
                Id = x.Id,
                BarId = x.BarId,
                EventId = x.EventId,
                OrganizationId = x.OrganizationId,
                PerformerId = x.PerformerId,
                EntryDate = x.EntryDate,
                Hundreds = x.Hundreds,
                Fifties = x.Fifties,
                Twenties = x.Twenties,
                Tens = x.Tens,
                Fives = x.Fives,
                Ones = x.Ones,
                CreditCardAmount = x.CreditCardAmount,
                Event = x.EventId == null ? null : new Event
                {
                    Id = x.Event.Id,
                    Name = x.Event.Name
                },
                Organization = x.OrganizationId == null ? null : new Organization
                {
                    Id = x.Organization.Id,
                    Name = x.Organization.Name
                },
                Performer = x.PerformerId == null ? null : new Performer {
                    Id = x.Performer.Id,
                    Name = x.Performer.Name
                },
                SalesByHours = x.SalesByHours.Select(h => new SalesByHour
                {
                    Id = h.Id,
                    SalesId = h.SalesId,
                    OperationHourId = h.OperationHourId,
                    ConditionId = h.ConditionId,
                    Amount = h.Amount,
                    OperationHour = new OperationHour
                    {
                        Id = h.OperationHour.Id,
                        Name = h.OperationHour.Name
                    }
                }).ToList(),
                SalesByLocations = x.SalesByLocations.Select(l => new SalesByLocation
                {
                    Id = l.Id,
                    SalesId = l.SalesId,
                    LocationId = l.LocationId,
                    Amount = l.Amount,
                    Location = new Location
                    {
                        Id = l.Location.Id,
                        Name = l.Location.Name
                    }
                }).ToList(),
                SalesByProductTypes = x.SalesByProductTypes.Select(p => new SalesByProductType
                {
                    Id = p.Id,
                    SalesId = p.SalesId,
                    ProductTypeId = p.ProductTypeId,
                    Amount = p.Amount,
                    ProductType = new ProductType
                    {
                        Id = p.ProductType.Id,
                        Name = p.ProductType.Name
                    }
                }).ToList()
            });
        }

        public static IQueryable<SalesReportViewModel> ToSalesReportViewModel(this IQueryable<Sales> source)
        {
            return source.Select(x => new SalesReportViewModel {
                EntryDate = x.EntryDate,
                TotalSales = x.Hundreds + x.Fifties + x.Twenties + x.Tens + x.Fives + x.Ones + x.CreditCardAmount,
                TotalCustomers = x.SalesByHours.Sum(y => y.Customers),
                TotalPersonel = x.Payrolls.Count()
            });
        }
    }
}