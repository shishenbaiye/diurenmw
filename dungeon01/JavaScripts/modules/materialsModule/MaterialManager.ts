import { GameConfig } from "../../configs/GameConfig";
import { Constructor, MSingletonPlugin } from "../../framework/DI/MContainer";
import { MFramework } from "../../framework/MFramework";
import { MObject } from "../../framework/Object/MObject";
import { UuidCreater } from "../../tools/UuidCreater";
import { PlayerAttributeSet } from "../AttributeModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { MaterialBase } from "./MaterialBase";
import { MaterialData } from "./MaterialData";

@MSingletonPlugin()
export class MaterialManager extends MObject {
    static _MaterialManager: MaterialManager;
    static get instance(): MaterialManager {
        if (!this._MaterialManager) {
            this._MaterialManager = MFramework.createObject(MaterialManager);
        }
        return this._MaterialManager;
    }

    MaterialMap: Map<number, Constructor<MaterialBase>> = new Map<number, Constructor<MaterialBase>>();

    /**创建一件新材料 */
    createNew<T extends MaterialBase>(owner: Player, id: number): T {
        let as = owner.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;
        if (!as) return null;
        let MaterialConfig = GameConfig.MaterialsObj.getElement(id);
        if (!MaterialConfig) return null;
        if (MaterialManager.instance.MaterialMap.has(id)) {
            let Material = MFramework.createObject(MaterialManager.instance.MaterialMap.get(id)) as T;
            Material.id = id;
            Material.owner = owner;
            Material.ownerAttribute = as;
            Material.uuid = UuidCreater.create();
            Material.init();
            return Material;
        }
        let Material = MFramework.createObject(MaterialBase) as T;
        Material.id = id;
        Material.owner = owner;
        Material.ownerAttribute = as;
        Material.uuid = UuidCreater.create();
        Material.init();
        return Material;
    }

    /**通过UUid创建一个材料对象 */
    createByData<T extends MaterialBase>(owner: Player, data: MaterialData): T {
        let as = owner.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;
        if (!as) return null;
        if (MaterialManager.instance.MaterialMap.has(data.id)) {
            let Material = MFramework.createObject(MaterialManager.instance.MaterialMap.get(data.id)) as T;
            Material.id = data.id;
            Material.num = data.num;
            Material.owner = owner;
            Material.ownerAttribute = as;
            Material.initByData(data);
            return Material;
        }
        let Material = MFramework.createObject(MaterialBase) as T;
        Material.id = data.id;
        Material.num = data.num;
        Material.owner = owner;
        Material.ownerAttribute = as;
        Material.initByData(data);
        return Material;
    }
}


export function registerMaterial(id: number) {
    return function (target: any) {
        MaterialManager.instance.MaterialMap.set(id, target);
    }
}