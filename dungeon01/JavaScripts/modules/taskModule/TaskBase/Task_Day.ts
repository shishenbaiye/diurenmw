import { Task } from "./Task";
import { TaskClass } from "./TaskEnum";

export class Task_Day extends Task {


    init(): void {
        this.taskClass = TaskClass.Daily;
        super.init();
    }

    completeTask(): void {
        super.completeTask();
    }


    onUpdate(dt: number) {

    }
}