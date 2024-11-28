import { AnimationObj } from "./gameAbilitys/AT/customAT/AnimationObj";
import { GasModuleC } from "./GasModuleC";

export class GasModuleS extends ModuleS<GasModuleC, null> {

    private animationList: Map<string,AnimationObj> = new Map();


    createAT_Animation(owner:Character,uuid: number, currentAnim: Animation) {
        let anim = new AnimationObj(owner,uuid,currentAnim);
        this.animationList.set(uuid.toString(),anim);
        this.callClientAnimation(anim);
    }

    callClientAnimation(animObj:AnimationObj) {
        this.getAllClient().net_CreateAnimation(animObj.getData());
    }

    callClientAnimationPlay(uuid: number) {
        this.getAllClient().net_PlayAnimation(uuid);
    }

    callClientAnimationStop(uuid: number) {
        this.getAllClient().net_StopAnimation(uuid);
    }

    callClientAnimationSpeed(uuid: number, speed: number) {
        this.getAllClient().net_SpeedAnimation(uuid,speed);
    }

    callClientAnimationPause(uuid: number) {
        this.getAllClient().net_PauseAnimation(uuid);
    }

    callClientAnimationResume(uuid: number) {
        this.getAllClient().net_ResumeAnimation(uuid);
    }

    callClientAnimationRemove(uuid: number) {
        this.animationList.delete(uuid.toString());
        this.getAllClient().net_RemoveAnimation(uuid);
    }
}
