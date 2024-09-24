import { AttributeSet } from "../gasModule/gameAbilitys/AS/AttributeSet";
import { AttributeSetData } from "../gasModule/gameAbilitys/AS/AttributeSetData";
import { AttributeModuleC } from "./AttributeModuleC";

@Component
export class PlayerAttributeSet extends AttributeSet {

    @Property({ displayName: "等级", replicated: true, onChanged: "onLevelChanged" })
    public level: AttributeSetData;

    @Property({ displayName: "经验值", replicated: true, onChanged: "onExpChanged" })
    public exp: AttributeSetData;

    @Property({ displayName: "生命值", replicated: true, onChanged: "onHpChanged" })
    public hp: AttributeSetData;

    @Property({ displayName: "最大生命值", replicated: true, onChanged: "onMaxHpChanged" })
    public maxHp: AttributeSetData;

    @Property({ displayName: "魔法值", replicated: true, onChanged: "onMpChanged" })
    public mp: AttributeSetData;

    @Property({ displayName: "最大魔法值", replicated: true, onChanged: "onMaxMpChanged" })
    public maxMp: AttributeSetData;

    @Property({ displayName: "力量", replicated: true, onChanged: "onStrChanged" })
    public str: AttributeSetData;

    @Property({ displayName: "智力", replicated: true, onChanged: "onIntChanged" })
    public int: AttributeSetData;

    @Property({ displayName: "体力", replicated: true, onChanged: "onVitChanged" })
    public vit: AttributeSetData;

    @Property({ displayName: "物理攻击力", replicated: true, onChanged: "onAtkChanged" })
    public atk: AttributeSetData;

    @Property({ displayName: "魔法攻击力", replicated: true, onChanged: "onMAtkChanged" })
    public magicAtk: AttributeSetData;

    @Property({ displayName: "防御力", replicated: true, onChanged: "onDefChanged" })
    public def: AttributeSetData;

    // @Property({displayName:"速度",replicated:true,onChanged:"onSpdChanged"})
    // public spd:AttributeSetData;
    @Property({ displayName: "技能伤害增加率", replicated: true, onChanged: "onSkillDamageChanged" })
    public skillDamage: AttributeSetData;

    @Property({ displayName: "伤害增加率", replicated: true, onChanged: "onDamageChanged" })
    public damage: AttributeSetData;

    @Property({ displayName: "暴击率", replicated: true, onChanged: "onCritChanged" })
    public crit: AttributeSetData;

    @Property({ displayName: "暴击伤害", replicated: true, onChanged: "onCritDamageChanged" })
    public critDamage: AttributeSetData;

    onLevelChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("level", this.level.getCurrent(),this.level.ownerGameObjectId);
    }

    onExpChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("exp", this.exp.getCurrent(),this.exp.ownerGameObjectId);
    }

    onHpChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("hp", this.hp.getCurrent(),this.hp.ownerGameObjectId);
    }

    onMaxHpChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("maxHp", this.maxHp.getCurrent(),this.maxHp.ownerGameObjectId);
    }

    onMpChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("mp", this.mp.getCurrent(),this.mp.ownerGameObjectId);
    }

    onMaxMpChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("maxMp", this.maxMp.getCurrent(),this.maxMp.ownerGameObjectId);
    }

    onStrChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("str", this.str.getCurrent(),this.str.ownerGameObjectId);
    }

    onIntChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("int", this.int.getCurrent(),this.int.ownerGameObjectId);
    }

    onVitChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("vit", this.vit.getCurrent(),this.vit.ownerGameObjectId);
    }

    onAtkChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("atk", this.atk.getCurrent(),this.atk.ownerGameObjectId);
    }

    onMAtkChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("matk", this.magicAtk.getCurrent(),this.magicAtk.ownerGameObjectId);
    }

    onDefChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("def", this.def.getCurrent(),this.def.ownerGameObjectId);
    }

    onSkillDamageChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("skillDamage", this.skillDamage.getCurrent(),this.skillDamage.ownerGameObjectId);
    }

    onDamageChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("damage", this.damage.getCurrent(),this.damage.ownerGameObjectId);
    }

    onCritChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("crit", this.crit.getCurrent(),this.crit.ownerGameObjectId);
    }

    onCritDamageChanged(oldValue: number, newValue: number): void {
        ModuleService.getModule(AttributeModuleC).onChangeAttribute("critDamage", this.critDamage.getCurrent(),this.critDamage.ownerGameObjectId);
    }






    preAttributeChange(attribute: AttributeSetData, newValue: number): void {

    }
    postAttributeChange(attribute: AttributeSetData, oldValue: number, newValue: number): void {
        if (attribute.name == "vit") {
            this.refreshAttribute(true);
        }
    }

    /**计算数值 */
    refreshAttribute(isStart: boolean = true): void {
        // 计算血量
        if (isStart) {
            let addHpValue = this.vit.getCurrent() * 5;
            let maxHpValue = this.maxHp.getBase() + addHpValue;
            this.hp.setCurrent(maxHpValue);
            this.maxHp.setCurrent(maxHpValue);
        } else {
            let addHpValue = this.vit.getCurrent() * 5;
            let maxHpValue = this.maxHp.getBase() + addHpValue;
            this.maxHp.setCurrent(maxHpValue);
            if (this.hp.getCurrent() > maxHpValue) {
                this.hp.setCurrent(maxHpValue);
            }
        }

    }
    /**增加技能攻击力
     * @param value 增加的数值 0.1表示增加10%
     */
    addSkillDamage(value: number): void {
        let currentSkillDamage = this.skillDamage.getCurrent();
        let newSkillDamage = currentSkillDamage * (1 + value);
        this.skillDamage.setCurrent(newSkillDamage);
    }

    /**增加伤害加成
     * @param value 增加的数值 0.1表示增加10%
     */
    addDamage(value: number): void {
        let currentDamage = this.damage.getCurrent();
        let newDamage = currentDamage + value;
        this.damage.setCurrent(newDamage);
    }

    /**增加暴击率
     * @param value 增加的数值 0.1表示增加10%
     */
    addCritDamage(value: number): void {
        let currentCritDamage = this.critDamage.getCurrent();
        let newCritDamage = currentCritDamage + value;
        this.critDamage.setCurrent(newCritDamage);
    }

    protected onStart(): void {

    }

}