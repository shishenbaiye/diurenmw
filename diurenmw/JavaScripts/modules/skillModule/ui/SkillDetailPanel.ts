import { GameConfig } from "../../../configs/GameConfig";
import SkillDetailUI_Generate from "../../../ui-generate/Skill/SkillDetailUI_generate";
import { SkillModuleC } from "../SkillModuleC";
import { SkillMainPanel } from "./SkillMainPanel";

export class SkillDetailPanel extends SkillDetailUI_Generate{
    public farther:SkillMainPanel;
    private _type:number;
    private _skillId:number;
    setSkillDetail(skillId:number,type:number,index?:number){
        let config = GameConfig.SkillObj.getElement(skillId);
        if(config){
            this._skillId = skillId;
            this._type = type;
            if(type == 2) this._index = index;
            this.mTextBlock_button.text = type == 1 ? "装备" : "卸下";
            if(type == 3) {
                this.mButton_e.visibility = SlateVisibility.Collapsed;
            }else{
                this.mButton_e.visibility = SlateVisibility.Visible;
            }
            this.mImage_Icon.imageGuid = config.iconGuid;
            this.mTextBlock_name.text = config.name;
            this.mTextBlock_Type.text = config.type == 1 ? "主动" : "被动";
            this.mTextBlock_CD.text = config.cd.toString();
            this.mTextBlock_Cost.text = config.cost.toString() + "MP";
            this.mTextBlock_Des.text = "        "+config.describe;
            let damageText = config.damageDes;
            // 把||替换成\n
            damageText = damageText.replace(/\|\|/g,"\n");
            this.mTextBlock_skill.text = damageText
        }else{
            console.warn("技能配置不存在",skillId);
        }
    }


    private _index:number
    protected onAwake(): void {
        super.onAwake();
        this.mButton_close.onClicked.add(()=>{
            UIService.hideUI(this);
        })

        this.mButton_e.onClicked.add(()=>{
            if(this._type == 1){
                UIService.hideUI(this);
                this.farther.enterEquipSkillState(this._skillId);
            }
            if(this._type == 2){
                UIService.hideUI(this);
                ModuleService.getModule(SkillModuleC).equipSkill(-1,this._index);
            }
        })
    }
}