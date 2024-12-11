import { Constructor, MPlugin, MPropertiesInject } from "../../../../framework/DI/MContainer";
import { MFramework } from "../../../../framework/MFramework";
import { EffectTool } from "../../../../tools/EffectTool";
import { MathTool } from "../../../../tools/MathTool";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_PlayAnimation } from "../../../gasModule/gameAbilitys/AT/customAT/AT_PlayAnimation";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { FlyObj } from "../../common/FlyObj";
import { SkillHelper } from "../../SkillHelper";
import { RegisterSkill } from "../../SkillManager";
import { ESkillType } from "../../SkillType";
import { GE_CoolDown_Mage_SunBlast } from "./GE_CoolDown_Mage_SunBlast";
import { GE_Cost_Mage_SunBlast } from "./GE_Cost_Mage_SunBlast";
import { GE_Damage_Mage_SunBlast } from "./GE_Damage_Mage_SunBlast";



@MPlugin()
@RegisterSkill(2005, ESkillType.Staff)
export class GA_Mage_SunBlast extends GameAbility {
    tag: string = "GA.Mage.SunBlast";
    cancelTags: string[] = ["GA.Mage"]
    blockTags: string[];
    activationOwnedTags: string[] = ["State.Player.Skilling"]
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Player.BackJump", "State.Player.NotCancel"]
    targetRequiredTags: string[];
    targetBlockedTags: string[] = ["Club.Player", "State.Monster.Dead", "State.Monster.Invincible"];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];
    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Mage_SunBlast;
    cost: Constructor<CostByGameEffect> = GE_Cost_Mage_SunBlast;


    @MPropertiesInject(SkillHelper)
    private skillHelper: SkillHelper;

    @MPropertiesInject(EffectTool)
    private effectTool: EffectTool;

    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let char = owner as Character;
        let attrSpeed = asc.attributeSet.getAttr(EPlayerAttributeSetType.castSpeed).getCurrent();
        let aim = char.loadAnimation("285517");
        // let aim = char.loadAnimation("269040");
        aim.blendInTime = 0;
        aim.speed = 1.3 * attrSpeed;
        aim.blendOutMode = AnimationBlendMode.QuadraticInOut;
        let animTask = AT_PlayAnimation.New(this, aim, 1, char);

        this.skillHelper.changePlayerCanMove(char.player, false);


        animTask.addEvent(0.7, () => {
            EffectService.playAtPosition("270684", char.getSlotWorldPosition(HumanoidSlotType.Root), { scale: new Vector(4.5, 4.5, 0.5) });
            let arr = MathTool.checkHitByPosition(char, char.worldTransform.position, 300);
            arr.forEach((obj) => {
                let asc = obj.getComponent(AbilitySystemComponent);
                if (asc) {
                    if (asc.hasMatchingGameTag(this.targetBlockedTags)) return
                    this.sendGameEvent(this.owner, "Event.Player.HurtMonster", { target: char });
                    let force = obj.worldTransform.position.clone().subtract(char.worldTransform.position).normalize().multiply(2000);
                    this.sendGameEvent(obj, "Event.Monster.OnHurtAnim", { duringTime: 0.5, force: force });
                    this.sendGameEvent(obj, "Event.Monster.OnHurt", { damageGE: GE_Damage_Mage_SunBlast });
                }
            })
        })


        animTask.onFinished(() => {
            this.end();
        })

        animTask.activate()
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.skillHelper.changePlayerCanMove((owner as Character).player, true);
    }

}