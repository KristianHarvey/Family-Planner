import { format } from "date-fns";
import nbLocale from "date-fns/locale/nb"
import { Locale } from "date-fns";

// Define a custom locale object
const customNbLocale: Locale = {
    ...nbLocale,
    // Add any missing properties required by the format function
    code: 'nb',
    formatDistance: () => '',
    formatRelative: () => '',
    localize: {
        ordinalNumber: () => '',
        era: () => '',
        quarter: () => '',
        month: (monthIndex: number) => ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'][monthIndex],
        day: () => '',
        dayPeriod: () => '',
    },
};

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
    // public static formatPretty(selectedDate: Date | string) {

    //     let parsedDate: Date;

    //     if (typeof selectedDate === 'string') {
    //         const [day, month, year] = selectedDate.split('-').map(Number);
    //         // Month in JavaScript Date object is 0-based, so subtract 1 from month
    //         parsedDate = new Date(year, month - 1, day);
    //     } else {
    //         parsedDate = new Date(selectedDate);
    //     }

    //     const dayString = format(parsedDate, "dd.MMMM", { locale: customNbLocale });
    //     return dayString;
    // }

    public static formatPretty(selectedDate: Date) {
        return format(selectedDate, "dd.MMMM", { locale: customNbLocale});
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