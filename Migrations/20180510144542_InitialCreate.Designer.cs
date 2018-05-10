﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using qsales.Models;
using System;

namespace qsales.Migrations
{
    [DbContext(typeof(QSalesDbContext))]
    [Migration("20180510144542_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.3-rtm-10026")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("qsales.Models.Condition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Condition");
                });

            modelBuilder.Entity("qsales.Models.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Employee");
                });

            modelBuilder.Entity("qsales.Models.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Location");
                });

            modelBuilder.Entity("qsales.Models.OperationHour", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("OperationHour");
                });

            modelBuilder.Entity("qsales.Models.Payroll", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Amount");

                    b.Property<int>("EmployeeId");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Payroll");
                });

            modelBuilder.Entity("qsales.Models.ProductType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("ProductType");
                });

            modelBuilder.Entity("qsales.Models.Sales", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("CreditCardAmount");

                    b.Property<DateTime>("EntryDate");

                    b.Property<int>("FiftyDollarBills");

                    b.Property<int>("FiveDollarBills");

                    b.Property<int>("HundredDollarBills");

                    b.Property<int>("OneDollarBills");

                    b.Property<int>("TenDollarBills");

                    b.Property<int>("TwentyDollarBills");

                    b.HasKey("Id");

                    b.ToTable("Sales");
                });

            modelBuilder.Entity("qsales.Models.SalesByHour", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Amount");

                    b.Property<int>("ConditionId");

                    b.Property<int>("Customers");

                    b.Property<DateTime>("EntryDate");

                    b.Property<int>("OperationHourId");

                    b.HasKey("Id");

                    b.HasIndex("ConditionId");

                    b.HasIndex("OperationHourId");

                    b.ToTable("SalesByHour");
                });

            modelBuilder.Entity("qsales.Models.SalesByLocation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Amount");

                    b.Property<DateTime>("EntryDate");

                    b.Property<int>("LocationId");

                    b.HasKey("Id");

                    b.HasIndex("LocationId");

                    b.ToTable("SalesByLocation");
                });

            modelBuilder.Entity("qsales.Models.SalesByProductType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Amount");

                    b.Property<DateTime>("EntryDate");

                    b.Property<int>("ProductTypeId");

                    b.HasKey("Id");

                    b.HasIndex("ProductTypeId");

                    b.ToTable("SalesByProductType");
                });

            modelBuilder.Entity("qsales.Models.Payroll", b =>
                {
                    b.HasOne("qsales.Models.Employee", "Employee")
                        .WithMany("Payrolls")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("qsales.Models.SalesByHour", b =>
                {
                    b.HasOne("qsales.Models.Condition", "Condition")
                        .WithMany("SalesByHours")
                        .HasForeignKey("ConditionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("qsales.Models.OperationHour", "OperationHour")
                        .WithMany("SalesByHours")
                        .HasForeignKey("OperationHourId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("qsales.Models.SalesByLocation", b =>
                {
                    b.HasOne("qsales.Models.Location", "Location")
                        .WithMany("SalesByLocations")
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("qsales.Models.SalesByProductType", b =>
                {
                    b.HasOne("qsales.Models.ProductType", "ProductType")
                        .WithMany("SalesByProductTypes")
                        .HasForeignKey("ProductTypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}