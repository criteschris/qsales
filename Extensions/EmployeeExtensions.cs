using System;
using System.Linq;
using qsales.Models;

namespace qsales.Extensions {
    public static class EmployeeExtensions {
        public static IQueryable<Employee> GetEmployeesForBar(this IQueryable<Employee> source, Guid b) {
            return source.Where(x => x.BarId == b);
        }
    }
}