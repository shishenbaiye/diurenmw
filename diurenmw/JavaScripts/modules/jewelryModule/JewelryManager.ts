import { GameConfig } from "../../configs/GameConfig";
import { MSingletonPlugin, Constructor } from "../../framework/DI/MContainer";
import { MFramework } from "../../framework/MFramework";
import { MObject } from "../../framework/Object/MObject";
import { UuidCreater } from "../../tools/UuidCreater";
import { PlayerAttributeSet } from "../AttributeModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { JewelryBase } from "./JewelryBase";
import { JewelryData } from "./JewelryData";

@MSingletonPlugin()
export class JewelryManager extends MObject{
    static _jewelry:JewelryManager;
    static get instance():JewelryManager{
        if(!this._jewelry){
            this._jewelry = MFramework.createObject(JewelryManager);
        }
        return this._jewelry;
    }

    jewelryMap:Map<number,Constructor<JewelryBase>> = new Map<number,Constructor<JewelryBase>>();

    /**创建一件新防具 */
    createNew<T extends JewelryBase>(owner:Player,jid:number):T{
        let as = owner.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;
        if(!as) return null;
        let jewelryConfig = GameConfig.JewelryObj.getElement(jid);
        if(!jewelryConfig) return null;
        if(JewelryManager.instance.jewelryMap.has(jid)){
            let jewelry = MFramework.createObject(JewelryManager.instance.jewelryMap.get(jid)) as T;
            jewelry.jid = jid;
            jewelry.owner = owner;
            jewelry.ownerAttribute = as;
            jewelry.uuid = UuidCreater.create();
            jewelry.init();
            return jewelry;
        }
        let jewelry = MFramework.createObject(JewelryBase) as T;
        jewelry.jid = jid;
        jewelry.owner = owner;
        jewelry.ownerAttribute = as;
        jewelry.uuid = UuidCreater.create();
        jewelry.init();
        return jewelry;
    }

    /**通过UUid创建一个防具对象 */
    createByData<T extends JewelryBase>(owner:Player,data:JewelryData):T{
        let as = owner.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;
        if(!as) return null;
        if(JewelryManager.instance.jewelryMap.has(data.jid)){
            let jewelry = MFramework.createObject(JewelryManager.instance.jewelryMap.get(data.jid)) as T;
            jewelry.jid = data.jid;
            jewelry.owner = owner;
            jewelry.ownerAttribute = as;
            jewelry.initByData(data);
            return jewelry;
        }
        let jewelry = MFramework.createObject(JewelryBase) as T;
        jewelry.jid = data.jid;
        jewelry.owner = owner;
        jewelry.ownerAttribute = as;
        jewelry.initByData(data);
        return jewelry;
    }

}


export function registerJewelry(jid: number) {
    return function (target: any) {
        JewelryManager.instance.jewelryMap.set(jid, target);
    }
}