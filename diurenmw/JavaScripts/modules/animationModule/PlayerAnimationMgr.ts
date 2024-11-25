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
        this.currentNode = this.registerAnimationNode(NodeName_Empty, null, StanceBlendMode.WholeBody);
        this.registerAnimationNode(NodeName_SwordIdle, "303259", StanceBlendMode.WholeBody);
        this.registerAnimationNode(NodeName_SwordMove, "303175", StanceBlendMode.WholeBody);

        // 姿态关系构建
        this.AnimationNodeAddNext(NodeName_Empty, NodeName_SwordIdle, (inState : PlayerAnimationState)=>{
            // console.log("PlayerAnimationMgr contains AnimationNode NodeName_Empty -> NodeName_SwordIdle");
            return this.animationState.isEquipWeaponOfSword && !inState.character.isMoving;
        });
        this.AnimationNodeAddNext(NodeName_Empty, NodeName_SwordMove, (inState : PlayerAnimationState)=>{
            // console.log("PlayerAnimationMgr contains AnimationNode NodeName_Empty -> NodeName_SwordMove");
            return this.animationState.isEquipWeaponOfSword && inState.character.isMoving;
        });
        this.AnimationNodeAddNext(NodeName_SwordIdle, NodeName_Empty, (inState : PlayerAnimationState)=>{
            // console.log("PlayerAnimationMgr contains AnimationNode NodeName_SwordIdle -> NodeName_Empty");
            return !this.animationState.isEquipWeaponOfSword || inState.character.isMoving;
        });
        this.AnimationNodeAddNext(NodeName_SwordMove, NodeName_Empty, (inState : PlayerAnimationState)=>{
            // console.log("PlayerAnimationMgr contains AnimationNode NodeName_SwordMove -> NodeName_Empty");
            return !this.animationState.isEquipWeaponOfSword || !inState.character.isMoving;
        });
    }

    onEquipWeapon(player: mw.Player) {
        if(player.character.gameObjectId != this.gameObject.gameObjectId) return;
        let weaponScript = player.character.getComponent(WeaponScript);
        if(weaponScript){
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

    // 添加节点关系
    protected AnimationNodeAddNext(inNodeName : string, inNextName : string, inCondition : eventCondition) {
        let node = this.animationNodeMap.get(inNodeName);
        let nextNode = this.animationNodeMap.get(inNextName);
        if(node && nextNode) {
            console.log(`PlayerAnimationMgr AnimationNodeAddNext ${inNodeName} -> ${inNextName}`);
            node.addNext({animationNode: nextNode, condition: inCondition});
        }
    }

    // 更新动画状态机
    protected updateAnimationState() {
        let srcNode = this.currentNode;
        let nextNode = this.currentNode;
        for(let i = 0; this.currentNode; ++i) {
            if(i > 0 && nextNode == srcNode) {
                console.error("PlayerAnimationMgr updateAnimationState dead loop");
                break;
            }
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
            this.currentNode.Play(this.animationState);
        }
    }
}