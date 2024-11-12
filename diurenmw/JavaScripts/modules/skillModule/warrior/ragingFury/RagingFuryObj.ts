import { MPlugin, MPropertiesInject } from "../../../../framework/DI/MContainer";
import { MObject } from "../../../../framework/Object/MObject";
import { EffectTool } from "../../../../tools/EffectTool";
import { MathTool } from "../../../../tools/MathTool";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { GE_Damage_Warrior_RagingFuryOne } from "./GE_Damage_Warrior_RagingFuryOne";
import { GE_Damage_Warrior_RagingFuryTwo } from "./GE_Damage_Warrior_RagingFuryTwo";

@MPlugin()
export class RagingFuryObj extends MObject{

    private asc:AbilitySystemComponent;
    private owner:GameObject;
    private target:GameObject;
    private gameAbility:GameAbility;
    @MPropertiesInject(EffectTool)
    private effectTool:EffectTool;
    

    init(asc:AbilitySystemComponent,owner:GameObject,target:GameObject,ownerGameAbility:GameAbility){
        this.asc = asc;
        this.owner = owner;
        this.target = target;
        this.gameAbility = ownerGameAbility;
    }


    private charPos:Vector;
    start(){
        let char = this.owner as Character;

        this.effectTool.playAtPosition("156403",char.getSlotWorldPosition(HumanoidSlotType.Root),{scale:new Vector(1),color:LinearColor.red});

        this.charPos = char.worldTransform.position.clone();
        let arr = MathTool.checkHitByPosition(char,this.charPos,300);
        arr.forEach((obj:Character)=>{
            let asc = obj.getComponent(AbilitySystemComponent);
            if(asc){
                if(asc.hasMatchingGameTag(this.gameAbility.targetBlockedTags)) return;
                this.gameAbility.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_RagingFuryOne});
                this.gameAbility.sendGameEvent(obj,"Event.Monster.OnHurtAnim",{onHurtType:"Crit",duringTime:0.5});
            }
        })

        setTimeout(() => {
            this.effectTool.playAtPosition("398532",this.charPos,{scale:new Vector(8,2,8),rotation:new Rotation(new Vector(90,0,0)),color:LinearColor.red});
            this.effectTool.playAtPosition("15248",this.charPos,{scale:new Vector(8,8,1),color:LinearColor.red});
        }, 1500);

        setTimeout(() => {
            let charPos = char.worldTransform.position.clone();
            let arr = MathTool.checkHitByPosition(char,charPos,300);
            arr.forEach((obj:Character)=>{
                let asc = obj.getComponent(AbilitySystemComponent);
                if(asc){
                    if(asc.hasMatchingGameTag(this.gameAbility.targetBlockedTags)) return;
                    this.gameAbility.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_RagingFuryTwo});
                    this.gameAbility.sendGameEvent(obj,"Event.Monster.OnHurtAnim",{onHurtType:"Crit",duringTime:0.5});
                }
            })
        }, 1500);

        
        setTimeout(() => {
            let charPos = char.worldTransform.position.clone();
            let arr = MathTool.checkHitByPosition(char,charPos,300);
            arr.forEach((obj:Character)=>{
                let asc = obj.getComponent(AbilitySystemComponent);
                if(asc){
                    if(asc.hasMatchingGameTag(this.gameAbility.targetBlockedTags)) return;
                    this.gameAbility.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_RagingFuryTwo});
                    this.gameAbility.sendGameEvent(obj,"Event.Monster.OnHurtAnim",{onHurtType:"Crit",duringTime:0.5});
                }
            })
        }, 1600);
        
        setTimeout(() => {
            let charPos = char.worldTransform.position.clone();
            let arr = MathTool.checkHitByPosition(char,charPos,300);
            arr.forEach((obj:Character)=>{
                let asc = obj.getComponent(AbilitySystemComponent);
                if(asc){
                    if(asc.hasMatchingGameTag(this.gameAbility.targetBlockedTags)) return;
                    this.gameAbility.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_RagingFuryTwo});
                    this.gameAbility.sendGameEvent(obj,"Event.Monster.OnHurtAnim",{onHurtType:"Crit",duringTime:0.5});
                }
            })
        }, 1700);

        setTimeout(() => {
            let charPos = char.worldTransform.position.clone();
            let arr = MathTool.checkHitByPosition(char,charPos,300);
            arr.forEach((obj:Character)=>{
                let asc = obj.getComponent(AbilitySystemComponent);
                if(asc){
                    if(asc.hasMatchingGameTag(this.gameAbility.targetBlockedTags)) return;
                    this.gameAbility.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_RagingFuryTwo});
                    this.gameAbility.sendGameEvent(obj,"Event.Monster.OnHurtAnim",{onHurtType:"Crit",duringTime:0.5});
                }
            })
        }, 1800);

        setTimeout(() => {
            let charPos = char.worldTransform.position.clone();
            let arr = MathTool.checkHitByPosition(char,charPos,300);
            arr.forEach((obj:Character)=>{
                let asc = obj.getComponent(AbilitySystemComponent);
                if(asc){
                    if(asc.hasMatchingGameTag(this.gameAbility.targetBlockedTags)) return;
                    this.gameAbility.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_RagingFuryTwo});
                    this.gameAbility.sendGameEvent(obj,"Event.Monster.OnHurtAnim",{onHurtType:"Crit",duringTime:0.5});
                }
            })
        }, 1900);

    }
}