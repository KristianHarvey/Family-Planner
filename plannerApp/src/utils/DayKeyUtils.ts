import { format } from "date-fns";

export class DayKeyUtils {

    public static getCurrentDay() {
        return new Date();
    }

    public static getDayKey(date: Date) {
        const daykey = format(date, "yyyy-MM-dd");
        return daykey;
    }

    public static getSelectedDayFormattedToShow(selectedDate: string) {
        const date = format(new Date(selectedDate), "dd.MM.yyyy");
        return date;
    }

    public static formatSelectedDateForView(selectedDate: Date) {
        const date = format(selectedDate, "dd.MM.yyyy HH:mm");
        return date;
    }
    public static getDayMonthAndYear(selectedDate: Date) {
        const date = format(selectedDate, "dd.MM.yyyy");
        return date;
    }
    public static getHoursAndMinutes(selectedDate: Date) {
        const date = format(selectedDate, "HH:mm");
        return date;
    }
    public static getLocalDateObject(date: Date) {
        const localDateString = date.toString();
        const localOffset = date.getTimezoneOffset() * 60000;
        // const localDate = new Date(date.getTime() - localOffset);

        var dateStr = date.toLocaleString("en-US", {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          })
        console.log(dateStr);
        var localDate = new Date();
        console.log(new Date(localDate.toString()));

        return localDate;
    }
}