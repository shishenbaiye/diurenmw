import { Task } from "./Task";
import { TaskClass } from "./TaskEnum";

export class Task_Custom extends Task {
    init(): void {
        this.taskClass = TaskClass.Guide;
        super.init();
    }

    initDoing(): void {
        this.initGuide();
    }

    private initGuide() { }
    completeTask(): void {
        super.completeTask();
    }
}
