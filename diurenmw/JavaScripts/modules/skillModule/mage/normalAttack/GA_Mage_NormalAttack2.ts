import { Constructor, MPlugin, MPropertiesInject } from "../../../../framework/DI/MContainer";
import { EffectTool } from "../../../../tools/EffectTool";
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
import { GE_Damage_Warrior_NormalAttack2 } from "../../warrior/normalAttack/GE_Damage_Warrior_NormalAttack2";
import { GE_Damage_Mage_NormalAttack2 } from "./GE_Damage_Mage_NormalAttack2";

@MPlugin()
@RegisterSkill(2002,ESkillType.Staff)
export class GA_Mage_NormalAttack2 extends GameAbility{
    tag: string = "GA.Mage.NormalAttack2";
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

    @MPropertiesInject(EffectTool)
    private effectTool:EffectTool;

    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let char = owner as Character;
        let attrSpeed = asc.attributeSet.getAttr(EPlayerAttributeSetType.castSpeed).getCurrent();
        let aim = char.loadAnimation("279656");
        // let aim = char.loadAnimation("269040");
        aim.blendInTime = 0;
        aim.speed = 1.1*attrSpeed;
        aim.blendOutMode = AnimationBlendMode.QuadraticInOut;
        let animTask = AT_PlayAnimation.New(this, aim, 0.6, char);

        this.skillHelper.changePlayerCanMove(char.player,false);

        animTask.addEvent(0.4, () => {
            let start = char.worldTransform.position.clone().add(char.worldTransform.getForwardVector().normalize().multiply(100));
            let fly = FlyObj.New("B72E49DC44990F4F8E68D18D66FC239B",start,char.worldTransform.getForwardVector(),1200,1,char,60);
            fly.addCheckListener((objs)=>{
                objs.forEach((obj:Character)=>{
                    let asc = obj.getComponent(AbilitySystemComponent);
                    if(asc){
                        this.effectTool.playAtPosition("13417",obj.worldTransform.position.clone());
                        if(asc.hasMatchingGameTag(this.targetBlockedTags)) return;
                        this.sendGameEvent(owner,"Event.Player.HurtMonster",{target:obj});
                        let force = obj.worldTransform.position.clone().subtract(char.worldTransform.position).normalize().multiply(500);
                        this.sendGameEvent(obj,"Event.Monster.OnHurtAnim",{duringTime:0.5,force:force});
                        this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Mage_NormalAttack2});
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
            new Tween({v:char.worldTransform.position.clone()})
            .to({v:char.worldTransform.position.clone().add(char.worldTransform.getForwardVector().normalize().multiply(-10))},200)
            .onUpdate((v)=>{
                char.worldTransform.position = v.v;
            }).start();
        })



        animTask.activate()
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.skillHelper.callPlayerMove((owner as Character).player,false);
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.skillHelper.changePlayerCanMove((owner as Character).player,true);
    }
    
}