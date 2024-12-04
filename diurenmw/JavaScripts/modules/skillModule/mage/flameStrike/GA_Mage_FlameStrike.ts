import { Constructor, MPlugin, MPropertiesInject } from "../../../../framework/DI/MContainer";
import { MFramework } from "../../../../framework/MFramework";
import { EffectTool } from "../../../../tools/EffectTool";
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
import { FlameStrikeObj } from "./FlameStrikeObj";
import { GE_CoolDown_Mage_FlameStrike } from "./GE_CoolDown_Mage_FlameStrike";
import { GE_Cost_Mage_FlameStrike } from "./GE_Cost_Mage_FlameStrike";



@MPlugin()
@RegisterSkill(2004, ESkillType.Staff)
export class GA_Mage_FlameStrike extends GameAbility {
    tag: string = "GA.Mage.FlameStrike";
    cancelTags: string[] = ["GA.Mage"]
    blockTags: string[];
    activationOwnedTags: string[] = ["State.Player.Skilling"]
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Player.BackJump", "State.Player.NotCancel"]
    targetRequiredTags: string[];
    targetBlockedTags: string[] = ["Club.Player", "State.Monster.Dead", "State.Monster.Invincible"];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];
    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Mage_FlameStrike;
    cost: Constructor<CostByGameEffect> = GE_Cost_Mage_FlameStrike;


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
        let aim = char.loadAnimation("269224");
        // let aim = char.loadAnimation("269040");
        aim.blendInTime = 0;
        aim.speed = 1.1 * attrSpeed;
        aim.blendOutMode = AnimationBlendMode.QuadraticInOut;
        let animTask = AT_PlayAnimation.New(this, aim, 1, char);

        this.skillHelper.changePlayerCanMove(char.player, false);

        
        animTask.addEvent(0.2, () => {
            EffectService.playAtPosition("219368", char.getSlotWorldPosition(HumanoidSlotType.Root),{scale:new Vector(1.5)})
        })

        animTask.addEvent(0.5, () => {
            let pos = char.getSlotWorldPosition(HumanoidSlotType.Root).clone().add(char.worldTransform.getForwardVector().normalized.multiply(500));
            let flameStrikeObj = MFramework.createObject(FlameStrikeObj) as FlameStrikeObj;
            flameStrikeObj.init(pos, char, asc, this);
            flameStrikeObj.activate();
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