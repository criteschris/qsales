using System;
using System.Collections.Generic;

namespace qsales.Helpers {
    public static class DayOfWeekHelpers {
        public static DayOfWeek ConvertIntToDayOfWeek(int dw) {
            Dictionary<int, DayOfWeek> dayOfWeek = new Dictionary<int, DayOfWeek> {
                { 1, DayOfWeek.Sunday },
                { 2, DayOfWeek.Monday },
                { 3, DayOfWeek.Tuesday },
                { 4, DayOfWeek.Wednesday },
                { 5, DayOfWeek.Thursday },
                { 6, DayOfWeek.Friday },
                { 7, DayOfWeek.Saturday }
            };

            return dayOfWeek.GetValueOrDefault(dw);
        }
    }
}