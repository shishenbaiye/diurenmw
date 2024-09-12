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
}