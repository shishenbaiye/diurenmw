import { GameConfig } from "../../configs/GameConfig";
import { Constructor, MSingletonPlugin } from "../../framework/DI/MContainer";
import { MFramework } from "../../framework/MFramework";
import { MObject } from "../../framework/Object/MObject";
import { UuidCreater } from "../../tools/UuidCreater";
import { PlayerAttributeSet } from "../AttributeModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { ArmorBase } from "./ArmorBase";
import { ArmorData } from "./ArmorData";

@MSingletonPlugin()
export class ArmorManager extends MObject{
    static _armor:ArmorManager;
    static get instance():ArmorManager{
        if(!this._armor){
            this._armor = MFramework.createObject(ArmorManager);
        }
        return this._armor;
    }

    armorMap:Map<number,Constructor<ArmorBase>> = new Map<number,Constructor<ArmorBase>>();

    /**创建一件新防具 */
    createNew<T extends ArmorBase>(owner:Player,aid:number):T{
        let as = owner.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;
        if(!as) return null;
        let armorConfig = GameConfig.ArmorObj.getElement(aid);
        if(!armorConfig) return null;
        if(ArmorManager.instance.armorMap.has(aid)){
            let armor = MFramework.createObject(ArmorManager.instance.armorMap.get(aid)) as T;
            armor.aid = aid;
            armor.owner = owner;
            armor.ownerAttribute = as;
            armor.uuid = UuidCreater.create();
            armor.init();
            return armor;
        }
        let armor = MFramework.createObject(ArmorBase) as T;
        armor.aid = aid;
        armor.owner = owner;
        armor.ownerAttribute = as;
        armor.uuid = UuidCreater.create();
        armor.init();
        return armor;
    }

    /**通过UUid创建一个防具对象 */
    createByData<T extends ArmorBase>(owner:Player,data:ArmorData):T{
        let as = owner.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;
        if(!as) return null;
        if(ArmorManager.instance.armorMap.has(data.aid)){
            let armor = MFramework.createObject(ArmorManager.instance.armorMap.get(data.aid)) as T;
            armor.aid = data.aid;
            armor.owner = owner;
            armor.ownerAttribute = as;
            armor.initByData(data);
            return armor;
        }
        let armor = MFramework.createObject(ArmorBase) as T;
        armor.aid = data.aid;
        armor.owner = owner;
        armor.ownerAttribute = as;
        armor.initByData(data);
        return armor;
    }

}