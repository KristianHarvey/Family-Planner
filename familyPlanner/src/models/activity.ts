import { Family } from "./family";
import { PlannedDay } from "./plannedDay";
import { User } from "./user";

export interface Activity {
	id: number;
	name: string;
	description?: string;
	startDate: Date;
	endDate: Date;
	userUid?: string;
	users?: User[];
	familyId?: number;
	family?: Family;
	plannedDayId?: number;
	plannedDay?: PlannedDay;
	completed?: boolean;
}

export interface ActivityInput {
	startDate: Date;
	endDate: Date;
	name: string;
	description?: string;
	userUid?: string;
	users?: User[];
	planId?: number;
}

export interface ActivityUpdate {
	startDate: Date;
	endDate: Date;
	name: string;
	description?: string;
	userUid?: string;
	users?: User[];
	planId?: number;
}
