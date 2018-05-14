using Microsoft.EntityFrameworkCore;

namespace qsales.Models
{
    public class QSalesDbContext : DbContext
    {
        public QSalesDbContext(DbContextOptions options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Bar>().HasKey(x => x.Id);
            builder.Entity<Bar>().Property(x => x.Id).HasDefaultValueSql("newid()");
            builder.Entity<Employee>().HasOne(x => x.Bar).WithMany(x => x.Employees).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Event>().HasOne(x => x.Bar).WithMany(x => x.Events).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Location>().HasOne(x => x.Bar).WithMany(x => x.Locations).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Organization>().HasOne(x => x.Bar).WithMany(x => x.Organizations).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Performer>().HasOne(x => x.Bar).WithMany(x => x.Performers).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ProductType>().HasOne(x => x.Bar).WithMany(x => x.ProductTypes).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Sales>().HasOne(x => x.Bar).WithMany(x => x.Sales).OnDelete(DeleteBehavior.Restrict);
        }

        public DbSet<Bar> Bar { get; set; }
        public DbSet<Condition> Condition { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Event> Event { get; set; }
        public DbSet<Location> Location { get; set; }
        public DbSet<OperationHour> OperationHour { get; set; }
        public DbSet<Organization> Organization { get; set; }
        public DbSet<Payroll> Payroll { get; set; }
        public DbSet<Performer> Performer { get; set; }
        public DbSet<ProductType> ProductType { get; set; }
        public DbSet<Sales> Sales { get; set; }
        public DbSet<SalesByHour> SalesByHour { get; set; }
        public DbSet<SalesByLocation> SalesByLocation { get; set; }
        public DbSet<SalesByProductType> SalesByProductType { get; set; }
    }
}