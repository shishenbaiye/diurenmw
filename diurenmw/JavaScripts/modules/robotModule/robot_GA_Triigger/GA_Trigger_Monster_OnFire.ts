import { MPlugin, MPropertiesInject, MSingletonPlugin } from "../../../framework/DI/MContainer";
import { MathTool } from "../../../tools/MathTool";
import { Constructor } from "../../../tools/Singleton";
import { PlayerAttributeSet } from "../../AttributeModule/PlayerAttributeSet";
import { EPlayerAttributeSetType } from "../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GameAbility } from "../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../gasModule/gameAbilitys/GA/GameAbilityType";
import { EGameCustomModOp, EGameModOp } from "../../gasModule/gameAbilitys/GE/GameEffectType";
import { GameModifierInfo } from "../../gasModule/gameAbilitys/GE/GameModifierInfo";
import { CoolDownByGameEffect } from "../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { ModifierClass } from "../../gasModule/gameAbilitys/GE/ModifierClass";
import { GE_Damage_Base } from "../../skillModule/common/GE_Damage_Base";
import { MonsterAttributeSet } from "../base/MonsterAttributeSet";
import { EMonsterAttributeSetType } from "../base/MonsterAttributeSetType";

@MSingletonPlugin()
class MonsterFireManager {
    private monsterMap: Map<Character, MonsterFire> = new Map();


    addFire(source: Character, asc: AbilitySystemComponent, monster: Character, damageValue: number = 10, time: number = 5) {
        if (!this.monsterMap.has(monster)) {
            let blood = new MonsterFire(monster);
            this.monsterMap.set(monster, blood);
        }

        let blood = this.monsterMap.get(monster);
        blood.add(source, asc, damageValue, time);
    }
}

class MonsterFire {
    private monster: Character;
    constructor(monster: Character) {
        this.monster = monster;
    }

    private bloodStateMap: Map<Character, FireState> = new Map();

    add(source: Character, asc: AbilitySystemComponent, damageValue: number, time: number) {
        if (!this.bloodStateMap.has(source)) {
            let blood = new FireState(source, asc, this.monster);
            this.bloodStateMap.set(source, blood);
        }
        let blood = this.bloodStateMap.get(source);
        blood.addFire(damageValue, time);
    }
}


class FireState {
    private source: Character;
    private asc: AbilitySystemComponent;
    private monster: Character;
    private iid: number = null;
    private blood: number = 0;
    private maxFire: number = 10; // 最大叠加层数
    private timeLine: { damage: number, time: number }[] = [];
    constructor(source: Character, asc: AbilitySystemComponent, monster: Character) {
        this.source = source;
        this.asc = asc;
        this.monster = monster;
    }

    addFire(damage: number, time: number) {
        this.blood++;
        if (this.blood > this.maxFire) {
            this.blood = this.maxFire;
        }
        this.timeLine.push({ damage: damage, time: time });
        if (this.iid == null) {
            this.iid = TimeUtil.setInterval(this.update.bind(this), 1);
        }
    }

    update() {
        // 特效播放
        EffectService.playOnGameObject("107533", this.monster, { scale: new Vector(3) })
        let totalDamage = 0;
        this.timeLine.forEach((time: { damage: number, time: number }, index: number) => {
            time.time -= 1;
            totalDamage += time.damage;
        })
        // 伤害计算
        let geInstance = this.asc.makeOutGoingGameEffect(GE_Damage_Monster_OnFire) as GE_Damage_Monster_OnFire;
        geInstance.damageValue = totalDamage;
        this.asc.applyGameEffectInstanceToTarget(geInstance, this.monster);

        // 层数清理
        this.timeLine = this.timeLine.filter((time: { damage: number, time: number }) => {
            return time.time > 0;
        })
        this.blood = this.timeLine.length;
        if (this.blood <= 0) {
            TimeUtil.clearInterval(this.iid);
            this.iid = null;
        }
    }
}

@MPlugin()
export class GE_Damage_Monster_OnFire extends GE_Damage_Base {

    damageValue: number = 0;
    init(): void {
        super.init();

        let modifier1 = MI_Monster_OnFire_GameModifiterInfo.New();
        modifier1.ownerEffect = this;
        modifier1.damageValue = this.damageValue;
        modifier1.init();
        if (!this.modifiers) {
            this.modifiers = [];
        }
        this.modifiers.push(modifier1)
    }
}

export class MI_Monster_OnFire_GameModifiterInfo extends GameModifierInfo {

    static New(): MI_Monster_OnFire_GameModifiterInfo {
        return new MI_Monster_OnFire_GameModifiterInfo();
    }
    damageValue: number = 0;

    modifierName: string = EMonsterAttributeSetType.hp;
    modifierOp: EGameModOp = EGameModOp.Custom;
    modifierValue: number;
    modifierClass: ModifierClass;
    sourceMustNeedTags: string[];
    sourceMustNotNeedTags: string[];
    targetMustNeedTags: string[];
    targetMustNotNeedTags: string[] = ["State.Monster.Dead", "State.Monster.Invincible"];

    init(): void {
        this.modifierClass = MI_Monster_OnFire_ModifierClass.New({ value: this.damageValue });
    }

}


export class MI_Monster_OnFire_ModifierClass extends ModifierClass {

    customData: { value: number };
    static New(data: any): MI_Monster_OnFire_ModifierClass {
        let obj = new MI_Monster_OnFire_ModifierClass();
        obj.customData = data;
        return obj;
    }

    modifyOp: EGameCustomModOp = EGameCustomModOp.Subtract;
    customModifyFunction(sourceModifierInfo: GameModifierInfo, context: { sourceASC: AbilitySystemComponent; targetASC: AbilitySystemComponent; }): number {
        let sourceAttr = context.sourceASC.attributeSet as PlayerAttributeSet;
        let targetAttr = context.targetASC.attributeSet as MonsterAttributeSet;
        let damage = MathTool.damageFormula(3, this.customData.value / 100,
            sourceAttr.getAttr(EPlayerAttributeSetType.atk).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.matk).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.str).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.int).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.damage).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.skillDamage).getCurrent(),
            0,
            0
        )

        if (context.sourceASC.hasMatchingGameTag(["Weapon.SpecialEffect.KeXue.AddFireDamage50"])) {
            damage.damage *= 1.5;
        }

        let finalDamage = MathTool.calculateActualDamage(damage.damage,
            targetAttr.getAttr(EMonsterAttributeSetType.def).getCurrent(),
            targetAttr.getAttr(EMonsterAttributeSetType.level).getCurrent()
        );

        (sourceModifierInfo.ownerEffect as GE_Damage_Base).isCrit = damage.isCrit;
        (sourceModifierInfo.ownerEffect as GE_Damage_Base).damageValue = finalDamage;
        return finalDamage;
    }

}


@MPlugin()
export class GA_Trigger_Monster_OnFire extends GameAbility {
    tag: string = "GA.Trigger.Monster.OnFire";
    cancelTags: string[];
    blockTags: string[];
    activationOwnedTags: string[];
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Monster.Dead", "State.Monster.Invincible"];
    targetRequiredTags: string[];
    targetBlockedTags: string[];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[] = [
        {
            tag: "Event.Monster.OnFire",
            sourceType: EGameAbilityTriggerSourceType.GameEvent
        }
    ]
    cd: Constructor<CoolDownByGameEffect>;
    cost: Constructor<CostByGameEffect>;

    @MPropertiesInject(MonsterFireManager)
    private bloodManager: MonsterFireManager;

    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let payload = this.payload;
        if (!payload) return;
        let damageValue = payload.customData.damageValue ? payload.customData.damageValue : 10;
        let time = payload.customData.time ? payload.customData.time : 5;
        let soucre = payload.source as Character;
        let soucreAsc = soucre.getComponent(AbilitySystemComponent);
        if (!soucreAsc) return;
        this.bloodManager.addFire(soucre, soucreAsc, owner as Character, damageValue, time);
        this.end();
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }

}