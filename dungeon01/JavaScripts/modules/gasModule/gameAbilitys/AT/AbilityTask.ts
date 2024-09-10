import { MPlugin } from "../../../../framework/DI/MContainer";
import { MFramework } from "../../../../framework/MFramework";
import { MObject } from "../../../../framework/Object/MObject";
import { AbilitySystemComponent } from "../ASC/AbilitySystemComponent";
import { GameAbility } from "../GA/GameAbility";
import { Payload } from "../GEvent/Payload";

@MPlugin()
export abstract class AbilityTask extends MObject {
    static createTask(ga: GameAbility, payload?: Payload) {
        let instance = MFramework.createObject(this) as AbilityTask;
        instance.ownerGameAbility = ga;
        instance.ownerAsc = ga.ownerAsc;
        if (payload) {
            payload.ability = ga;
            payload.eventMagnitude = ga.owner.worldTransform.position.clone();
            payload.source = ga.owner;
            payload.target = ga.target;
            payload.eventTag = ga.tag;
            instance.payload = payload;
        }
        ga.addAbilityTask(instance);
        return instance;
    }

    public ownerGameAbility: GameAbility;
    public ownerAsc: AbilitySystemComponent;
    public payload: Payload;
    public isActivate: boolean = false;
    public isPause: boolean = false;

    // 激活
    activate(): boolean {
        if (this.isPause) {
            return false;
        }

        this.isActivate = true;
        this.onTaskActivate(this.ownerGameAbility);
        return true;
    }
    // 调用结束
    endTask() {
        if (this.isActivate == false) return;
        this.isActivate = false;
        this.onTaskEnd(this.ownerGameAbility);
        this.ownerGameAbility.removeAbilityTask(this);
    }

    // 暂停任务
    pauseTask() {
        if (this.isActivate == false) return;
        if (this.isPause) return;
        this.isPause = true;
        this.onTaskPause(this.ownerGameAbility);
    }
    // 恢复任务
    resumeTask() {
        console.log('resumeTask base',this.isActivate,this.isPause);
        if (this.isActivate == false) return;
        if (this.isPause == false) return;
        this.isPause = false;
        this.onTaskResume(this.ownerGameAbility);
    }
    // 中断任务
    cancelTask() {
        if (this.isActivate == false) return;
        this.onTaskCancel(this.ownerGameAbility);
    }

    // 开始回调
    protected abstract onTaskActivate(ownerGameAbility: GameAbility): void;
    // 结束回调
    protected abstract onTaskEnd(ownerGameAbility: GameAbility): void;
    // 暂停回调
    protected abstract onTaskPause(ownerGameAbility: GameAbility): void;
    // 恢复回调
    protected abstract onTaskResume(ownerGameAbility: GameAbility): void;
    // 中断回调
    protected abstract onTaskCancel(ownerGameAbility: GameAbility): void;
}