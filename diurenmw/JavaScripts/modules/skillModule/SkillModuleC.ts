import { SkillModuleData } from "./SkillModuleData";
import { SkillModuleS } from "./SkillModuleS";

export class SkillModuleC extends ModuleC<SkillModuleS,SkillModuleData>{
    activeSkill(skillId: number) {
        this.server.net_activeSkill(skillId);
    }
}