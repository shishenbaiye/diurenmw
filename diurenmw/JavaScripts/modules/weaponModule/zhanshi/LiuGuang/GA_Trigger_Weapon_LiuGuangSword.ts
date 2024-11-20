import { CameraManager } from "../../../../camera/CameraManager";
import { Constructor, MPlugin, MPropertiesInject, RpcPlugin } from "../../../../framework/DI/MContainer";
import { EffectTool } from "../../../../tools/EffectTool";
import { MathTool } from "../../../../tools/MathTool";
import { PlayerAttributeSet } from "../../../AttributeModule/PlayerAttributeSet";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_WaitTime } from "../../../gasModule/gameAbilitys/AT/customAT/AT_WaitTime";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { EGameCustomModOp, EGameModOp } from "../../../gasModule/gameAbilitys/GE/GameEffectType";
import { GameModifierInfo } from "../../../gasModule/gameAbilitys/GE/GameModifierInfo";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { ModifierClass } from "../../../gasModule/gameAbilitys/GE/ModifierClass";
import { MonsterAttributeSet } from "../../../robotModule/base/MonsterAttributeSet";
import { EMonsterAttributeSetType } from "../../../robotModule/base/MonsterAttributeSetType";
import { GE_Damage_Base } from "../../../skillModule/common/GE_Damage_Base";
import { MI_Player_Damage_ModifierClass } from "../../../skillModule/common/MI_Player_Damage_ModifierClass";
import { GE_Damage_Warrior_Slash } from "../../../skillModule/warrior/slash/GE_Damage_Warrior_Slash";

@MPlugin()
export class GA_Trigger_Weapon_LiuGuangSword extends GameAbility {
    tag: string = "GA.Trigger.Weapon.LiuGuangSword";
    cancelTags: string[];
    blockTags: string[];
    activationOwnedTags: string[];
    activationRequiredTags: string[];
    activationBlockedTags: string[];
    targetRequiredTags: string[];
    targetBlockedTags: string[];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[] = [{
        tag: "Event.Player.HurtMonster",
        sourceType: EGameAbilityTriggerSourceType.GameEvent
    }]

    @MPropertiesInject(CameraManager)
    private cameraManager: CameraManager;

    @MPropertiesInject(RpcPlugin)
    private rpc: RpcPlugin;

    @MPropertiesInject(EffectTool)
    private effectTool: EffectTool;

    cd: Constructor<CoolDownByGameEffect>;
    cost: Constructor<CostByGameEffect>;
    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        if (!this.payload) return;
        let char = owner as Character;
        let customData = this.payload.customData;
        let targetChar = customData.target as Character;
        // 计算概率，百分之20的概率触发
        if (Math.random() > 0.02) return;

        let pos = targetChar.getSlotWorldPosition(HumanoidSlotType.Root);

        this.effectTool.playAtPosition("152218", pos, { scale: new Vector(1) });
        AT_WaitTime.New(this, 0.6).addEndListener(() => {
            this.rpc.client(char.player, this, this.C_ShakeCamera, 0.3, 2);
            let arr = MathTool.checkHitByPosition(owner as Character, pos, 333);
            arr.forEach((obj: Character) => {
                let asc = obj.getComponent(AbilitySystemComponent);
                if (asc) {
                    this.sendGameEvent(obj, "Event.Monster.OnHurt", { damageGE: GE_Damage_Warrior_Slash });
                    this.sendGameEvent(obj, "Event.Monster.OnHurtAnim", { onHurtType: "Crit" });
                }
            })
            this.end();
        }).activate();

    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }
    C_ShakeCamera(time: number, str: number) {
        this.cameraManager.shakeCamera(time, str, str, 100, 100);
    }
}



@MPlugin()
export class GE_Damage_Weapon_LiuGuangSword extends GE_Damage_Base {
    init(): void {
        super.init();

        let modifier1 = MI_Weapon_LiuGuangSword_GameModifiterInfo.New();
        modifier1.ownerEffect = this;
        modifier1.init();
        if (!this.modifiers) {
            this.modifiers = [];
        }
        this.modifiers.push(modifier1)
    }
}

export class MI_Weapon_LiuGuangSword_GameModifiterInfo extends GameModifierInfo {

    static New(): MI_Weapon_LiuGuangSword_GameModifiterInfo {
        return new MI_Weapon_LiuGuangSword_GameModifiterInfo();
    }

    modifierName: string = EMonsterAttributeSetType.hp;
    modifierOp: EGameModOp = EGameModOp.Custom;
    modifierValue: number;
    modifierClass: ModifierClass;
    sourceMustNeedTags: string[];
    sourceMustNotNeedTags: string[];
    targetMustNeedTags: string[];
    targetMustNotNeedTags: string[];

    init(): void {
        this.modifierClass = MI_Weapon_LiuGuangSword_ModifierClass.New({ value: 5000 });
    }

}


export class MI_Weapon_LiuGuangSword_ModifierClass extends ModifierClass {

    customData: { value: number };
    static New(data: any): MI_Player_Damage_ModifierClass {
        let obj = new MI_Player_Damage_ModifierClass();
        obj.customData = data;
        return obj;
    }

    modifyOp: EGameCustomModOp = EGameCustomModOp.Subtract;
    customModifyFunction(sourceModifierInfo: GameModifierInfo, context: { sourceASC: AbilitySystemComponent; targetASC: AbilitySystemComponent; }): number {
        let sourceAttr = context.sourceASC.attributeSet as PlayerAttributeSet;
        let targetAttr = context.targetASC.attributeSet as MonsterAttributeSet;
        let damage = MathTool.damageFormula(1, this.customData.value / 100,
            sourceAttr.getAttr(EPlayerAttributeSetType.atk).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.matk).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.str).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.int).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.damage).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.skillDamage).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.crit).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.critDamage).getCurrent()
        )

        let finalDamage = MathTool.calculateActualDamage(damage.damage,
            targetAttr.getAttr(EMonsterAttributeSetType.def).getCurrent(),
            targetAttr.getAttr(EMonsterAttributeSetType.level).getCurrent()
        );
        (sourceModifierInfo.ownerEffect as GE_Damage_Base).isCrit = damage.isCrit;
        (sourceModifierInfo.ownerEffect as GE_Damage_Base).damageValue = finalDamage;
        return finalDamage;
    }

}