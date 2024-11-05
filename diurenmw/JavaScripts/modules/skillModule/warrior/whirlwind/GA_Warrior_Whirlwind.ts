import { Constructor, MPlugin } from "../../../../framework/DI/MContainer";
import { MathTool } from "../../../../tools/MathTool";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_PlayAnimation } from "../../../gasModule/gameAbilitys/AT/customAT/AT_PlayAnimation";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { RegisterSkill } from "../../SkillManager";
import { ESkillType } from "../../SkillType";
import { GE_CoolDown_Warrior_Whirlwind } from "./GE_CoolDown_Warrior_Whirlwind";
import { GE_Cost_Warrior_Whirlwind } from "./GE_Cost_Warrior_Whirlwind";
import { GE_Damage_Warrior_Whirlwind1 } from "./GE_Damage_Warrior_Whirlwind";

@RegisterSkill(1010,ESkillType.GreatSword)
@MPlugin()
export class GA_Warrior_Whirlwind extends GameAbility{
    tag: string = "GA.Warrior.Whirlwind";
    cancelTags: string[];
    blockTags: string[];
    activationOwnedTags: string[] = ["State.Player.Skilling"];
    activationRequiredTags: string[];
    activationBlockedTags: string[];
    targetRequiredTags: string[];
    targetBlockedTags: string[] = ["Club.Player","State.Monster.Dead","State.Monster.Invincible"];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];

    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Warrior_Whirlwind;
    cost: Constructor<CostByGameEffect> = GE_Cost_Warrior_Whirlwind;
    
    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }
    private effect1:number;
    private effect2:number;
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.animation(asc,owner,target);
    }

    private num:number = 0;
    animation(asc: AbilitySystemComponent, owner: GameObject, target: GameObject){
        let char = owner as Character;
        this.num++;
        let aim = char.loadAnimation("298003");
        aim.blendInTime = 0;
        aim.blendOutTime = 0;
        aim.startTime = 0.3;
        let ani = AT_PlayAnimation.New(this,aim,3.03,char);
        ani
        .addEvent(0.1,()=>{
            this.effect1 = EffectService.playOnGameObject("84942",owner,{scale:new Vector(1.5),slotType:HumanoidSlotType.Root});
            this.effect2 = EffectService.playOnGameObject("123627",owner,{scale:new Vector(1.5),position:new Vector(0,0,-owner.getBoundingBox().z/2)});
        })
        .addEvent(0.2,()=>{
            let res = MathTool.checkHit(owner as Character,350);
            if(res.length > 0){
                res.forEach((obj:Character)=>{
                    let asc = obj.getComponent(AbilitySystemComponent);
                    if(asc){
                        if(asc.hasMatchingGameTag(this.targetBlockedTags)) return;
                        this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_Whirlwind1});
                    }
                    
                })
            }
        })
        .addEvent(0.3,()=>{
            ani.cancelTask();
            if(this.num == 5){
                this.end();
            }else{
                this.animation(asc,owner,target);
            }
        }).activate();
    }


    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.effect1 = null;
    }
}