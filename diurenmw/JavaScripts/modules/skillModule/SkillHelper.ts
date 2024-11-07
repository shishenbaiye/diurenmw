import { MPropertiesInject, MSingletonPlugin, RpcPlugin } from "../../framework/DI/MContainer";
import { MObject } from "../../framework/Object/MObject";
import { HudModuleC } from "../hudModule/HudModuleC";

@MSingletonPlugin()
export class SkillHelper extends MObject {

    @MPropertiesInject(RpcPlugin)
    private rpc: RpcPlugin;

    callPlayerMove(player: Player, isMove: boolean, forward?: Vector) {
        forward = forward ? forward : player.character.worldTransform.getForwardVector();
        if (isMove) {
            this.rpc.client(player, this, this.startMove, forward);
        } else {
            this.rpc.client(player, this, this.stopMove);
        }
    }

    changePlayerCanMove(player: Player, canMove: boolean) {
        this.rpc.client(player, this, this.changeCanMove, canMove);
    }

    addImpulse(player: Player, forward: Vector) {
        this.rpc.client(player, this, this.c_addImpulse, forward);
    }

    showScreenEffect(player: Player, effId: string, rotation?:Vector2) {
        this.rpc.client(player, this, this.c_showScreenEffect, effId,rotation);
    }

    stopScreenEffect(player: Player,effId:string) {
        this.rpc.client(player, this, this.c_stopScreenEffect, effId);
    }


    private currentEffect: Effect;
    private currentEffectGuid: string;
    private c_showScreenEffect(effId: string,rotation?:Vector2) {
        // if(this.currentEffect){
        //     this.currentEffect.destroy();
        // }
        GameObject.asyncSpawn(effId).then((effect:Effect)=>{
            if(effect){
                this.currentEffect = effect;
                this.currentEffectGuid = effId;
                effect.parent = Camera.currentCamera;
                if(effId == "381045"){
                    effect.setFloatRandom("Rate",2,1);
                    effect.setVector("Size",new Vector(15,1,1));
                    effect.setColor(`Color`,new LinearColor(1,1,1,1));
                }
                effect.localTransform.position = new Vector(800,0,0);
                effect.worldTransform.scale = new Vector(1).multiply(Player.localPlayer.character.worldTransform.scale.clone());
                if(rotation){
                    effect.localTransform.rotation = new Rotation(new Vector(0,rotation.x,rotation.y));
                }
                effect.loopCount = 1;
                effect.play();
            }
        })
    }

    private c_stopScreenEffect(effId: string) {
        if(this.currentEffectGuid == effId){
            this.currentEffect.destroy();
            this.currentEffect = null;
            this.currentEffectGuid = null;
        }
    }

    private changeCanMove(canMove: boolean) {
        ModuleService.getModule(HudModuleC).getCurrentHudPanel().mVirtualJoystickPanel.controlType = canMove ? CameraControlType.MoveType : CameraControlType.None;
    }

    private c_addImpulse(forward: Vector) {
        Player.localPlayer.character.addImpulse(forward, true);
    }

    private startMove(forward: Vector) {
        this.forward = forward.normalize();
        Player.localPlayer.character.movementDirection = MovementDirection.AxisDirection;

        TimeUtil.onEnterFrame.add(this.move, this);
    }

    private stopMove() {
        Player.localPlayer.character.movementDirection = MovementDirection.ControllerDirection;
        TimeUtil.onEnterFrame.remove(this.move, this);
    }

    private forward: Vector;
    private move() {
        if (!this.forward) return;
        Player.localPlayer.character.addMovement(new Vector(this.forward.x, this.forward.y, 0));
    }

}