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
    createNew<T extends JewelryBase>(owner:Player,aid:number):T{
        let as = owner.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;
        if(!as) return null;
        let jewelryConfig = GameConfig.JewelryObj.getElement(aid);
        if(!jewelryConfig) return null;
        if(JewelryManager.instance.jewelryMap.has(aid)){
            let jewelry = MFramework.createObject(JewelryManager.instance.jewelryMap.get(aid)) as T;
            jewelry.aid = aid;
            jewelry.owner = owner;
            jewelry.ownerAttribute = as;
            jewelry.uuid = UuidCreater.create();
            jewelry.init();
            return jewelry;
        }
        let jewelry = MFramework.createObject(JewelryBase) as T;
        jewelry.aid = aid;
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
        if(JewelryManager.instance.jewelryMap.has(data.aid)){
            let jewelry = MFramework.createObject(JewelryManager.instance.jewelryMap.get(data.aid)) as T;
            jewelry.aid = data.aid;
            jewelry.owner = owner;
            jewelry.ownerAttribute = as;
            jewelry.initByData(data);
            return jewelry;
        }
        let jewelry = MFramework.createObject(JewelryBase) as T;
        jewelry.aid = data.aid;
        jewelry.owner = owner;
        jewelry.ownerAttribute = as;
        jewelry.initByData(data);
        return jewelry;
    }

}