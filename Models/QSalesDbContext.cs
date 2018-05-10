using Microsoft.EntityFrameworkCore;

namespace qsales.Models
{
    public class QSalesDbContext : DbContext
    {
        public QSalesDbContext(DbContextOptions options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);

            builder.Entity<SalesByHour>().HasOne(x => x.OperationHour).WithMany(x => x.SalesByHours).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<SalesByHour>().HasOne(x => x.Condition).WithMany(x => x.SalesByHours).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<SalesByLocation>().HasOne(x => x.Location).WithMany(x => x.SalesByLocations).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<SalesByProductType>().HasOne(x => x.ProductType).WithMany(x => x.SalesByProductTypes).OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<Condition> Condition { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<OperationHour> OperationHour { get; set; }
        public DbSet<Location> Location { get; set; }
        public DbSet<Payroll> Payroll { get; set; }
        public DbSet<ProductType> ProductType { get; set; }
        public DbSet<Sales> Sales { get; set; }
        public DbSet<SalesByHour> SalesByHour { get; set; }
        public DbSet<SalesByLocation> SalesByLocation { get; set; }
        public DbSet<SalesByProductType> SalesByProductType { get; set; }
    }
}