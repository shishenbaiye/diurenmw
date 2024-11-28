import { AnimationData, AnimationObj } from "./gameAbilitys/AT/customAT/AnimationObj";
import { GasModuleS } from "./GasModuleS";

export class GasModuleC extends ModuleC<GasModuleS,null>{

    private animationList: Map<string,AnimationObj> = new Map();


    net_CreateAnimation(animData: AnimationData) {
        console.log("net_CreateAnimation",animData);
        let owner = GameObject.findGameObjectById(animData.owner) as Character;
        let anim = owner.loadAnimation(animData.animAsset);
        anim.blendInTime = animData.animBlendInTime;
        anim.blendOutTime = animData.animBlendOutTime;
        anim.loop = animData.animLoop;
        anim.slot = animData.animSlot;
        anim.startTime = animData.animStartTime;
        anim.speed = animData.animSpeed;
        let animTask = new AnimationObj(owner,animData.uuid,anim);
        this.animationList.set(animData.uuid.toString(),animTask);
    }

    net_PlayAnimation(uuid: number) {
        let anim = this.animationList.get(uuid.toString());
        if(!anim) return;
        anim.currentAnim.play();
    }

    net_StopAnimation(uuid: number) {
        let anim = this.animationList.get(uuid.toString());
        if(!anim) return;
        anim.currentAnim.stop();
    }

    net_SpeedAnimation(uuid: number, speed: number) {
        let anim = this.animationList.get(uuid.toString());
        if(!anim) return;
        anim.currentAnim.speed = speed;
    }

    net_PauseAnimation(uuid: number) {
        let anim = this.animationList.get(uuid.toString());
        if(!anim) return;
        anim.currentAnim.pause();
    }

    net_ResumeAnimation(uuid: number) {
        let anim = this.animationList.get(uuid.toString());
        if(!anim) return;
        anim.currentAnim.resume();
    }

    net_RemoveAnimation(uuid: number) {
        let anim = this.animationList.get(uuid.toString());
        if(!anim) return;
        anim.currentAnim.stop();
        this.animationList.delete(uuid.toString());
    }
}