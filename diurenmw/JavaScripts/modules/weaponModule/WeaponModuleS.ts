import { GameEventBus } from "../../common/eventBus/EventBus";
import { UuidCreater } from "../../tools/UuidCreater";
import { PlayerAttributeSet } from "../AttributeModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { WeaponModuleC } from "./WeaponModuleC";
import { WeaponModuleData } from "./WeaponModuleData";

export class WeaponModuleS extends ModuleS<WeaponModuleC,WeaponModuleData> {
    protected onAwake(): void {
        GameEventBus.on(`AttributeModule_Ready`,this.onAttributeAllReady.bind(this))
    }

    onAttributeAllReady(player:mw.Player){
        // 获取玩家属性
        let attr = player.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;
        // Todo：获取玩家装备的武器
        // Todo：将武器属性附加到玩家身上
    }

    createWeapon(){
        // let uuid = UuidCreater.create();
        // console.log(`武器uuid：`,uuid);
    }
}