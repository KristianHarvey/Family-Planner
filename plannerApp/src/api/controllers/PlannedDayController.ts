import { PlannedDay, PlannedDayInput } from "../../models/plannedDay";
import { PlannedTask, PlannedTaskInput } from "../../models/plannedTask";
import { PlannedTaskService2 } from "../services/PlannedTaskService2";
import { PlannedDayService } from "../services/plannedDayService";
import { PlannedDayService2 } from "../services/plannedDayService2";
import { PlannedTaskService } from "../services/plannedTaskService";

export class PlannedDayController {
    

    public static isPlannedDayEmpty(plannedDay: PlannedDay) {
        console.log(plannedDay.plannedTasks);
        const isEmpty = (!plannedDay.shoppingLists && !plannedDay.activities && !plannedDay.plannedTasks && !plannedDay.meals);
        return isEmpty;
    }
}