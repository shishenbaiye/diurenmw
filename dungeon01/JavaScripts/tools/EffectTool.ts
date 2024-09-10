import { MPropertiesInject, MSingletonPlugin, RpcPlugin } from "../framework/DI/MContainer";
import { MObject } from "../framework/Object/MObject";

@MSingletonPlugin()
export class EffectTool extends MObject{
    @MPropertiesInject(RpcPlugin)
    private rpc:RpcPlugin;

    private effectId:number = 0;
    playOnGameObject(assetId: string, target: mw.GameObject, params?: {
        slotType?: mw.HumanoidSlotType;
        loopCount?: number;
        duration?: number;
        position?: mw.Vector;
        rotation?: mw.Rotation;
        scale?: mw.Vector;
        color?: mw.LinearColor;
        transparencyFloat?: number;
    }){
        this.effectId++;
        this.rpc.allClient(this,this.c_playOnGameObject,this.effectId,assetId,target.gameObjectId,params);
        return this.effectId;
    }

    stopEffect(id:number){
        this.rpc.allClient(this,this.c_stopEffect,id);
    }


    private c_EffectMap:Map<number,mw.Effect> = new Map();
    c_playOnGameObject(id:number, assetId: string, target: string, params?: {
        slotType?: mw.HumanoidSlotType;
        loopCount?: number;
        duration?: number;
        position?: mw.Vector;
        rotation?: mw.Rotation;
        scale?: mw.Vector;
        color?: mw.LinearColor;
        transparencyFloat?: number;
    }){
        GameObject.asyncSpawn(assetId).then((obj) => {
            if(obj){
                let effect = obj as mw.Effect;
                let targetObj = GameObject.findGameObjectById(target);
                if(params.slotType && targetObj instanceof Character){
                    targetObj.attachToSlot(effect, params.slotType);
                }else{
                    effect.parent = targetObj;
                }
                if(params.color){
                    effect.setColor(`Color`,params.color);
                }
                if(params.transparencyFloat){
                    effect.setFloat("Transparency",params.transparencyFloat);
                }
                if(params.loopCount){
                    effect.loopCount = params.loopCount;
                }
                effect.loopCount = params.loopCount || 1;
                effect.duration = params.duration || 0;
                effect.localTransform.position = params.position || new Vector(0,0,0);
                effect.localTransform.rotation = params.rotation || new Rotation(0,0,0);
                effect.localTransform.scale = params.scale || new Vector(1,1,1);
                effect.play();
                this.c_EffectMap.set(id,effect);
            }
        });
    }

    c_stopEffect(id:number){
        let effect = this.c_EffectMap.get(id);
        if(effect){
            effect.destroy();
            this.c_EffectMap.delete(id);
        }
    }
}