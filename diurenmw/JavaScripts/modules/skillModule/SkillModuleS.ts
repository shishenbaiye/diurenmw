import { GameEventBus } from "../../common/eventBus/EventBus";
import { SkillModuleC } from "./SkillModuleC";
import { SkillModuleData } from "./SkillModuleData";

export class SkillModuleS extends ModuleS<SkillModuleC,SkillModuleData>{
    protected onAwake(): void {
        GameEventBus.on(`AttributeModule_Ready`, this.onAttributeAllReady.bind(this))
    }

    onAttributeAllReady(player: mw.Player) {
        
    }
}