import { GameConfig } from "../../../configs/GameConfig";
import MainHud_Generate from "../../../ui-generate/Hud/MainHud_generate";
import { SkillModuleC } from "../../skillModule/SkillModuleC";
import { SkillModuleS } from "../../skillModule/SkillModuleS";

export class MainHudPanel extends MainHud_Generate{



    private _normalSkillList: Array<number>;

    setNormalSkill(skillId: number[]) {
        if(skillId == null){
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
        if(skillId == null){
            this.mImage_skill1.imageGuid = "";
        }else{
            let config = GameConfig.SkillObj.getElement(skillId);
            if(config){
                this.mImage_skill1.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_skill1.imageGuid = config.iconGuid;
            }else{
                console.warn("技能配置不存在",skillId);
                this.mImage_skill1.imageGuid = "";
            }
        }
    }

    private _skill2: number;
    setSkill2(skillId: number) {
        this._skill2 = skillId;
        if(skillId == null){
            this.mImage_skill2.imageGuid = "";
        }else{
            let config = GameConfig.SkillObj.getElement(skillId);
            if(config){
                this.mImage_skill2.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_skill2.imageGuid = config.iconGuid;
            }else{
                console.warn("技能配置不存在",skillId);
                this.mImage_skill2.imageGuid = "";
            }
        }
    }

    private _skill3: number;
    setSkill3(skillId: number) {
        this._skill3 = skillId;
        if(skillId == null){
            this.mImage_skill3.imageGuid = "";
        }else{
            let config = GameConfig.SkillObj.getElement(skillId);
            if(config){
                this.mImage_skill3.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_skill3.imageGuid = config.iconGuid;
            }else{
                console.warn("技能配置不存在",skillId);
                this.mImage_skill3.imageGuid = "";
            }
        }
    }

    private _skill4: number;
    setSkill4(skillId: number) {
        this._skill4 = skillId;
        if(skillId == null){
            this.mImage_skill4.imageGuid = "";
        }else{
            let config = GameConfig.SkillObj.getElement(skillId);
            if(config){
                this.mImage_skill4.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_skill4.imageGuid = config.iconGuid;
            }else{
                console.warn("技能配置不存在",skillId);
                this.mImage_skill4.imageGuid = "";
            }
        }
    }


    protected onAwake(): void {
        super.onAwake();

        this.mButton_normal.onClicked.add(()=>{
            if(this._normalSkillList.length > 0){
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
    }
}