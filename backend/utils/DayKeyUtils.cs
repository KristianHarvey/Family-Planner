
using System.Globalization;

namespace FamilyPlanner.Utils {
    public static class DayKeyUtils {
        
        public static DateTime GetCurrentDay() {
            return DateTime.UtcNow.Date;
        }

        public static DateTime GetDayKey(string day) {
            return DateTime.ParseExact(day, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        }

    }
}