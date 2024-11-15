import { GameConfig } from "../../../configs/GameConfig";
import MainHud_Generate from "../../../ui-generate/Hud/MainHud_generate";
import SkillMainUI_Generate from "../../../ui-generate/Skill/SkillMainUI_generate";
import { BagManagerModuleC } from "../../bagModule/BagManagerModuleC";
import { SkillModuleC } from "../../skillModule/SkillModuleC";
import { SkillModuleS } from "../../skillModule/SkillModuleS";

export class MainHudPanel extends MainHud_Generate{



    private _normalSkillList: Array<number>;

    setNormalSkill(skillId: number[]) {
        if(skillId.length == 0){
            this._normalSkillList = [];
        }else{
            this._normalSkillList = skillId;
            let config = GameConfig.SkillObj.getElement(skillId[0]);
            if(config){
                this.mImage_normal.imageGuid = config.iconGuid;
            }else{
                console.warn("技能配置不存在",skillId[0]);
                this.mImage_normal.imageGuid = "";
            }
        }
    }
    
    private _skill1: number;
    setSkill1(skillId: number) {
        this._skill1 = skillId;
        if(skillId == -1){
            this.mImage_skill1.visibility = SlateVisibility.Collapsed;
            this.skill1Cd = null;
            this.mMaskButton_skill1.visibility = SlateVisibility.Collapsed;
        }else{
            let config = GameConfig.SkillObj.getElement(skillId);
            if(config){
                this.mImage_skill1.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_skill1.imageGuid = config.iconGuid;
            }else{
                console.warn("技能配置不存在",skillId);
                this.mImage_skill1.visibility = SlateVisibility.Collapsed;
            }
        }
    }

    private _skill2: number;
    setSkill2(skillId: number) {
        this._skill2 = skillId;
        if(skillId == -1){
            this.mImage_skill2.visibility = SlateVisibility.Collapsed;
            this.skill2Cd = null;
            this.mMaskButton_skill2.visibility = SlateVisibility.Collapsed;
        }else{
            let config = GameConfig.SkillObj.getElement(skillId);
            if(config){
                this.mImage_skill2.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_skill2.imageGuid = config.iconGuid;
            }else{
                console.warn("技能配置不存在",skillId);
                this.mImage_skill2.visibility = SlateVisibility.Collapsed;
            }
        }
    }

    private _skill3: number;
    setSkill3(skillId: number) {
        this._skill3 = skillId;
        if(skillId == -1){
            this.mImage_skill3.visibility = SlateVisibility.Collapsed;
            this.skill3Cd = null;
            this.mMaskButton_skill3.visibility = SlateVisibility.Collapsed;
        }else{
            let config = GameConfig.SkillObj.getElement(skillId);
            if(config){
                this.mImage_skill3.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_skill3.imageGuid = config.iconGuid;
            }else{
                console.warn("技能配置不存在",skillId);
                this.mImage_skill3.visibility = SlateVisibility.Collapsed;
            }
        }
    }

    private _skill4: number;
    setSkill4(skillId: number) {
        this._skill4 = skillId;
        if(skillId == -1){
            this.mImage_skill4.visibility = SlateVisibility.Collapsed;
            this.skill4Cd = null;
            this.mMaskButton_skill4.visibility = SlateVisibility.Collapsed;
        }else{
            let config = GameConfig.SkillObj.getElement(skillId);
            if(config){
                this.mImage_skill4.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_skill4.imageGuid = config.iconGuid;
            }else{
                console.warn("技能配置不存在",skillId);
                this.mImage_skill4.visibility = SlateVisibility.Collapsed;
            }
        }
    }
    
    private _skill5: number;
    setSkill5(skillId: number) {
        this._skill5 = skillId;
        if(skillId == -1){
            this.mImage_skill5.visibility = SlateVisibility.Collapsed;
            this.skill5Cd = null;
            this.mMaskButton_skill5.visibility = SlateVisibility.Collapsed;
        }else{
            let config = GameConfig.SkillObj.getElement(skillId);
            if(config){
                this.mImage_skill5.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_skill5.imageGuid = config.iconGuid;
            }else{
                console.warn("技能配置不存在",skillId);
                this.mImage_skill5.visibility = SlateVisibility.Collapsed;
            }
        }
    }

    private _skillBack: number;
    setSkillBack(skillId: number) {
        this._skillBack = skillId;
        if(skillId == -1){
            this.mImage_skillBack.visibility = SlateVisibility.Collapsed;
            this.skillBackCd = null;
            this.mMaskButton_skillBack.visibility = SlateVisibility.Collapsed;
        }else{
            let config = GameConfig.SkillObj.getElement(skillId);
            if(config){
                this.mImage_skillBack.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_skillBack.imageGuid = config.iconGuid;
            }else{
                console.warn("技能配置不存在",skillId);
                this.mImage_skillBack.visibility = SlateVisibility.Collapsed;
            }
        }
    }

    private _skillFinal: number;
    setSkillFinal(skillId: number) {
        this._skillFinal = skillId;
        if(skillId == -1){
            this.mImage_skillFinal.visibility = SlateVisibility.Collapsed;
            this.skillFinalCd = null;
            this.mMaskButton_skillFinal.visibility = SlateVisibility.Collapsed;
        }else{
            let config = GameConfig.SkillObj.getElement(skillId);
            if(config){
                this.mImage_skillFinal.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_skillFinal.imageGuid = config.iconGuid;
            }else{
                console.warn("技能配置不存在",skillId);
                this.mImage_skillFinal.visibility = SlateVisibility.Collapsed;
            }
        }
    }

    skill1Cd:number = null;
    skill1TotalCd:number = null;

    skill2Cd:number = null;
    skill2TotalCd:number = null;

    skill3Cd:number = null;
    skill3TotalCd:number = null;

    skill4Cd:number = null;
    skill4TotalCd:number = null;

    skill5Cd:number = null;
    skill5TotalCd:number = null;

    skillBackCd:number = null;
    skillBackTotalCd:number = null;

    skillFinalCd:number = null;
    skillFinalTotalCd:number = null;
    setSkillCD(cd:number,index:number){
        if(cd == 0) return;
        if(index == 0){
            this.skill1Cd = cd;
            this.skill1TotalCd = cd;
        }
        if(index == 1){
            this.skill2Cd = cd;
            this.skill2TotalCd = cd;
        }
        if(index == 2){
            this.skill3Cd = cd;
            this.skill3TotalCd = cd;
        }
        if(index == 3){
            this.skill4Cd = cd;
            this.skill4TotalCd = cd
        }
        if(index == 4){
            this.skill5Cd = cd;
            this.skill5TotalCd = cd
        }
        if(index == 5){
            this.skillBackCd = cd;
            this.skillBackTotalCd = cd
        }
        if(index == 6){
            this.skillFinalCd = cd;
            this.skillFinalTotalCd = cd
        }
    }

    update(dt: number) {    
        if(this.skill1Cd){
            this.skill1Cd -= dt;
            if(this.skill1Cd <= 0){
                this.skill1Cd = null;
                this.skill1TotalCd = null;
                this.mMaskButton_skill1.visibility = SlateVisibility.Collapsed;
            }else{
                this.mMaskButton_skill1.visibility = SlateVisibility.Visible;
                this.mMaskButton_skill1.fanShapedValue = 1-(this.skill1Cd / this.skill1TotalCd);
            }
        }

        if(this.skill2Cd){
            this.skill2Cd -= dt;
            if(this.skill2Cd <= 0){
                this.skill2Cd = null;
                this.skill2TotalCd = null;
                this.mMaskButton_skill2.visibility = SlateVisibility.Collapsed;
            }else{
                this.mMaskButton_skill2.visibility = SlateVisibility.Visible;
                this.mMaskButton_skill2.fanShapedValue = 1-(this.skill2Cd / this.skill2TotalCd);
            }
        }

        if(this.skill3Cd){
            this.skill3Cd -= dt;
            if(this.skill3Cd <= 0){
                this.skill3Cd = null;
                this.skill3TotalCd = null;
                this.mMaskButton_skill3.visibility = SlateVisibility.Collapsed;
            }else{
                this.mMaskButton_skill3.visibility = SlateVisibility.Visible;
                this.mMaskButton_skill3.fanShapedValue = 1-(this.skill3Cd / this.skill3TotalCd);
            }
        }

        if(this.skill4Cd){
            this.skill4Cd -= dt;
            if(this.skill4Cd <= 0){
                this.skill4Cd = null;
                this.skill4TotalCd = null;
                this.mMaskButton_skill4.visibility = SlateVisibility.Collapsed;
            }else{
                this.mMaskButton_skill4.visibility = SlateVisibility.Visible;
                this.mMaskButton_skill4.fanShapedValue = 1-(this.skill4Cd / this.skill4TotalCd);
            }
        }

        if(this.skill5Cd){
            this.skill5Cd -= dt;
            if(this.skill5Cd <= 0){
                this.skill5Cd = null;
                this.skill5TotalCd = null;
                this.mMaskButton_skill5.visibility = SlateVisibility.Collapsed;
            }else{
                this.mMaskButton_skill5.visibility = SlateVisibility.Visible;
                this.mMaskButton_skill5.fanShapedValue = 1-(this.skill5Cd / this.skill5TotalCd);
            }
        }

        if(this.skillBackCd){
            this.skillBackCd -= dt;
            if(this.skillBackCd <= 0){
                this.skillBackCd = null;
                this.skillBackTotalCd = null;
                this.mMaskButton_skillBack.visibility = SlateVisibility.Collapsed;
            }else{
                this.mMaskButton_skillBack.visibility = SlateVisibility.Visible;
                this.mMaskButton_skillBack.fanShapedValue = 1-(this.skillBackCd / this.skillBackTotalCd);
            }
        }

        if(this.skillFinalCd){
            this.skillFinalCd -= dt;
            if(this.skillFinalCd <= 0){
                this.skillFinalCd = null;
                this.skillFinalTotalCd = null;
                this.mMaskButton_skillFinal.visibility = SlateVisibility.Collapsed;
            }else{
                this.mMaskButton_skillFinal.visibility = SlateVisibility.Visible;
                this.mMaskButton_skillFinal.fanShapedValue = 1-(this.skillFinalCd / this.skillFinalTotalCd);
            }
        }
    }
    

    protected onAwake(): void {
        super.onAwake();

        this.mButton_normal.onClicked.add(()=>{
            if(this._normalSkillList && this._normalSkillList.length > 0){
                ModuleService.getModule(SkillModuleC).activeNormalSkill();
            }
        })

        this.mButton_skill1.onClicked.add(()=>{
            if(this._skill1 != null){
                ModuleService.getModule(SkillModuleC).activeSkill(0);
            }
        })

        this.mButton_skill2.onClicked.add(()=>{
            if(this._skill2 != null){
                ModuleService.getModule(SkillModuleC).activeSkill(1);
            }
        })

        this.mButton_skill3.onClicked.add(()=>{
            if(this._skill3 != null){
                ModuleService.getModule(SkillModuleC).activeSkill(2);
            }
        })

        this.mButton_skill4.onClicked.add(()=>{
            if(this._skill4 != null){
                ModuleService.getModule(SkillModuleC).activeSkill(3);
            }
        })

        this.mButton_skill5.onClicked.add(()=>{
            if(this._skill5 != null){
                ModuleService.getModule(SkillModuleC).activeSkill(4);
            }
        })

        this.mButton_skillBack.onClicked.add(()=>{
            if(this._skillBack != null){
                ModuleService.getModule(SkillModuleC).activeSkill(5);
            }
        })

        this.mButton_skillFinal.onClicked.add(()=>{
            if(this._skillFinal != null){
                ModuleService.getModule(SkillModuleC).activeSkill(6);
            }
        })

        this.mButton_Bag.onClicked.add(()=>{
            ModuleService.getModule(BagManagerModuleC).onBagOpen();
        })

        this.mButton_Skill.onClicked.add(()=>{
            ModuleService.getModule(SkillModuleC).showSkillMainPanel();
        })
    }
}