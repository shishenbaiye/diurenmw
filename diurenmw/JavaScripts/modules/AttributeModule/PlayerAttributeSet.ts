import { AttributeSet } from "../gasModule/gameAbilitys/AS/AttributeSet";
import { AttributeSetData } from "../gasModule/gameAbilitys/AS/AttributeSetData";

@Component
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

    @Property({displayName:"力量",replicated:true,onChanged:"onStrChanged"})
    public str:AttributeSetData;

    @Property({displayName:"智力",replicated:true,onChanged:"onIntChanged"})
    public int:AttributeSetData;

    @Property({displayName:"体力",replicated:true,onChanged:"onVitChanged"})
    public vit:AttributeSetData;

    @Property({displayName:"物理攻击力",replicated:true,onChanged:"onAtkChanged"})
    public atk:AttributeSetData;

    @Property({displayName:"魔法攻击力",replicated:true,onChanged:"onMAtkChanged"})
    public magicAtk:AttributeSetData;

    @Property({displayName:"防御力",replicated:true,onChanged:"onDefChanged"})
    public def:AttributeSetData;

    // @Property({displayName:"速度",replicated:true,onChanged:"onSpdChanged"})
    // public spd:AttributeSetData;
    @Property({displayName:"技能伤害增加率",replicated:true,onChanged:"onSkillDamageChanged"})
    public skillDamage:AttributeSetData;

    @Property({displayName:"伤害增加率",replicated:true,onChanged:"onDamageChanged"})
    public damage:AttributeSetData;

    @Property({displayName:"暴击率",replicated:true,onChanged:"onCritChanged"})
    public crit:AttributeSetData;

    @Property({displayName:"暴击伤害",replicated:true,onChanged:"onCritDamageChanged"})
    public critDamage:AttributeSetData;

    onLevelChanged(oldValue: number, newValue: number): void {
        console.log(`等级变化：${this.level.getCurrent()}`);
    }

    onExpChanged(oldValue: number, newValue: number): void {
        console.log(`经验值变化：${this.exp.getCurrent()}`);
    }

    
    preAttributeChange(attribute: AttributeSetData, newValue: number): void {
        
    }
    postAttributeChange(attribute: AttributeSetData, oldValue: number, newValue: number): void {
        
    }

    /**计算数值 */
    refreshAttribute(): void {
        // 计算血量
        let addHpValue = this.vit.getCurrent() * 5;
        let maxHpValue = this.hp.getCurrent() + addHpValue;
        this.maxHp.setCurrent(maxHpValue);
    }

    addSkillDamage(value: number): void {
        let currentSkillDamage = this.skillDamage.getCurrent();
        let newSkillDamage = currentSkillDamage * value;
        this.skillDamage.setCurrent(newSkillDamage);
    }

    addDamage(value: number): void {
        let currentDamage = this.damage.getCurrent();
        let newDamage = currentDamage + value;
        this.damage.setCurrent(newDamage);
    }

    addCritDamage(value: number): void {
        let currentCritDamage = this.critDamage.getCurrent();
        let newCritDamage = currentCritDamage + value;
        this.critDamage.setCurrent(newCritDamage);
    }

    protected onStart(): void {
        
    }

}