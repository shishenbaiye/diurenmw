import { SkillModuleData } from "./SkillModuleData";
import { SkillModuleS } from "./SkillModuleS";

export class SkillModuleC extends ModuleC<SkillModuleS,SkillModuleData>{
    activeSkill(index: number) {
        this.server.net_activeSkill(index);
    }

    activeNormalSkill() {
        this.server.net_activeNormalSkill();
    }
}