import { format } from "date-fns";

export class DayKeyUtils {

    public static getCurrentDay() {
        return new Date();
    }

    public static getDayKey(date: Date) {
        const daykey = format(date, "yyyy-MM-dd");
        return daykey;
    }
}