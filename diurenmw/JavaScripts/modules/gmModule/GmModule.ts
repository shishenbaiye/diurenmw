import { AddGMCommand } from "module_gm";
import GameStart from "../../GameStart";
import { Singleton } from "../../tools/Singleton";
import GMPanel from "./ui/GMPanel";
import WeaponScript from "../weaponModule/WeaponScript";
import { AttributeModuleS } from "../AttributeModule/AttributeModuleS";
import PlayerSkillScrpit from "../skillModule/PlayerSkillScrpit";

export class GMManager extends Singleton {


    init() {
        AddGMCommand(
            "增加武器", (player: Player, itemId: string) => {

            }, (player: mw.Player, itemId: string) => {
                let weaponScript = player.character.getComponent(WeaponScript);
                weaponScript.addWeapon(parseInt(itemId));
            }
        );
        AddGMCommand(
            "卸载武器", () => { }, (player: mw.Player, itemId: string) => {
                let weaponScript = player.character.getComponent(WeaponScript);
                weaponScript.unEquipWeapon();
            }
        );
        AddGMCommand(
            "装备武器", () => { }, (player: mw.Player, itemId: string) => {
                let weaponScript = player.character.getComponent(WeaponScript);
                weaponScript.equepWeapon(itemId);
            }
        );
        AddGMCommand(
            "增加经验", () => { }, (player: mw.Player, itemId: string) => {
                ModuleService.getModule(AttributeModuleS).addExp(player, parseInt(itemId));
            }
        );
        AddGMCommand(
            "增加技能", (player: Player, itemId: string) => {

            }, (player: mw.Player, itemId: string) => {
                let skillScript = player.character.getComponent(PlayerSkillScrpit);
                if (skillScript) {
                    skillScript.addSkill(parseInt(itemId));
                }
            }
        );
        AddGMCommand(
            "装备技能1", (player: Player, itemId: string) => {

            }, (player: mw.Player, itemId: string) => {
                let skillScript = player.character.getComponent(PlayerSkillScrpit);
                if (skillScript) {
                    skillScript.setSkill(parseInt(itemId),0);
                }
            }
        );
    }
}


export class GMModuleC extends ModuleC<GMModuleS, null> {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (GameStart.instance.openGM) {
            GMManager.getInstance().init();
            let ui = new GMPanel();
            ui.show();
        }
    }
}
export class GMModuleS extends ModuleS<GMModuleC, null> {
    protected onStart(): void {
        GMManager.getInstance().init();
    }
}