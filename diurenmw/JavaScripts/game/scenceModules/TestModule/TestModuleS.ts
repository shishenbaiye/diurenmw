import { AttributeModuleS } from "../../../modules/AttributeModule/AttributeModuleS";
import { AbilitySystemComponent } from "../../../modules/gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import PlayerSkillScrpit from "../../../modules/skillModule/PlayerSkillScrpit";
import WeaponScript from "../../../modules/weaponModule/WeaponScript";
import { TestModuleC } from "./TestModuleC";

export class TestModuleS extends ModuleS<TestModuleC,null>{
    protected onStart(): void {
        // let obj = <Trigger>GameObject.findGameObjectById(`27E26E19`);
        // obj.onEnter.add((obj: GameObject) => {
        //     if (obj instanceof Character) {
        //         TeleportService.asyncTeleportToScene(`dungeon01`, [obj.player.userId], {
        //             teleportData: {
        //                 a: 1,
        //                 b: 2
        //             },
        //             createNewPrivateRoom:true
        //         })
        //     }
        // })


        let npc = GameObject.findGameObjectById(`27A625FD`);
        npc.addComponent(AbilitySystemComponent);
    }

    net_AddExp(exp:number){
        let player = this.currentPlayer;
        ModuleService.getModule(AttributeModuleS).addExp(player,exp);
    }

    net_AddWeapon(){
        let player = this.currentPlayer;
        let weaponScript = player.character.getComponent(WeaponScript);
        if(weaponScript){
            let res = weaponScript.addWeapon(1002)
            weaponScript.equepWeapon(res.uuid);
        }
    }

    net_unEquipWeapon(){
        let player = this.currentPlayer;
        let weaponScript = player.character.getComponent(WeaponScript);
        if(weaponScript){
            weaponScript.unEquipWeapon();
        }
    }

    net_AddSkill(){
        let player = this.currentPlayer;
        let skillScript = player.character.getComponent(PlayerSkillScrpit);
        if(skillScript){
            skillScript.addSkill(1001);
            skillScript.setSkill(1001,0)
        }
    }

    net_activeSkill(){
        let player = this.currentPlayer;
        let skillScript = player.character.getComponent(PlayerSkillScrpit);
        if(skillScript){
            skillScript.activeSkill(0);
        }
    }
}