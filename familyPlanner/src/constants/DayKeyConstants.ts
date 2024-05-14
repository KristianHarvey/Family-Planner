import { format } from "date-fns";
import { DayKeyUtils } from "../utils/DayKeyUtils";
import { TimeOfDayKeyConstants } from "./constants";

export class DayKeyConstants {
    private static TimeOfDayMap = {
        "Morgen": ["06:00", "08:59"],
        "Formiddag": ["09:00", "11:59"],
        "Ettermiddag": ["12:00", "17:59"],
        "Kveld": ["18:00", "23:59"],
        "Hele dagen": ["06:00", "23:59"]
    }

        // const TimeOfDayKeys = new Map([
        //     ["Morgen", ""],
        //     ["Formiddag", {startHour: 9, endHour: 9}],
        //     ["Ettermiddag", {startHour: 6, endHour: 9}]
        // ])
        

    public static getMorningRange(currentDate: Date) {
        const startDate = DayKeyUtils.getLocalDateObject(currentDate);
        startDate.setHours(6, 0, 0, 0);
        const endDate = DayKeyUtils.getLocalDateObject(currentDate);
        endDate.setHours(8, 59, 59, 999);
        return { startDate, endDate };
    }

    public static getAfternoonRange(currentDate: Date) {
        const startDate = new Date(currentDate);
        startDate.setHours(9, 0, 0, 0);
        const endDate = new Date(currentDate);
        endDate.setHours(11, 59, 59, 999);
        return { startDate, endDate };
    }

    public static getEveningRange(currentDate: Date) {
        const startDate = new Date(currentDate);
        startDate.setHours(12, 0, 0, 0);
        const endDate = new Date(currentDate);
        endDate.setHours(17, 59, 59, 999);
        return { startDate, endDate };
    }
    public static getNightRange(currentDate: Date) {
        const startDate = new Date(currentDate);
        startDate.setHours(18, 0, 0, 0);
        const endDate = new Date(currentDate);
        endDate.setHours(23, 59, 59, 999);
        return { startDate, endDate };
    }

    public static getFullDayRange(currentDate: Date) {
        const startDate = new Date(currentDate);
        startDate.setHours(6, 0, 0, 0);
        const endDate = new Date(currentDate);
        endDate.setHours(23, 59, 59, 999);

        return { startDate, endDate };
        // console.log("Full day range: ", startDate.toISOString(), endDate.toISOString());
        // return { startDate, endDate };
    }

    public static getTimeOfDayKey(startDate: Date, endDate: Date) {
        const startHour = format(startDate, "HH:mm");
        const endHour = format(endDate, "HH:mm");
        for(const [timeOfDayKey, hours] of Object.entries(this.TimeOfDayMap)) {
            if(startHour === hours[0] && endHour === hours[1]) {
                return timeOfDayKey;
            }
        }
        return null;
    }

    public static setDateForKey(choice: string, currentDate: Date) {
        switch(choice)
        {
            case "Morgen": {
                return this.getMorningRange(currentDate);
            }
            case "Formiddag": {
                return this.getAfternoonRange(currentDate);
            }
            case "Ettermiddag": {
                return this.getEveningRange(currentDate);
            }
            case "Kveld": {
                return this.getNightRange(currentDate);
            }
            default: {
                return {
                    startDate: currentDate,
                    endDate: currentDate,
                };
            }
        };
    }
}