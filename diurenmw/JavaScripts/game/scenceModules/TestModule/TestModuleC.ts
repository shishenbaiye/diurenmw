import { TestModuleS } from "./TestModuleS";

export class TestModuleC extends ModuleC<TestModuleS,null>{
    protected onStart(): void {
        InputUtil.onKeyDown(Keys.L,()=>{
            this.server.net_AddExp(600);
        })

        InputUtil.onKeyDown(Keys.K,()=>{
            this.server.net_AddWeapon();
        })

        InputUtil.onKeyDown(Keys.J,()=>{
            this.server.net_AddSkill();
        })

        InputUtil.onKeyDown(Keys.H,()=>{
            this.server.net_activeSkill();
        })
    }


}