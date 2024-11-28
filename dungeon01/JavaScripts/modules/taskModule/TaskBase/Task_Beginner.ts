import { Task } from "./Task";
import { TaskClass } from "./TaskEnum";

export class Task_Beginner extends Task {
    public isInPetShop: boolean = false;
    init(): void {
        this.taskClass = TaskClass.Guide;
        super.init();
    }

    initDoing(): void {
        super.initDoing();
        this.initGuide();
    }

    private initGuide() {

    }
    completeTask(): void {
        super.completeTask();

    }
}
