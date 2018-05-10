using System;
using System.Linq;
using qsales.Models;

namespace qsales.Extensions
{
    public static class QSalesDbContextExtensions
    {
        public static void EnsureSeedData(this QSalesDbContext context)
        {
            if (!context.Condition.Any())
            {
                context.Condition.AddRange(
                    new Condition { Name = "Sunny" },
                    new Condition { Name = "Rain" },
                    new Condition { Name = "Snow" }
                );
            }

            if (!context.Employee.Any())
            {
                context.Employee.AddRange(
                    new Employee { Name = "John Doe" },
                    new Employee { Name = "Jane Doe" },
                    new Employee { Name = "Joe Doe" }
                );
            }

            if (!context.OperationHour.Any())
            {
                context.OperationHour.AddRange(
                    new OperationHour { Name = "12 am" },
                    new OperationHour { Name = "1 am" },
                    new OperationHour { Name = "2 am" },
                    new OperationHour { Name = "3 am" },
                    new OperationHour { Name = "4 am" },
                    new OperationHour { Name = "5 am" },
                    new OperationHour { Name = "6 am" },
                    new OperationHour { Name = "7 am" },
                    new OperationHour { Name = "8 am" },
                    new OperationHour { Name = "9 am" },
                    new OperationHour { Name = "10 am" },
                    new OperationHour { Name = "11 am" },
                    new OperationHour { Name = "12 pm" },
                    new OperationHour { Name = "1 pm" },
                    new OperationHour { Name = "2 pm" },
                    new OperationHour { Name = "3 pm" },
                    new OperationHour { Name = "4 pm" },
                    new OperationHour { Name = "5 pm" },
                    new OperationHour { Name = "6 pm" },
                    new OperationHour { Name = "7 pm" },
                    new OperationHour { Name = "8 pm" },
                    new OperationHour { Name = "9 pm" },
                    new OperationHour { Name = "10 pm" },
                    new OperationHour { Name = "11 pm" }
                );
            }

            if (!context.Location.Any())
            {
                context.Location.AddRange(
                    new Location { Name = "Mezzanine" },
                    new Location { Name = "Back Bar" },
                    new Location { Name = "Lounge" }
                );
            }

            if (!context.Payroll.Any())
            {
                /* context.Payroll.AddRange(
                    new Payroll {}
                ); */
            }

            if (!context.ProductType.Any())
            {
                context.ProductType.AddRange(
                    new ProductType { Name = "Food" },
                    new ProductType { Name = "Liquor" }
                );
            }

            if (!context.Sales.Any())
            {
                context.Sales.AddRange(
                    new Sales { EntryDate = DateTime.Now.AddDays(-7), HundredDollarBills = 2, FiftyDollarBills = 1, TwentyDollarBills = 54, TenDollarBills = 23, FiveDollarBills = 0, OneDollarBills = 12, CreditCardAmount = 2376.67M },
                    new Sales { EntryDate = DateTime.Now.AddDays(-6), HundredDollarBills = 0, FiftyDollarBills = 0, TwentyDollarBills = 87, TenDollarBills = 54, FiveDollarBills = 10, OneDollarBills = 29, CreditCardAmount = 1289.13M },
                    new Sales { EntryDate = DateTime.Now.AddDays(-5), HundredDollarBills = 0, FiftyDollarBills = 2, TwentyDollarBills = 65, TenDollarBills = 28, FiveDollarBills = 8, OneDollarBills = 14, CreditCardAmount = 1998.93M },
                    new Sales { EntryDate = DateTime.Now.AddDays(-4), HundredDollarBills = 1, FiftyDollarBills = 0, TwentyDollarBills = 38, TenDollarBills = 65, FiveDollarBills = 29, OneDollarBills = 7, CreditCardAmount = 2938.52M },
                    new Sales { EntryDate = DateTime.Now.AddDays(-3), HundredDollarBills = 5, FiftyDollarBills = 7, TwentyDollarBills = 27, TenDollarBills = 12, FiveDollarBills = 13, OneDollarBills = 9, CreditCardAmount = 3932.38M },
                    new Sales { EntryDate = DateTime.Now.AddDays(-2), HundredDollarBills = 3, FiftyDollarBills = 3, TwentyDollarBills = 48, TenDollarBills = 53, FiveDollarBills = 11, OneDollarBills = 22, CreditCardAmount = 4002.59M },
                    new Sales { EntryDate = DateTime.Now.AddDays(-1), HundredDollarBills = 0, FiftyDollarBills = 1, TwentyDollarBills = 70, TenDollarBills = 33, FiveDollarBills = 5, OneDollarBills = 33, CreditCardAmount = 2439.19M },
                    new Sales { EntryDate = DateTime.Now, HundredDollarBills = 3, FiftyDollarBills = 0, TwentyDollarBills = 44, TenDollarBills = 23, FiveDollarBills = 14, OneDollarBills = 22, CreditCardAmount = 3912.87M }
                );
            }

            if (!context.SalesByHour.Any())
            {

            }

            if (!context.SalesByLocation.Any())
            {
                context.SalesByLocation.AddRange(
                    new SalesByLocation { LocationId = 1, Amount = 1000M, EntryDate = DateTime.Now.AddDays(-7) },
                    new SalesByLocation { LocationId = 1, Amount = 1800M, EntryDate = DateTime.Now.AddDays(-6) },
                    new SalesByLocation { LocationId = 1, Amount = 800M, EntryDate = DateTime.Now.AddDays(-5) },
                    new SalesByLocation { LocationId = 1, Amount = 1150M, EntryDate = DateTime.Now.AddDays(-4) },
                    new SalesByLocation { LocationId = 1, Amount = 1900M, EntryDate = DateTime.Now.AddDays(-3) },
                    new SalesByLocation { LocationId = 1, Amount = 3400M, EntryDate = DateTime.Now.AddDays(-2) },
                    new SalesByLocation { LocationId = 1, Amount = 2723M, EntryDate = DateTime.Now.AddDays(-1) },
                    new SalesByLocation { LocationId = 1, Amount = 899M, EntryDate = DateTime.Now },
                    new SalesByLocation { LocationId = 2, Amount = 100M, EntryDate = DateTime.Now.AddDays(-7) },
                    new SalesByLocation { LocationId = 2, Amount = 800M, EntryDate = DateTime.Now.AddDays(-6) },
                    new SalesByLocation { LocationId = 2, Amount = 300M, EntryDate = DateTime.Now.AddDays(-5) },
                    new SalesByLocation { LocationId = 2, Amount = 150M, EntryDate = DateTime.Now.AddDays(-4) },
                    new SalesByLocation { LocationId = 2, Amount = 560M, EntryDate = DateTime.Now.AddDays(-3) },
                    new SalesByLocation { LocationId = 2, Amount = 300M, EntryDate = DateTime.Now.AddDays(-2) },
                    new SalesByLocation { LocationId = 2, Amount = 223M, EntryDate = DateTime.Now.AddDays(-1) },
                    new SalesByLocation { LocationId = 2, Amount = 99M, EntryDate = DateTime.Now },
                    new SalesByLocation { LocationId = 3, Amount = 300M, EntryDate = DateTime.Now.AddDays(-7) },
                    new SalesByLocation { LocationId = 3, Amount = 700M, EntryDate = DateTime.Now.AddDays(-6) },
                    new SalesByLocation { LocationId = 3, Amount = 90M, EntryDate = DateTime.Now.AddDays(-5) },
                    new SalesByLocation { LocationId = 3, Amount = 150M, EntryDate = DateTime.Now.AddDays(-4) },
                    new SalesByLocation { LocationId = 3, Amount = 450M, EntryDate = DateTime.Now.AddDays(-3) },
                    new SalesByLocation { LocationId = 3, Amount = 270M, EntryDate = DateTime.Now.AddDays(-2) },
                    new SalesByLocation { LocationId = 3, Amount = 203M, EntryDate = DateTime.Now.AddDays(-1) },
                    new SalesByLocation { LocationId = 3, Amount = 69M, EntryDate = DateTime.Now }
                );
            }

            if (!context.SalesByProductType.Any())
            {
                context.SalesByProductType.AddRange(
                    new SalesByProductType { ProductTypeId = 1, Amount = 567.84M, EntryDate = DateTime.Now.AddDays(-7) },
                    new SalesByProductType { ProductTypeId = 1, Amount = 1019.93M, EntryDate = DateTime.Now.AddDays(-6) },
                    new SalesByProductType { ProductTypeId = 1, Amount = 341.45M, EntryDate = DateTime.Now.AddDays(-5) },
                    new SalesByProductType { ProductTypeId = 1, Amount = 319.87M, EntryDate = DateTime.Now.AddDays(-4) },
                    new SalesByProductType { ProductTypeId = 1, Amount = 368.08M, EntryDate = DateTime.Now.AddDays(-3) },
                    new SalesByProductType { ProductTypeId = 1, Amount = 446.47M, EntryDate = DateTime.Now.AddDays(-2) },
                    new SalesByProductType { ProductTypeId = 1, Amount = 294.51M, EntryDate = DateTime.Now.AddDays(-1) },
                    new SalesByProductType { ProductTypeId = 1, Amount = 770.34M, EntryDate = DateTime.Now },
                    new SalesByProductType { ProductTypeId = 2, Amount = 967.88M, EntryDate = DateTime.Now.AddDays(-7) },
                    new SalesByProductType { ProductTypeId = 2, Amount = 7305.48M, EntryDate = DateTime.Now.AddDays(-6) },
                    new SalesByProductType { ProductTypeId = 2, Amount = 1611.11M, EntryDate = DateTime.Now.AddDays(-5) },
                    new SalesByProductType { ProductTypeId = 2, Amount = 1081.53M, EntryDate = DateTime.Now.AddDays(-4) },
                    new SalesByProductType { ProductTypeId = 2, Amount = 2179.96M, EntryDate = DateTime.Now.AddDays(-3) },
                    new SalesByProductType { ProductTypeId = 2, Amount = 2509.77M, EntryDate = DateTime.Now.AddDays(-2) },
                    new SalesByProductType { ProductTypeId = 2, Amount = 1208.34M, EntryDate = DateTime.Now.AddDays(-1) },
                    new SalesByProductType { ProductTypeId = 2, Amount = 5279.53M, EntryDate = DateTime.Now }
                );
            }

            context.SaveChanges();
        }
    }
}