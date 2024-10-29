import { GameConfig } from "../../../configs/GameConfig";
import SkillMainUI_Generate from "../../../ui-generate/Skill/SkillMainUI_generate";
import { SkillModuleC } from "../SkillModuleC";
import { SkillModuleData } from "../SkillModuleData";
import { SkillDetailPanel } from "./SkillDetailPanel";
import { SkillListItem } from "./SkillListItem";

export class SkillMainPanel extends SkillMainUI_Generate{

    open(){
        UIService.showUI(this);
        this.refeshSkillList();
    }

    close(){
        UIService.hideUI(this);
        this.haveSkillList.forEach((item)=>{item.destroy()});
    }

    setSkillUI(skillId:number,index:number){
        if(skillId == -1){
            this[`mButton_Skill${index+1}`].normalImageGuid = "163403";
        }else{
            this[`mButton_Skill${index+1}`].normalImageGuid = GameConfig.SkillObj.getElement(skillId).iconGuid;
        }
    }
    private haveSkillList:Array<SkillListItem> = [];
    refeshSkillList(){
        this.haveSkillList.forEach((item)=>{
            item.destroy();
        })
        let haveSkillList = DataCenterC.getData(SkillModuleData).haveSkills;
        let skill1 = DataCenterC.getData(SkillModuleData).skill1;
        let skill2 = DataCenterC.getData(SkillModuleData).skill2;
        let skill3 = DataCenterC.getData(SkillModuleData).skill3;
        let skill4 = DataCenterC.getData(SkillModuleData).skill4;
        haveSkillList.forEach((item,index)=>{
            if(item == skill1 || item == skill2 || item == skill3 || item == skill4) return;
            let skillItem = UIService.create(SkillListItem);
            skillItem.init(this,item);
            this.mCanvas_SkillList.addChild(skillItem.uiObject);
            this.haveSkillList.push(skillItem);
        })
    }

    showSkillDetail(skillid:number,type:number,index?:number){
        if(!this.skillDetailUI) this.skillDetailUI = UIService.create(SkillDetailPanel);
        this.skillDetailUI.farther = this;
        this.skillDetailUI.setSkillDetail(skillid,type,index);
        UIService.showUI(this.skillDetailUI);
    }

    public isChooseSkill:boolean = false;
    public equipSkillId:number;
    enterEquipSkillState(skillid:number){
        this.isChooseSkill = true;
        this.equipSkillId = skillid;
        this.mImage_change.visibility = SlateVisibility.Visible;
    }




    public skillDetailUI:SkillDetailPanel;
    
    protected onAwake(): void {
        super.onAwake();
        this.mButton_Close.onClicked.add(()=>{
            this.close();
        })

        this.mButton_Skill1.onClicked.add(()=>{
            if(this.isChooseSkill){
                ModuleService.getModule(SkillModuleC).equipSkill(this.equipSkillId,0);
                this.mImage_change.visibility = SlateVisibility.Collapsed;
                this.isChooseSkill = false;
            }else{
                this.showSkillDetail(DataCenterC.getData(SkillModuleData).skill1,2,0);
            }
        })

        this.mButton_Skill2.onClicked.add(()=>{
            if(this.isChooseSkill){
                ModuleService.getModule(SkillModuleC).equipSkill(this.equipSkillId,1);
                this.mImage_change.visibility = SlateVisibility.Collapsed;
                this.isChooseSkill = false;
            }else{
                this.showSkillDetail(DataCenterC.getData(SkillModuleData).skill2,2,1);
            }
        })

        this.mButton_Skill3.onClicked.add(()=>{
            if(this.isChooseSkill){
                ModuleService.getModule(SkillModuleC).equipSkill(this.equipSkillId,2);
                this.mImage_change.visibility = SlateVisibility.Collapsed;
                this.isChooseSkill = false;
            }else{
                this.showSkillDetail(DataCenterC.getData(SkillModuleData).skill3,2,2);
            }
        })

        this.mButton_Skill4.onClicked.add(()=>{
            if(this.isChooseSkill){
                ModuleService.getModule(SkillModuleC).equipSkill(this.equipSkillId,3);
                this.mImage_change.visibility = SlateVisibility.Collapsed;
                this.isChooseSkill = false;
            }else{
                this.showSkillDetail(DataCenterC.getData(SkillModuleData).skill4,2,3);
            }
        })


    }
}