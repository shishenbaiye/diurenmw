import { MPlugin } from "../../../../../framework/DI/MContainer";
import { GameAbility } from "../../GA/GameAbility";
import { Payload } from "../../GEvent/Payload";
import { AbilityTask } from "../AbilityTask";
import { EAbilityTaskTimeType } from "../AbilityTaskType";

@MPlugin()
export class AT_WaitTime extends AbilityTask {
    /**创建一个等待任务
     * @param ga 技能
     * @param timeType 时间类型
     * @param delayTime 延迟时间(单位秒)
     */
    static New(ga: GameAbility,delayTime: number = 0,timeType: EAbilityTaskTimeType = EAbilityTaskTimeType.Time):AT_WaitTime {
        let payload = Payload.New();
        let instance = super.createTask(ga,payload) as AT_WaitTime;
        instance.timeType = timeType;
        instance.delayTime = delayTime;
        return instance;
    }

    private onEnd: Action = new Action();
    private onCancel: Action = new Action();
    timeType: EAbilityTaskTimeType;
    delayTime: number;
    protected onTaskActivate(ownerGameAbility: GameAbility): void {
        if(this.delayTime == 0){
            this.callEnd();
            return;
        }
        if(this.timeType == EAbilityTaskTimeType.Time){
            this.timeStart();
            return;
        }
        if(this.timeType == EAbilityTaskTimeType.Frame){
            this.frameStart();
            return;
        }
    }

    addEndListener(callback:()=>void){
        this.onEnd.add(callback);
        return this;
    }

    addCancelListener(callback:()=>void){
        this.onCancel.add(callback);
        return this;
    }

    private currentTime:number = 0;
    private timeFunc:(dt:number)=>void; 
    timeStart(){
        this.currentTime = 0;
        this.timeFunc = (dt)=>{
            this.currentTime += dt;
            if(this.currentTime >= this.delayTime){
                TimeUtil.onEnterFrame.remove(this.timeFunc);
                this.timeFunc = null;
                this.callEnd();
            }
        }
        TimeUtil.onEnterFrame.add(this.timeFunc);
    }

    private currentFrame:number = 0;
    private frameFunc:(dt:number)=>void;
    frameStart(){
        this.currentFrame = 0;
        this.frameFunc = (dt)=>{
            this.currentFrame ++;
            if(this.currentFrame >= this.delayTime){
                TimeUtil.onEnterFrame.remove(this.frameFunc);
                this.frameFunc = null;
                this.callEnd();
            }
        }
        TimeUtil.onEnterFrame.add(this.frameFunc);
    }

    callEnd(){
        this.onEnd.call();
        this.endTask();
    }

    protected onTaskEnd(ownerGameAbility: GameAbility): void {
        this.onEnd.clear();
        this.onCancel.clear();
 
        this.onEnd = null;
        this.onCancel = null;  
    }
    protected onTaskPause(ownerGameAbility: GameAbility): void {
        if(this.timeFunc){
            TimeUtil.onEnterFrame.remove(this.timeFunc);
        }
        if(this.frameFunc){
            TimeUtil.onEnterFrame.remove(this.frameFunc);
        }
    }
    protected onTaskResume(ownerGameAbility: GameAbility): void {
        if(this.timeFunc){
            TimeUtil.onEnterFrame.add(this.timeFunc);
        }
        if(this.frameFunc){
            TimeUtil.onEnterFrame.add(this.frameFunc);
        }
    }
    protected onTaskCancel(ownerGameAbility: GameAbility): void {
        if(this.timeFunc){
            TimeUtil.onEnterFrame.remove(this.timeFunc);
        }
        if(this.frameFunc){
            TimeUtil.onEnterFrame.remove(this.frameFunc);
        }
        this.onCancel.call();
        this.endTask();
    }

}