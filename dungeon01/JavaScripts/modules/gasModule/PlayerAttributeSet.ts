import { AttributeDataInit } from "./gameAbilitys/AS/AttributeHelper";
import { AttributeSet } from "./gameAbilitys/AS/AttributeSet";
import { AttributeSetData } from "./gameAbilitys/AS/AttributeSetData";

export class PlayerAttributeSet extends AttributeSet{

    @Property({displayName:"等级",replicated:true,onChanged:"onLevelChanged"})
    public level:AttributeSetData;

    @Property({displayName:"经验值",replicated:true,onChanged:"onExpChanged"})
    public exp:AttributeSetData;

    @Property({displayName:"生命值",replicated:true,onChanged:"onHpChanged"})
    public hp:AttributeSetData;

    @Property({displayName:"最大生命值",replicated:true,onChanged:"onMpChanged"})
    public maxHp:AttributeSetData;

    @Property({displayName:"魔法值",replicated:true,onChanged:"onMpChanged"})
    public mp:AttributeSetData;

    @Property({displayName:"最大魔法值",replicated:true,onChanged:"onMpChanged"})
    public maxMp:AttributeSetData;

    @Property({displayName:"攻击力",replicated:true,onChanged:"onAtkChanged"})
    public atk:AttributeSetData;

    @Property({displayName:"魔法攻击力",replicated:true,onChanged:"onAtkChanged"})
    public magicAtk:AttributeSetData;

    @Property({displayName:"防御力",replicated:true,onChanged:"onDefChanged"})
    public def:AttributeSetData;

    @Property({displayName:"速度",replicated:true,onChanged:"onSpdChanged"})
    public spd:AttributeSetData;

    @Property({displayName:"暴击率",replicated:true,onChanged:"onCritChanged"})
    public crit:AttributeSetData;

    @Property({displayName:"暴击伤害",replicated:true,onChanged:"onCritDamageChanged"})
    public critDamage:AttributeSetData;

    onLevelChanged(oldValue: number, newValue: number): void {
        console.log(`等级变化：${this.level.getCurrent()}`);
    }

    onExpChanged(oldValue: number, newValue: number): void {
        
    }

    onHpChanged(oldValue: number, newValue: number): void {
        
    }

    onMpChanged(oldValue: number, newValue: number): void {
        
    }

    onAtkChanged(oldValue: number, newValue: number): void {
        
    }

    onDefChanged(oldValue: number, newValue: number): void {
        
    }

    onSpdChanged(oldValue: number, newValue: number): void {
        
    }

    onCritChanged(oldValue: number, newValue: number): void {
        
    }

    onCritDamageChanged(oldValue: number, newValue: number): void {
        
    }

    onHitChanged(oldValue: number, newValue: number): void {
        
    }

    onDodgeChanged(oldValue: number, newValue: number): void {
        
    }

    
    preAttributeChange(attribute: AttributeSetData, newValue: number): void {
        
    }
    postAttributeChange(attribute: AttributeSetData, oldValue: number, newValue: number): void {
        
    }

    protected onStart(): void {
        
    }

}