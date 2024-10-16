import { AttributeModuleS } from "../../../modules/AttributeModule/AttributeModuleS";
import WeaponScript from "../../../modules/weaponModule/WeaponScript";
import { TestModuleC } from "./TestModuleC";

export class TestModuleS extends ModuleS<TestModuleC,null>{
    protected onStart(): void {
        let obj = <Trigger>GameObject.findGameObjectById(`27E26E19`);
        obj.onEnter.add((obj: GameObject) => {
            if (obj instanceof Character) {
                TeleportService.asyncTeleportToScene(`dungeon01`, [obj.player.userId], {
                    teleportData: {
                        a: 1,
                        b: 2
                    },
                    createNewPrivateRoom:true
                })
            }
        })
    }

    net_AddExp(exp:number){
        let player = this.currentPlayer;
        ModuleService.getModule(AttributeModuleS).addExp(player,exp);
    }

    net_AddWeapon(){
        let player = this.currentPlayer;
        let weaponScript = player.character.getComponent(WeaponScript);
        if(weaponScript){
            weaponScript.equepWeapon(`01929448-33e3-b3ae-02bd-0c0b3e684b16`)
        }
    }
}