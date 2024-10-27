import { CharAttributeInfo } from "./CharAttributeInfo";
//战斗同步 抽象类
@Component
export abstract class CharFightInfo extends CharAttributeInfo {

    @Property({ replicated: true, onChanged: "onSkillCdChanged" })
    skillInfo: any[] = [];

    /** 技能修改 */
    protected onSkillCdChanged(): void { }

}