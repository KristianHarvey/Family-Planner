
using System.Globalization;

namespace FamilyPlanner.Utils {
    public static class DayKeyUtils {
        
        public static DateTime GetCurrentDay() {
            return DateTime.UtcNow.Date;
        }
        // public static string GetDayKey(string day) {
        //     DateTime date = DateTime.ParseExact(day, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        //     if()
        // }
        // public static string GetDayKey(string day) {
        //     DateTime date = DateTime.ParseExact(day, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        //     Console.WriteLine(date);
        //     string formattedDate = date.ToString("dd-MM-yyyy");
        //     return formattedDate;
        // }
        public static string GetDayKey(DateTime day) {
            return day.ToString("yyyy-MM-dd");
        }

        public static string formatPretty(DateTime day) {
            return day.ToString("DD.MMM");
        }

    }
}