import { Constructor, MPlugin, MPropertiesInject } from "../../../../framework/DI/MContainer";
import { MathTool } from "../../../../tools/MathTool";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_PlayAnimation } from "../../../gasModule/gameAbilitys/AT/customAT/AT_PlayAnimation";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { SkillHelper } from "../../SkillHelper";
import { RegisterSkill } from "../../SkillManager";
import { ESkillType } from "../../SkillType";
import { GE_Damage_Warrior_NormalAttack1 } from "./GE_Damage_Warrior_NormalAttack1";


@RegisterSkill(1001,ESkillType.GreatSword)
@MPlugin()
export class GA_Warrior_NormalAttack1 extends GameAbility{
    tag: string = "GA.Warrior.NormalAttack.One";
    cancelTags: string[];
    blockTags: string[] = []
    activationOwnedTags: string[] = ["State.Player.NormalAttack"]
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Player.Skilling","State.Player.BackJump"]
    targetRequiredTags: string[];
    targetBlockedTags: string[] = ["Club.Player","State.Monster.Dead","State.Monster.Invincible"];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];
    cd: Constructor<CoolDownByGameEffect>;
    cost: Constructor<CostByGameEffect>;

    @MPropertiesInject(SkillHelper)
    private skillHelper:SkillHelper;

    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        
    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let char = owner as Character;
        let aim = char.loadAnimation("269040");
        aim.blendInTime = 0;
        aim.speed = 1.2;
        aim.blendOutMode = AnimationBlendMode.QuadraticInOut;
        let animTask = AT_PlayAnimation.New(this, aim, 0.9, char);

        this.skillHelper.changePlayerCanMove(char.player,false);

        animTask.addEvent(0.6, () => {
            let arr = MathTool.checkHitByCharacter(owner as Character,200,120);
            arr.forEach((obj:Character)=>{
                let asc = obj.getComponent(AbilitySystemComponent);
                if(asc){
                    if(asc.hasMatchingGameTag(this.targetBlockedTags)) return;
                    this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_NormalAttack1});
                }
            })
        })


        // animTask.addEvent(1.3, () => {
        //     let arr = MathTool.checkHitByDistance(owner as Character,350,120);
        //     arr.forEach((obj:Character)=>{
        //         let asc = obj.getComponent(AbilitySystemComponent);
        //         if(asc){
        //             this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_NormalAttack3});
        //         }
        //     })
        // })

        animTask.onFinished(()=>{
            this.end();
        })

        animTask.addEvent(0.4,()=>{
            this.skillHelper.callPlayerMove(char.player,true,char.worldTransform.getForwardVector().normalize().multiply(0.1));
        })
        animTask.addEvent(0.6,()=>{
            this.skillHelper.callPlayerMove(char.player,false);
        })
        // animTask.addEvent(1.2,()=>{
        //     this.skillHelper.callPlayerMove(char.player,true);
        // })
        // animTask.addEvent(1.4,()=>{
        //     this.skillHelper.callPlayerMove(char.player,false);
        // })



        animTask.activate()
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.skillHelper.callPlayerMove((owner as Character).player,false);
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.skillHelper.changePlayerCanMove((owner as Character).player,true);
    }
}