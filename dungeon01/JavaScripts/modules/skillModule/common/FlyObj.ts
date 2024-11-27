import { MathTool } from "../../../tools/MathTool";

export class FlyObj{
    static New(guid:string,start:Vector,direct:Vector,speed:number = 100,time:number = 1,owner:Character = undefined,checkDis:number = 100):FlyObj{
        let instance = new FlyObj();
        instance.guid = guid;
        instance.start = start.clone();
        instance.speed = speed;
        instance.direct = direct.normalized;
        instance.time = time;
        instance.owner = owner;
        instance.checkDis = checkDis;
        return instance;
    }

    guid:string;
    start:Vector;   
    speed:number;
    direct:Vector;
    time:number;
    owner:Character;
    checkDis:number;
    private endEvent:()=>void;
    addEndListener(callback:()=>void){
        this.endEvent = callback;
    }


    private checkEvent:(obj:Character[])=>void;
    addCheckListener(callback:(obj:Character[])=>void){
        this.checkEvent = callback;
    }

    private obj:GameObject;
    private iid:number;
    activate(){
        GameObject.asyncSpawn(this.guid).then((obj)=>{
            this.obj = obj;
            this.obj.worldTransform.position = this.start;
            TimeUtil.onEnterFrame.add(this.check,this);
            this.obj.moveBy(this.direct.multiply(this.speed));
            this.iid = setTimeout(() => {
                TimeUtil.onEnterFrame.remove(this.check,this);
                this.obj.stopMove();
                this.obj.destroy();
                this.obj = null;
                if(this.endEvent) this.endEvent();
            }, this.time*1000);
        })
    }

    cancel(){
        TimeUtil.onEnterFrame.remove(this.check,this);
        this.obj.stopMove();
        if(this.iid){
            clearTimeout(this.iid);
        }
        this.obj.destroy();
        this.obj = null;
        if(this.endEvent) this.endEvent();
    }

    private check(){
        let arr = MathTool.checkHitByPosition(this.owner,this.obj.worldTransform.position,this.checkDis);
        if(arr.length > 0){
            if(this.checkEvent) this.checkEvent(arr);
        }
    }
}