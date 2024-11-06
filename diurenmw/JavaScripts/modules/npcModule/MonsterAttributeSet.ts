import { GameEventBus } from "../../common/eventBus/EventBus";
import { AttributeDataInit } from "../gasModule/gameAbilitys/AS/AttributeHelper";
import { AttributeSet } from "../gasModule/gameAbilitys/AS/AttributeSet";
import { AttributeSetData } from "../gasModule/gameAbilitys/AS/AttributeSetData";
import { DamageDigit } from "../PlayerModule/ui/DamageDigit";

@Component
export class MonsterAttributeSet extends AttributeSet {

    @Property({ displayName: "等级", replicated: true, onChanged: "onLevelChanged" })
    public level: AttributeSetData;

    @Property({ displayName: "生命值", replicated: true, onChanged: "onHpChanged" })
    public hp: AttributeSetData;

    @Property({ displayName: "最大生命值", replicated: true, onChanged: "onMaxHpChanged" })
    public maxHp: AttributeSetData;

    @Property({ displayName: "魔法值", replicated: true, onChanged: "onMpChanged" })
    public mp: AttributeSetData;

    @Property({ displayName: "最大魔法值", replicated: true, onChanged: "onMaxMpChanged" })
    public maxMp: AttributeSetData;

    @Property({ displayName: "防御力", replicated: true, onChanged: "onDefChanged" })
    public def: AttributeSetData;

    @Property({ displayName: "攻击力", replicated: true, onChanged: "onAtkChanged" })
    public atk: AttributeSetData;

    //#region  属性处理

    preAttributeChange(attribute: AttributeSetData, newValue: number): void {
        // throw new Error("Method not implemented.");
    }
    postAttributeChange(attribute: AttributeSetData, oldValue: number, newValue: number): void {
        // throw new Error("Method not implemented.");
    }

    onLevelChanged(oldValue: number, newValue: number): void {
        // throw new Error("Method not implemented.");
    }

    onHpChanged(path: string, newValue: number, oldValue: number): void {
        //飘字
        DamageDigit.showObjDamage(oldValue - newValue, this.gameObject)
        //事件派发
        GameEventBus.emit("AttributeNpc_Change", `hp`, this.hp.getCurrent(), this.hp.ownerGameObjectId);


    }

    onMaxHpChanged(oldValue: number, newValue: number): void {
        //事件派发
        GameEventBus.emit("AttributeNpc_Change", `maxHp`, this.maxHp.getCurrent(), this.maxHp.ownerGameObjectId);
    }

    onMpChanged(oldValue: number, newValue: number): void {
        // throw new Error("Method not implemented.");
    }

    onMaxMpChanged(oldValue: number, newValue: number): void {
        // throw new Error("Method not implemented.");
    }

    onDefChanged(oldValue: number, newValue: number): void {
        // throw new Error("Method not implemented.");
    }

    onAtkChanged(oldValue: number, newValue: number): void {
        // throw new Error("Method not implemented.");
    }

    //#endregion

    protected onStart(): void {
        // 初始化
        AttributeDataInit(this, "level", 1);
        AttributeDataInit(this, "hp", 100000);
        AttributeDataInit(this, "maxHp", 100000);
        AttributeDataInit(this, "mp", 100000);
        AttributeDataInit(this, "maxMp", 100000);
        AttributeDataInit(this, "def", 100);
        AttributeDataInit(this, "atk", 100);

        InputUtil.onKeyDown(Keys.E, () => {
            DamageDigit.showObjDamage(999999, this.gameObject)
        });
    }




}