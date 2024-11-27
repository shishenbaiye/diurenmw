import { GameConfig } from "../../configs/GameConfig";
import { Constructor, MSingletonPlugin } from "../../framework/DI/MContainer";
import { MFramework } from "../../framework/MFramework";
import { MObject } from "../../framework/Object/MObject";
import { UuidCreater } from "../../tools/UuidCreater";
import { PlayerAttributeSet } from "../AttributeModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { ConsumableBase } from "./ConsumableBase";
import { ConsumableData } from "./ConsumableData";

@MSingletonPlugin()
export class ConsumableManager extends MObject {
    static _ConsumableManager: ConsumableManager;
    static get instance(): ConsumableManager {
        if (!this._ConsumableManager) {
            this._ConsumableManager = MFramework.createObject(ConsumableManager);
        }
        return this._ConsumableManager;
    }

    ConsumableMap: Map<number, Constructor<ConsumableBase>> = new Map<number, Constructor<ConsumableBase>>();

    /**创建一件新消耗品 */
    createNew<T extends ConsumableBase>(owner: Player, id: number): T {
        let as = owner.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;
        if (!as) return null;
        let ConsumableConfig = GameConfig.ConsumablesObj.getElement(id);
        if (!ConsumableConfig) return null;
        if (ConsumableManager.instance.ConsumableMap.has(id)) {
            let Consumable = MFramework.createObject(ConsumableManager.instance.ConsumableMap.get(id)) as T;
            Consumable.id = id;
            Consumable.owner = owner;
            Consumable.ownerAttribute = as;
            Consumable.uuid = UuidCreater.create();
            Consumable.init();
            return Consumable;
        }
        let Consumable = MFramework.createObject(ConsumableBase) as T;
        Consumable.id = id;
        Consumable.owner = owner;
        Consumable.ownerAttribute = as;
        Consumable.uuid = UuidCreater.create();
        Consumable.init();
        return Consumable;
    }

    /**通过UUid创建一个消耗品对象 */
    createByData<T extends ConsumableBase>(owner: Player, data: ConsumableData): T {
        let as = owner.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;
        if (!as) return null;
        if (ConsumableManager.instance.ConsumableMap.has(data.id)) {
            let Consumable = MFramework.createObject(ConsumableManager.instance.ConsumableMap.get(data.id)) as T;
            Consumable.id = data.id;
            Consumable.num = data.num;
            Consumable.owner = owner;
            Consumable.ownerAttribute = as;
            Consumable.initByData(data);
            return Consumable;
        }
        let Consumable = MFramework.createObject(ConsumableBase) as T;
        Consumable.id = data.id;
        Consumable.num = data.num;
        Consumable.owner = owner;
        Consumable.ownerAttribute = as;
        Consumable.initByData(data);
        return Consumable;
    }
}


export function registerConsumable(id: number) {
    return function (target: any) {
        ConsumableManager.instance.ConsumableMap.set(id, target);
    }
}