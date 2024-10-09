import { oTrace } from "odin";
import { TutorialManager } from "../TutorialManager";
import { ITutorialBase } from "./TutorialObject";

export class TutorialList {
    public isComplete: boolean = false;
    private tutorialList: ITutorialBase[];
    private curIndex: number;
    private id: number;
    private endFunc: () => void;
    constructor(tutorialId: number) {
        this.tutorialList = [];
        this.curIndex = 0;
        this.isComplete = false;
        this.id = tutorialId;
    }
    /**增加新手引导节点*/
    add(element: ITutorialBase) {
        this.tutorialList.push(element);
    }

    start(func: () => void) {
        oTrace("开始新手引导", this.id);
        this.endFunc = func;
        this.tutorialList[this.curIndex].start(this);
    }

    next() {
        TimeUtil.delayExecute(() => {
            if (this.curIndex < this.tutorialList.length - 1) {
                this.curIndex++;
                console.log("下一步", this.tutorialList[this.curIndex]);
                this.tutorialList[this.curIndex].start(this);
            } else {
                this.isComplete = true;
                this.end();
            }
        }, 5);
    }

    end() {
        oTrace("结束新手引导", this.id);
        if (this.endFunc) {
            this.endFunc();
        }
        TutorialManager.getInstance().completeTutorial(this.id);
    }
}
