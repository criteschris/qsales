using System;
using System.Linq;
using qsales.Models;

namespace qsales.Extensions
{
    public static class QSalesDbContextExtensions
    {
        public static void EnsureSeedData(this QSalesDbContext context)
        {
            var b1 = new Bar { Name = "Quixote's" };
            var b2 = new Bar { Name = "1716" };

            if (!context.Bar.Any())
            {
                context.Bar.AddRange(b1, b2);
            }

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
                    new Employee { Bar = b1, Name = "John Doe" },
                    new Employee { Bar = b1, Name = "Jane Doe" },
                    new Employee { Bar = b1, Name = "Joe Doe" },
                    new Employee { Bar = b2, Name = "King Aurthur" }
                );
            }

            if (!context.Event.Any())
            {
                context.Event.AddRange(
                  new Event { Bar = b1, Name = "A-Day" },
                  new Event { Bar = b1, Name = "Auburn Alabama game" },
                  new Event { Bar = b1, Name = "Spring Fling" },
                  new Event { Bar = b2, Name = "Boston Tea Party" }
                );
            }

            if (!context.Location.Any())
            {
                context.Location.AddRange(
                    new Location { Bar = b1, Name = "Mezzanine" },
                    new Location { Bar = b1, Name = "Back Bar" },
                    new Location { Bar = b1, Name = "Lounge" },
                    new Location { Bar = b2, Name = "Round Table" }
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

            if (!context.Organization.Any())
            {
                context.Organization.AddRange(
                    new Organization { Bar = b1, Name = "Beta Gamma Pi" },
                    new Organization { Bar = b1, Name = "League of Distinguished Gentleman" },
                    new Organization { Bar = b2, Name = "Red Coats of Britainia" }
                );
            }

            if (!context.Payroll.Any())
            {
                /* context.Payroll.AddRange(
                    new Payroll {}
                ); */
            }

            if (!context.Performer.Any())
            {
                context.Performer.AddRange(
                    new Performer { Bar = b1, Name = "Backstreet Boys" },
                    new Performer { Bar = b1, Name = "Trump Dumpers" },
                    new Performer { Bar = b2, Name = "Emmet's Jug Band" }
                );
            }

            if (!context.ProductType.Any())
            {
                context.ProductType.AddRange(
                    new ProductType { Bar = b1, Name = "Food" },
                    new ProductType { Bar = b1, Name = "Liquor" },
                    new ProductType { Bar = b2, Name = "Mead" }
                );
            }

            var s1 = new Sales { Bar = b1, EntryDate = DateTime.Now.AddDays(-7), Hundreds = 2, Fifties = 1, Twenties = 54, Tens = 23, Fives = 0, Ones = 12, CreditCardAmount = 2376.67M };
            var s2 = new Sales { Bar = b1, EntryDate = DateTime.Now.AddDays(-6), Hundreds = 0, Fifties = 0, Twenties = 87, Tens = 54, Fives = 10, Ones = 29, CreditCardAmount = 1289.13M };
            var s3 = new Sales { Bar = b1, EntryDate = DateTime.Now.AddDays(-5), Hundreds = 0, Fifties = 2, Twenties = 65, Tens = 28, Fives = 8, Ones = 14, CreditCardAmount = 1998.93M };
            var s4 = new Sales { Bar = b1, EntryDate = DateTime.Now.AddDays(-4), Hundreds = 1, Fifties = 0, Twenties = 38, Tens = 65, Fives = 29, Ones = 7, CreditCardAmount = 2938.52M };
            var s5 = new Sales { Bar = b1, EntryDate = DateTime.Now.AddDays(-3), Hundreds = 5, Fifties = 7, Twenties = 27, Tens = 12, Fives = 13, Ones = 9, CreditCardAmount = 3932.38M };
            var s6 = new Sales { Bar = b1, EntryDate = DateTime.Now.AddDays(-2), Hundreds = 3, Fifties = 3, Twenties = 48, Tens = 53, Fives = 11, Ones = 22, CreditCardAmount = 4002.59M };
            var s7 = new Sales { Bar = b1, EntryDate = DateTime.Now.AddDays(-1), Hundreds = 0, Fifties = 1, Twenties = 70, Tens = 33, Fives = 5, Ones = 33, CreditCardAmount = 2439.19M };
            var s8 = new Sales { Bar = b1, EntryDate = DateTime.Now, Hundreds = 3, Fifties = 0, Twenties = 44, Tens = 23, Fives = 14, Ones = 22, CreditCardAmount = 3912.87M };
            var s9 = new Sales { Bar = b2, EntryDate = DateTime.Now.AddDays(-7), Hundreds = 200, Fifties = 100, Twenties = 2000, Tens = 190, Fives = 115, Ones = 116, CreditCardAmount = 9000.67M };
            var s10 = new Sales { Bar = b2, EntryDate = DateTime.Now.AddDays(-6), Hundreds = 300, Fifties = 150, Twenties = 1000, Tens = 170, Fives = 165, Ones = 99, CreditCardAmount = 8000.13M };


            if (!context.Sales.Any())
            {
                context.Sales.AddRange(s1, s2, s3, s4, s5, s6, s7, s8, s9, s10);
            }

            if (!context.SalesByHour.Any())
            {

            }

            if (!context.SalesByLocation.Any())
            {
                context.SalesByLocation.AddRange(
                    new SalesByLocation { LocationId = 1, Amount = 1000M, Sales = s1 },
                    new SalesByLocation { LocationId = 1, Amount = 1800M, Sales = s2 },
                    new SalesByLocation { LocationId = 1, Amount = 800M, Sales = s3 },
                    new SalesByLocation { LocationId = 1, Amount = 1150M, Sales = s4 },
                    new SalesByLocation { LocationId = 1, Amount = 1900M, Sales = s5 },
                    new SalesByLocation { LocationId = 1, Amount = 3400M, Sales = s6 },
                    new SalesByLocation { LocationId = 1, Amount = 2723M, Sales = s7 },
                    new SalesByLocation { LocationId = 1, Amount = 899M, Sales = s8 },
                    new SalesByLocation { LocationId = 2, Amount = 100M, Sales = s1 },
                    new SalesByLocation { LocationId = 2, Amount = 800M, Sales = s2 },
                    new SalesByLocation { LocationId = 2, Amount = 300M, Sales = s3 },
                    new SalesByLocation { LocationId = 2, Amount = 150M, Sales = s4 },
                    new SalesByLocation { LocationId = 2, Amount = 560M, Sales = s5 },
                    new SalesByLocation { LocationId = 2, Amount = 300M, Sales = s6 },
                    new SalesByLocation { LocationId = 2, Amount = 223M, Sales = s7 },
                    new SalesByLocation { LocationId = 2, Amount = 99M, Sales = s8 },
                    new SalesByLocation { LocationId = 3, Amount = 300M, Sales = s1 },
                    new SalesByLocation { LocationId = 3, Amount = 700M, Sales = s2 },
                    new SalesByLocation { LocationId = 3, Amount = 90M, Sales = s3 },
                    new SalesByLocation { LocationId = 3, Amount = 150M, Sales = s4 },
                    new SalesByLocation { LocationId = 3, Amount = 450M, Sales = s5 },
                    new SalesByLocation { LocationId = 3, Amount = 270M, Sales = s6 },
                    new SalesByLocation { LocationId = 3, Amount = 203M, Sales = s7 },
                    new SalesByLocation { LocationId = 3, Amount = 69M, Sales = s8 }
                );
            }

            if (!context.SalesByProductType.Any())
            {
                context.SalesByProductType.AddRange(
                    new SalesByProductType { ProductTypeId = 1, Amount = 567.84M, Sales = s1 },
                    new SalesByProductType { ProductTypeId = 1, Amount = 1019.93M, Sales = s2 },
                    new SalesByProductType { ProductTypeId = 1, Amount = 341.45M, Sales = s3 },
                    new SalesByProductType { ProductTypeId = 1, Amount = 319.87M, Sales = s4 },
                    new SalesByProductType { ProductTypeId = 1, Amount = 368.08M, Sales = s5 },
                    new SalesByProductType { ProductTypeId = 1, Amount = 446.47M, Sales = s6 },
                    new SalesByProductType { ProductTypeId = 1, Amount = 294.51M, Sales = s7 },
                    new SalesByProductType { ProductTypeId = 1, Amount = 770.34M, Sales = s8 },
                    new SalesByProductType { ProductTypeId = 2, Amount = 967.88M, Sales = s1 },
                    new SalesByProductType { ProductTypeId = 2, Amount = 7305.48M, Sales = s2 },
                    new SalesByProductType { ProductTypeId = 2, Amount = 1611.11M, Sales = s3 },
                    new SalesByProductType { ProductTypeId = 2, Amount = 1081.53M, Sales = s4 },
                    new SalesByProductType { ProductTypeId = 2, Amount = 2179.96M, Sales = s5 },
                    new SalesByProductType { ProductTypeId = 2, Amount = 2509.77M, Sales = s6 },
                    new SalesByProductType { ProductTypeId = 2, Amount = 1208.34M, Sales = s7 },
                    new SalesByProductType { ProductTypeId = 2, Amount = 5279.53M, Sales = s8 }
                );
            }

            context.SaveChanges();
        }
    }
}