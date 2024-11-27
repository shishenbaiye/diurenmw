import { GameConfig } from "../../../configs/GameConfig";
import SkillListItemUI_Generate from "../../../ui-generate/Skill/SkillListItemUI_generate";
import { SkillMainPanel } from "./SkillMainPanel";

export class SkillListItem extends SkillListItemUI_Generate{


    private father:SkillMainPanel;
    skillId:number;
    init(father:SkillMainPanel,skillId:number){
        this.father = father;
        this.skillId = skillId;
        this.mImage.imageGuid = GameConfig.SkillObj.getElement(skillId).iconGuid;
    }

    protected onAwake(): void {
        super.onAwake();
        this.mButton.onClicked.add(()=>{
            this.father.showSkillDetail(this.skillId,1);
        })
    }
}