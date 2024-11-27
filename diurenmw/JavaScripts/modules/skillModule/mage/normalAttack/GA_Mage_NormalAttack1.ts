import { Constructor, MPlugin, MPropertiesInject } from "../../../../framework/DI/MContainer";
import { MathTool } from "../../../../tools/MathTool";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_PlayAnimation } from "../../../gasModule/gameAbilitys/AT/customAT/AT_PlayAnimation";
import { AT_WaitTime } from "../../../gasModule/gameAbilitys/AT/customAT/AT_WaitTime";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { FlyObj } from "../../common/FlyObj";
import { SkillHelper } from "../../SkillHelper";
import { RegisterSkill } from "../../SkillManager";
import { ESkillType } from "../../SkillType";
import { GE_Damage_Warrior_NormalAttack1 } from "../../warrior/normalAttack/GE_Damage_Warrior_NormalAttack1";
import { GE_Damage_Mage_NormalAttack1 } from "./GE_Damage_Mage_NormalAttack1";

@MPlugin()
@RegisterSkill(2001,ESkillType.Staff)
export class GA_Mage_NormalAttack1 extends GameAbility{
    tag: string = "GA.Mage.NormalAttack1";
    cancelTags: string[];
    blockTags: string[];
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
        // throw new Error("Method not implemented.");
    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let char = owner as Character;
        let attrSpeed = asc.attributeSet.getAttr(EPlayerAttributeSetType.castSpeed).getCurrent();
        let aim = char.loadAnimation("363500");
        // let aim = char.loadAnimation("269040");
        aim.blendInTime = 0;
        aim.speed = 1.1*attrSpeed;
        aim.blendOutMode = AnimationBlendMode.QuadraticInOut;
        let animTask = AT_PlayAnimation.New(this, aim, 0.6, char);

        this.skillHelper.changePlayerCanMove(char.player,false);

        animTask.addEvent(0.2, () => {
            let start = char.worldTransform.position.clone().add(char.worldTransform.getForwardVector().normalize().multiply(100));
            let fly = FlyObj.New("B72E49DC44990F4F8E68D18D66FC239B",start,char.worldTransform.getForwardVector(),800,1,char,100);
            fly.addCheckListener((objs)=>{
                objs.forEach((obj:Character)=>{
                    let asc = obj.getComponent(AbilitySystemComponent);
                    if(asc){
                        if(asc.hasMatchingGameTag(this.targetBlockedTags)) return;
                        this.sendGameEvent(owner,"Event.Player.HurtMonster",{target:obj});
                        let force = obj.worldTransform.position.clone().subtract(char.worldTransform.position).normalize().multiply(300);
                        this.sendGameEvent(obj,"Event.Monster.OnHurtAnim",{duringTime:0.5,force:force});
                        this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Mage_NormalAttack1});
                    }
                })
                fly.cancel();
            })
            fly.activate();
        })


        animTask.onFinished(()=>{
            this.end();
        })

        animTask.addEvent(0.2,()=>{
            // new Tween({v:char.worldTransform.position.clone()})
            // .to({v:char.worldTransform.position.clone().add(char.worldTransform.getForwardVector().normalize().multiply(-30))},200)
            // .onUpdate((v)=>{
            //     char.worldTransform.position = v.v;
            // }).start();
            // this.skillHelper.callPlayerMove(char.player,true,char.worldTransform.getForwardVector().normalize().multiply(0.5));
        })
        animTask.addEvent(0.1,()=>{
            // this.skillHelper.callPlayerMove(char.player,false);
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