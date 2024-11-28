
import {eventCondition, PlayerAnimationState} from "./PlayerAnimationState";

export interface PlayerAnimationNodeInfo {
    animationNode : PlayerAnimationNode;
    condition : eventCondition;
};

export class PlayerAnimationNode {
    private anim : SubStance;
    private blendMode : StanceBlendMode;
    nexts : Array<PlayerAnimationNodeInfo>;
    nodeName : string;

    constructor(inNodeName : string, inAnim : SubStance, inBlendMode : StanceBlendMode) {
        this.nodeName = inNodeName;
        this.anim = inAnim;
        this.blendMode = inBlendMode;
        this.nexts = new Array<PlayerAnimationNodeInfo>();
    }

    addNext(inAnimationNode : PlayerAnimationNode, inCondition : eventCondition) {
        console.log(`PlayerAnimationNode addNext ${this.nodeName} -> ${inAnimationNode.nodeName}`);
        this.nexts.push({animationNode : inAnimationNode, condition : inCondition});
        return this;
    }

    play(inState : PlayerAnimationState) {
        if(this.anim) {
            this.anim.play();
        } else {
            inState.character?.currentSubStance?.stop();
        }
    }
}