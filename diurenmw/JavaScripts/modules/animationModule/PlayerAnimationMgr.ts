import { GameEventBus } from "../../common/eventBus/EventBus";
import { MSingletonPlugin } from "../../framework/DI/MContainer";
import { MObject } from "../../framework/Object/MObject";
import WeaponScript from "../weaponModule/WeaponScript";




@MSingletonPlugin()
export class PlayerAnimationMgr extends MObject {
    init() {
        console.log(`PlayerAnimationMgr init`);
        GameEventBus.on(`WeaponModule_EquipWeapon`, this.onEquipWeapon.bind(this));
        GameEventBus.on(`WeaponModule_UnEquipWeapon`, this.onUnEquipWeapon.bind(this));
    }

    private playerMainAnimMap: Map<string, SubStance> = new Map();
    onEquipWeapon(player: mw.Player) {
        let weaponScript = player.character.getComponent(WeaponScript);
        if(weaponScript){
            let weapon = weaponScript.getEquipWeapon().getData();
            if(weapon){
                if(weapon.wtid == 1){
                    if(this.playerMainAnimMap.has(player.userId)){
                        let anim = this.playerMainAnimMap.get(player.userId);
                        anim.play();
                    }else{
                        console.log(`玩家${player.userId}播放动画`);
                        let anim = player.character.loadSubStance("303259");
                        anim.blendMode = StanceBlendMode.BlendUpper;
                        anim.play();
                        this.playerMainAnimMap.set(player.userId,anim);
                    }
                }
            }
        }
    }
    onUnEquipWeapon(player: mw.Player) {

    }
}