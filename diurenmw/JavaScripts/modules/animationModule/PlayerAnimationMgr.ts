import { GameEventBus } from "../../common/eventBus/EventBus";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import WeaponScript from "../weaponModule/WeaponScript";
import { PlayerAnimationNode } from "./PlayerAnimationNode";
import { eventCondition, PlayerAnimationState } from "./PlayerAnimationState";



@Component
export class PlayerAnimationMgr extends Script {

    protected onStart(): void {
        this.useUpdate = true;
        this.init();
    }

    private animMove:SubStance;
    private animIdle:SubStance;

    private animationState : PlayerAnimationState;
    private currentNode : PlayerAnimationNode;
    private animationNodeMap : Map<string, PlayerAnimationNode> = new Map<string, PlayerAnimationNode>();


    init() {
        console.log(`PlayerAnimationMgr init`);
        GameEventBus.on(`WeaponModule_EquipWeapon`, this.onEquipWeapon.bind(this));
        GameEventBus.on(`WeaponModule_UnEquipWeapon`, this.onUnEquipWeapon.bind(this));

        let char = this.gameObject as Character;
        this.animationState = new PlayerAnimationState();
        this.animationState.character = char;

        // 状态管理
        this.onEquipWeapon(char.player);

        // 节点名称定义
        const NodeName_Empty = "空姿态";
        const NodeName_SwordIdle = "持重剑站立";
        const NodeName_SwordMove = "持重剑行走";
        // 姿态节点
        let aniNodeEmpty = this.registerAnimationNode(NodeName_Empty, null, StanceBlendMode.WholeBody);
        let aniNodeSwordIdle = this.registerAnimationNode(NodeName_SwordIdle, "303259", StanceBlendMode.WholeBody);
        let aniNodeSwordMovde = this.registerAnimationNode(NodeName_SwordMove, "303175", StanceBlendMode.WholeBody);

        // 姿态关系构建
        aniNodeEmpty.addNext(aniNodeSwordIdle, (inState : PlayerAnimationState)=>{
            return this.animationState.isEquipWeaponOfSword && !inState.character.isMoving;
        });
        aniNodeEmpty.addNext(aniNodeSwordMovde, (inState : PlayerAnimationState)=>{
            return this.animationState.isEquipWeaponOfSword && inState.character.isMoving;
        });
        aniNodeSwordIdle.addNext(aniNodeEmpty, (inState : PlayerAnimationState)=>{
            return !this.animationState.isEquipWeaponOfSword || inState.character.isMoving;
        });
        aniNodeSwordMovde.addNext(aniNodeEmpty, (inState : PlayerAnimationState)=>{
            return !this.animationState.isEquipWeaponOfSword || !inState.character.isMoving;
        });

        this.currentNode = aniNodeEmpty;
    }

    onEquipWeapon(player: mw.Player) {
        if(player.character.gameObjectId != this.gameObject.gameObjectId) return;
        let weaponScript = player.character.getComponent(WeaponScript);
        if(weaponScript && weaponScript.getEquipWeapon()){
            let weapon = weaponScript.getEquipWeapon().getData();
            if(weapon){
                if(weapon.wtid == 1){
                    this.animationState.isEquipWeaponOfSword = true;
                }
            }
        }
    }
    onUnEquipWeapon(player: mw.Player) {
        this.animationState.isEquipWeaponOfSword = false;
    }

    private ownerAsc:AbilitySystemComponent;
    protected onUpdate(dt: number): void {
        let char = this.gameObject as Character;
        if(!this.ownerAsc){
            this.ownerAsc = char.getComponent(AbilitySystemComponent);
        }
        this.updateAnimationState();

    }

    // 注册姿态节点
    protected registerAnimationNode(inNodeName : string, inAssetId : string, inMode : StanceBlendMode) : PlayerAnimationNode {
        let anim : SubStance = null;
        if (inAssetId)
        {
            anim = this.animationState.character.loadSubStance(inAssetId);
            anim.blendMode = inMode;
        }
        let animNode = new PlayerAnimationNode(inNodeName, anim, inMode);
        this.animationNodeMap.set(inNodeName, animNode);
        console.log(`PlayerAnimationMgr registerAnimationNode ${inNodeName}`);
        return animNode;
    }

    // 更新动画状态机
    protected updateAnimationState() {
        let srcNode = this.currentNode;
        let nextNode = this.currentNode;
        let stateCheck : Array<string> = new Array<string>();
        while(nextNode) {
            if(stateCheck.find((inNode) => {
                return inNode == nextNode.nodeName;
            })) {
                console.error("PlayerAnimationMgr updateAnimationState dead loop");
                return;
            }

            stateCheck.push(nextNode.nodeName);

            let isUpdate = false;
            for(let i = 0; i < nextNode.nexts.length; ++i) {
                if(nextNode.nexts[i].condition(this.animationState)) {
                    nextNode = nextNode.nexts[i].animationNode;
                    isUpdate = true;
                }
            }
            if(!isUpdate) {
                break;
            }
        }
        if(nextNode && nextNode != this.currentNode) {
            console.log(`PlayerAnimationMgr updateAnimationState ${this.currentNode.nodeName} -> ${nextNode.nodeName}`);
            this.currentNode = nextNode;
            this.currentNode.play(this.animationState);
        }
    }
}