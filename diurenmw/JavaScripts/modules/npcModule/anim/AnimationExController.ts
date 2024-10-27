import { AnimationEx, AnimationExInfo } from "./AnimationExInfo";

export class AnimationExController {

    cacheAnimMap: Map<string, AnimationEx> = new Map();

    boundCheckMoveState: any;

    get curAnimEx() {
        return this.cacheAnimMap.get(this.curAnim?.assetId);
    }
    get curAnim() {
        return this.char?.currentAnimation;
    }

    constructor(private char: Character) {
        this.boundCheckMoveState = this.checkMoveState.bind(this);
    }

    clientPlayAnim(animInfo: AnimationExInfo) {
        if (this.curAnimEx) {
            const higherPriority = this.curAnimEx.animInfo.priority <= animInfo.priority;
            const isPlaying = this.curAnimEx.animation.isPlaying || this.curAnimEx.animInfo.pausing;
            if (isPlaying && !higherPriority) return;
        }
        const animEx = this.getAnimEx(animInfo);
        animEx.animation.play();
        if (animEx.animInfo.endTime > 0 && animEx.animInfo.pauseAtEnd) {
            setTimeout(() => {
                if (this.curAnimEx && this.curAnimEx.animInfo.assetId == animInfo.assetId) {
                    animEx.animation.pause();
                    animEx.animInfo.pausing = true;
                }
            }, animEx.animInfo.endTime * 1000);
        }
        if (animEx.animInfo.stopByMove) {
            TimeUtil.onEnterFrame.add(this.boundCheckMoveState)
        }
    }

    clientStopAnim(assetId?: string) {
        assetId == assetId ? assetId : this.curAnim?.assetId;
        const animEx = this.cacheAnimMap.get(assetId);
        if (animEx) {
            animEx.animation.stop();
            animEx.animInfo.pausing = false;
        }
    }

    checkMoveState() {
        if (this.curAnimEx?.animInfo?.stopByMove) {
            if (this.char.isMoving) {
                this.curAnimEx.animation.stop();
                this.curAnimEx.animInfo.pausing = false;
                TimeUtil.onEnterFrame.remove(this.boundCheckMoveState);
            }
        }
        else {
            TimeUtil.onEnterFrame.remove(this.boundCheckMoveState);
        }
    }

    getAnimEx(animInfo: AnimationExInfo) {
        let animEx = this.cacheAnimMap.get(animInfo.assetId);
        if (!animEx) {
            animEx = new AnimationEx();
            let anim = this.char.loadAnimation(animInfo.assetId);
            animEx.animation = anim;
            this.cacheAnimMap.set(animInfo.assetId, animEx);
        }
        animEx.animInfo = animInfo;
        animEx.animation.loop = animInfo.loop;
        animEx.animation.speed = animInfo.speed;
        animEx.animation.slot = animInfo.slot;
        animEx.animation.blendInTime = animInfo.blendInTime;
        animEx.animation.blendOutTime = animInfo.blendOutTime;
        animEx.animation.startTime = animInfo.startTime;
        return animEx;
    }

}