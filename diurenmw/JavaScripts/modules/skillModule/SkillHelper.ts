import { MPropertiesInject, MSingletonPlugin, RpcPlugin } from "../../framework/DI/MContainer";
import { MObject } from "../../framework/Object/MObject";
import { HudModuleC } from "../hudModule/HudModuleC";

@MSingletonPlugin()
export class SkillHelper extends MObject{

    @MPropertiesInject(RpcPlugin)
    private rpc:RpcPlugin;

    callPlayerMove(player:Player,isMove:boolean,forward?:Vector){
        forward = forward ? forward : player.character.worldTransform.getForwardVector();
        if(isMove){
            this.rpc.client(player,this,this.startMove,forward);
        }else{
            this.rpc.client(player,this,this.stopMove);
        }
    }

    changePlayerCanMove(player:Player,canMove:boolean){
        this.rpc.client(player,this,this.changeCanMove,canMove);
    }

    addImpulse(player:Player,forward:Vector){
        this.rpc.client(player,this,this.c_addImpulse,forward);
    }
    private changeCanMove(canMove:boolean){
        ModuleService.getModule(HudModuleC).getCurrentHudPanel().mVirtualJoystickPanel.controlType = canMove ? CameraControlType.MoveType : CameraControlType.None;
    }

    private c_addImpulse(forward:Vector){
        Player.localPlayer.character.addImpulse(forward,true);
    }

    private startMove(forward:Vector){
        this.forward = forward.normalize();
        Player.localPlayer.character.movementDirection = MovementDirection.AxisDirection;

        TimeUtil.onEnterFrame.add(this.move,this);
    }

    private stopMove(){
        Player.localPlayer.character.movementDirection = MovementDirection.ControllerDirection;
        TimeUtil.onEnterFrame.remove(this.move,this);
    }

    private forward:Vector;
    private move(){
        if(!this.forward) return;
        Player.localPlayer.character.addMovement(new Vector(this.forward.x,this.forward.y,0));
    }

}