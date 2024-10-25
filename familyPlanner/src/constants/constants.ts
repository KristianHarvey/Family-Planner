import { Family } from "../models/family";
import { User } from "../models/user";
import { DayKeyConstants } from "./DayKeyConstants";

export const SERVEOURL = process.env.SERVEO_URL;

export enum ModelKey {
    INVALID = "INVALID",
    FAMILY = "FAMILY",
    USER = "USER",
}

export const getModelKey = (key: string) => {
    switch(key) {
        case "FAMILY":
            return ModelKey.FAMILY;
        case "USER":
            return ModelKey.USER
        default:
            return ModelKey.INVALID
    }
}

export type getModel = (key: ModelKey) => any;

export const getModelByKey: getModel = (key: ModelKey) => {
    switch(key) {
        case ModelKey.FAMILY:
            return {} as Family;
        case ModelKey.USER:
            return {} as User;
        default:
            return {}
    }
}

export namespace TimeOfDayKeyConstants {

    export enum TimeOfDayKey {
        INVALID = "INVALID",
        MORGEN = "MORGEN",
        FORMIDDAG = "FORMIDDAG",
        ETTERMIDDAG = "ETTERMIDDAG",
        KVELD = "KVELD"
    }

    export const getTimeOfDayKey = (key: string): TimeOfDayKey => {
        switch(key) {
            case "MORGEN":
                return TimeOfDayKey.MORGEN;
            case 'FORMIDDAG':
                return TimeOfDayKey.FORMIDDAG;
            case "ETTERMIDDAG":
                return TimeOfDayKey.ETTERMIDDAG;
            case "KVELD":
                return TimeOfDayKey.KVELD;
            default:
                return TimeOfDayKey.INVALID;
        }
    }

    export const getTimeOfDayByKey = (key: TimeOfDayKey, currentDate: Date) => {
        switch(key) {
            case TimeOfDayKey.MORGEN:
                return DayKeyConstants.getMorningRange(currentDate);
            case TimeOfDayKey.FORMIDDAG:
                return DayKeyConstants.getAfternoonRange(currentDate);
            case TimeOfDayKey.ETTERMIDDAG:
                return DayKeyConstants.getEveningRange(currentDate);
            case TimeOfDayKey.KVELD:
                return DayKeyConstants.getNightRange(currentDate);
            default:
                return TimeOfDayKey.INVALID;
        }
    }

}

export enum SettingNavigationKey {
    EDITPROFILE = "EDIT-PROFILE",
    
}
