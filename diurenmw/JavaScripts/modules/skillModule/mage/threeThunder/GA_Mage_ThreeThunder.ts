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
import { SkillHelper } from "../../SkillHelper";
import { RegisterSkill } from "../../SkillManager";
import { ESkillType } from "../../SkillType";
import { GE_CoolDown_Mage_ThreeThunder } from "./GE_CoolDown_Mage_ThreeThunder";
import { GE_Cost_Mage_ThreeThunder } from "./GE_Cost_Mage_ThreeThunder";
import { GE_Damage_Mage_ThreeThunder } from "./GE_Damage_Mage_ThreeThunder";



@MPlugin()
@RegisterSkill(2006, ESkillType.Staff)
export class GA_Mage_ThreeThunder extends GameAbility {
    tag: string = "GA.Mage.ThreeThunder";
    cancelTags: string[] = ["GA.Mage"]
    blockTags: string[];
    activationOwnedTags: string[] = ["State.Player.Skilling"]
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Player.BackJump", "State.Player.NotCancel"]
    targetRequiredTags: string[];
    targetBlockedTags: string[] = ["Club.Player", "State.Monster.Dead", "State.Monster.Invincible"];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];
    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Mage_ThreeThunder;
    cost: Constructor<CostByGameEffect> = GE_Cost_Mage_ThreeThunder;


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

        let animTask = AT_PlayAnimation.New(this, aim, 1, char);

        this.skillHelper.changePlayerCanMove(char.player, false);

        animTask.addEvent(0.2, () => {
            EffectService.playAtPosition("219368", char.getSlotWorldPosition(HumanoidSlotType.Root),{scale:new Vector(1.5)})
        })

        let pos1 = char.getSlotWorldPosition(HumanoidSlotType.Root).clone().add(char.worldTransform.getForwardVector().normalized.multiply(300));
        let pos2 = char.getSlotWorldPosition(HumanoidSlotType.Root).clone().add(char.worldTransform.getForwardVector().normalized.multiply(600));
        let pos3 = char.getSlotWorldPosition(HumanoidSlotType.Root).clone().add(char.worldTransform.getForwardVector().normalized.multiply(900));

        animTask.addEvent(0.5, () => {
            this.effectTool.playAtPosition("295654",pos1,{scale:new Vector(0.5),color:new LinearColor(63/255,149/255,1)});
        })
        animTask.addEvent(0.55,()=>{
            let arr = MathTool.checkHitByPosition(char,pos1,150);
            arr.forEach((monster) => {
                let asc = monster.getComponent(AbilitySystemComponent);
                if (asc) {
                    if (asc.hasMatchingGameTag(this.targetBlockedTags)) return
                    this.sendGameEvent(this.owner, "Event.Player.HurtMonster", { target: monster });
                    let force = monster.worldTransform.position.clone().subtract(char.worldTransform.position).normalize().multiply(300);
                    this.sendGameEvent(monster, "Event.Monster.OnHurtAnim", { duringTime: 0.5, force: force });
                    this.sendGameEvent(monster, "Event.Monster.OnHurt", { damageGE: GE_Damage_Mage_ThreeThunder });
                }
            })
        })

        animTask.addEvent(0.6, () => {
            this.effectTool.playAtPosition("295654",pos2,{scale:new Vector(0.5),color:new LinearColor(63/255,149/255,1)});
        })
        animTask.addEvent(0.65,()=>{
            let arr = MathTool.checkHitByPosition(char,pos2,150);
            arr.forEach((monster) => {
                let asc = monster.getComponent(AbilitySystemComponent);
                if (asc) {
                    if (asc.hasMatchingGameTag(this.targetBlockedTags)) return
                    this.sendGameEvent(this.owner, "Event.Player.HurtMonster", { target: monster });
                    let force = monster.worldTransform.position.clone().subtract(char.worldTransform.position).normalize().multiply(300);
                    this.sendGameEvent(monster, "Event.Monster.OnHurtAnim", { duringTime: 0.5, force: force });
                    this.sendGameEvent(monster, "Event.Monster.OnHurt", { damageGE: GE_Damage_Mage_ThreeThunder });
                }
            })
        })

        animTask.addEvent(0.7, () => {
            this.effectTool.playAtPosition("295654",pos3,{scale:new Vector(0.5),color:new LinearColor(63/255,149/255,1)});
        })
        animTask.addEvent(0.75,()=>{
            let arr = MathTool.checkHitByPosition(char,pos3,150);
            arr.forEach((monster) => {
                let asc = monster.getComponent(AbilitySystemComponent);
                if (asc) {
                    if (asc.hasMatchingGameTag(this.targetBlockedTags)) return
                    this.sendGameEvent(this.owner, "Event.Player.HurtMonster", { target: monster });
                    let force = monster.worldTransform.position.clone().subtract(char.worldTransform.position).normalize().multiply(300);
                    this.sendGameEvent(monster, "Event.Monster.OnHurtAnim", { duringTime: 0.5, force: force });
                    this.sendGameEvent(monster, "Event.Monster.OnHurt", { damageGE: GE_Damage_Mage_ThreeThunder });
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