import { MPlugin } from "../../../../../framework/DI/MContainer";
import { GameAbility } from "../../GA/GameAbility";
import { Payload } from "../../GEvent/Payload";
import { AbilityTask } from "../AbilityTask";

@MPlugin()
export class AT_PlayAnimation extends AbilityTask{
    /**创建一个动画任务
     * @param ga 技能
     * @param anim 动画实例
     * @param TotalTime 动画总时间（单位秒）
     * @param owner 释放者
    */
    static New(ga: GameAbility,anim:Animation,TotalTime:number,owner?:Character):AT_PlayAnimation {
        if(! anim) return;
        if(! owner) owner = ga.owner as Character;
        let payload = Payload.New();
        let instance = super.createTask(ga,payload) as AT_PlayAnimation;
        instance.owner = owner;
        instance.currentAnim = anim;
        instance.ainmationTime = TotalTime;
        instance.initAnimantion();
        return instance;
    }

    private owner:Character;
    private currentAnim: Animation;
    initAnimantion(){
        this.totalTime = this.ainmationTime/this.currentAnim.speed;
    }   

    getOwner(){
        return this.owner;
    }

    private eventList: {time:number,event:()=>void,isCalled:boolean}[] = [];
    addEvent(time:number,eventFunc:()=>void){
        this.eventList.push({time:time,event:eventFunc,isCalled:false});
        return this;
    }

    private animationFunc:(dt:number)=>void;
    private currentTime:number = 0;
    private totalTime:number = 0;
    private ainmationTime:number = 0;
    protected onTaskActivate(ownerGameAbility: GameAbility): void {
        this.currentAnim.play();
        this.animationFunc = (dt)=>{
            if(this.currentTime >= this.totalTime){
                TimeUtil.onEnterFrame.remove(this.animationFunc);
                this.endTask();
                return;
            }
            this.eventList.forEach((event)=>{
                if(this.currentTime >= event.time && !event.isCalled){
                    event.event();
                    event.isCalled = true;
                }
            })
            this.currentTime += dt;
        };
        TimeUtil.onEnterFrame.add(this.animationFunc);
    }
    protected onTaskEnd(ownerGameAbility: GameAbility): void {
        this.currentAnim.stop();
        this.eventList = [];
        this.currentAnim = null;
        this.animationFunc = null;
    }
    protected onTaskPause(ownerGameAbility: GameAbility): void {
        // console.log("pause");
        this.currentAnim.pause();
        TimeUtil.onEnterFrame.remove(this.animationFunc);
    }
    protected onTaskResume(ownerGameAbility: GameAbility): void {
        // console.log("resume");
        this.currentAnim.resume();
        TimeUtil.onEnterFrame.add(this.animationFunc);
    }
    protected onTaskCancel(ownerGameAbility: GameAbility): void {
        TimeUtil.onEnterFrame.remove(this.animationFunc);
        this.endTask();
    }

}