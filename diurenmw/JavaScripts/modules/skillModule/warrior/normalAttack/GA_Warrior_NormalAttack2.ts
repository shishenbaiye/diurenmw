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
import { GE_Damage_Warrior_NormalAttack1 } from "./GE_Damage_Warrior_NormalAttack1";
import { GE_Damage_Warrior_NormalAttack2 } from "./GE_Damage_Warrior_NormalAttack2";
import { GE_Damage_Warrior_NormalAttack3 } from "./GE_Damage_Warrior_NormalAttack3";

@RegisterSkill(1002, ESkillType.GreatSword)
@MPlugin()
export class GA_Warrior_NormalAttack2 extends GameAbility {
    tag: string = "GA.Warrior.NormalAttack2";
    cancelTags: string[];
    blockTags: string[] = [];
    activationOwnedTags: string[] = ["State.Player.NormalAttack"]
    activationRequiredTags: string[];
    activationBlockedTags: string[];
    targetRequiredTags: string[];
    targetBlockedTags: string[];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];
    cd: Constructor<CoolDownByGameEffect>;
    cost: Constructor<CostByGameEffect>;
    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let char = owner as Character;
        let aim = char.loadAnimation("269254");
        let animTask = AT_PlayAnimation.New(this,aim,1.5,char);
        animTask.addEvent(0.6,()=>{
            let arr = MathTool.checkHitByDistance(owner as Character,350,120);
            arr.forEach((obj:Character)=>{
                let asc = obj.getComponent(AbilitySystemComponent);
                if(asc){
                    this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_NormalAttack1});
                }
            })
           
            console.log(`GA_Warrior_NormalAttack1     1`);
        })
        animTask.addEvent(1.4,()=>{
            this.end();
        })
        animTask.activate()
        // let char = owner as Character;
        // let aim = char.loadAnimation("269040");
        // let animTask = AT_PlayAnimation.New(this, aim, 2.1, char);

        // animTask.addEvent(0.6, () => {
        //     let arr = MathTool.checkHitByDistance(owner as Character,350,120);
        //     arr.forEach((obj:Character)=>{
        //         let asc = obj.getComponent(AbilitySystemComponent);
        //         if(asc){
        //             this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_NormalAttack2});
        //         }
        //     })
        // })


        // animTask.addEvent(1.3, () => {
        //     let arr = MathTool.checkHitByDistance(owner as Character,350,120);
        //     arr.forEach((obj:Character)=>{
        //         let asc = obj.getComponent(AbilitySystemComponent);
        //         if(asc){
        //             this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_NormalAttack3});
        //         }
        //     })
        // })

        // animTask.addEvent(2, () => {
        //     this.end();
        // });
        // animTask.activate()
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }
}