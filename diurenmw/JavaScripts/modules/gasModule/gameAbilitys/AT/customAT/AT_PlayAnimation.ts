import { MPlugin, MPropertiesInject, RpcPlugin } from "../../../../../framework/DI/MContainer";
import { GasModuleS } from "../../../GasModuleS";
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
        this.uuid++;
        instance.owner = owner;
        instance.uuid = this.uuid;
        instance.currentAnim = anim;
        instance.ainmationTime = TotalTime;
        instance.initAnimantion();
        return instance;
    }
    private static uuid:number = 0;
    private uuid:number = null;
    private owner:Character;
    private currentAnim: Animation;
    private currentAnimSpeed:number = 1;
    initAnimantion(){
        this.currentAnimSpeed = this.currentAnim.speed;
        this.totalTime = this.ainmationTime/this.currentAnim.speed;
        if(SystemUtil.isServer()){
            ModuleService.getModule(GasModuleS).createAT_Animation(this.owner,this.uuid,this.currentAnim);
        }
    }   

    getOwner(){
        return this.owner;
    }

    private eventList: {time:number,event:()=>void,isCalled:boolean}[] = [];
    addEvent(time:number,eventFunc:()=>void){
        this.eventList.push({time:time,event:eventFunc,isCalled:false});
        return this;
    }

    setSpeed(speed:number){
        this.currentAnimSpeed = speed;
        this.totalTime = this.ainmationTime/speed;
        // this.currentAnim.speed = speed;
        ModuleService.getModule(GasModuleS).callClientAnimationSpeed(this.uuid,speed);
    }

    private endEvent:()=>void;
    onFinished(callback:()=>void){
        this.endEvent = callback;
    }

    private animationFunc:(dt:number)=>void;
    private currentTime:number = 0;
    private totalTime:number = 0;
    private ainmationTime:number = 0;
    protected onTaskActivate(ownerGameAbility: GameAbility): void {
        // this.currentAnim.play();
        if(SystemUtil.isServer()){
            ModuleService.getModule(GasModuleS).callClientAnimationPlay(this.uuid);
        }
        this.animationFunc = (dt)=>{
            if(this.currentTime >= this.totalTime){
                TimeUtil.onEnterFrame.remove(this.animationFunc);
                this.endTask();
                return;
            }
            this.eventList.forEach((event)=>{
                if(this.currentTime >= event.time/this.currentAnimSpeed && !event.isCalled){
                    event.event();
                    event.isCalled = true;
                }
            })
            this.currentTime += dt;
        };
        TimeUtil.onEnterFrame.add(this.animationFunc);
    }
    protected onTaskEnd(ownerGameAbility: GameAbility): void {
        if(this.endEvent){
            this.endEvent();
        }
        // this.currentAnim.stop();
        if(SystemUtil.isServer()){
            ModuleService.getModule(GasModuleS).callClientAnimationStop(this.uuid);
            ModuleService.getModule(GasModuleS).callClientAnimationRemove(this.uuid);
        }
        this.eventList = [];
        this.currentAnim = null;
        this.animationFunc = null;
    }
    protected onTaskPause(ownerGameAbility: GameAbility): void {
        // console.log("pause");
        // this.currentAnim.pause();
        if(SystemUtil.isServer()){
            ModuleService.getModule(GasModuleS).callClientAnimationPause(this.uuid);
        }
        TimeUtil.onEnterFrame.remove(this.animationFunc);
    }
    protected onTaskResume(ownerGameAbility: GameAbility): void {
        // console.log("resume");
        // this.currentAnim.resume();
        if(SystemUtil.isServer()){
            ModuleService.getModule(GasModuleS).callClientAnimationResume(this.uuid);
        }
        TimeUtil.onEnterFrame.add(this.animationFunc);
    }
    protected onTaskCancel(ownerGameAbility: GameAbility): void {
        TimeUtil.onEnterFrame.remove(this.animationFunc);
        this.endTask();
    }

}