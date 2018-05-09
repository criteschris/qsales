using Microsoft.EntityFrameworkCore;

namespace qsales.Models
{
    public class QSalesDbContext : DbContext
    {
        public QSalesDbContext(DbContextOptions options) : base(options)
        { }

        public DbSet<Employee> Employee { get; set; }
        public DbSet<Location> Location { get; set; }
        public DbSet<Payroll> Payroll { get; set; }
        public DbSet<ProductType> ProductType { get; set; }
        public DbSet<Sales> Sales { get; set; }
        public DbSet<SalesByHour> SalesByHour { get; set; }
        public DbSet<SalesByLocation> SalesByLocation { get; set; }
        public DbSet<SalesByProductType> SalesByProductType { get; set; }
        public DbSet<Weather> Weather { get; set; }
    }
}