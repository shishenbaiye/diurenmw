import { GameConfig } from "../../../configs/GameConfig";
import MainHud_Generate from "../../../ui-generate/Hud/MainHud_generate";
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

    skill1Cd:number = null;
    skill2Cd:number = null;
    skill3Cd:number = null;
    skill4Cd:number = null;
    setSkillCD(cd:number,index:number){
        if(cd == 0) return;
        if(index == 0){
            this.skill1Cd = cd;
        }
        if(index == 1){
            this.skill2Cd = cd;
        }
        if(index == 2){
            this.skill3Cd = cd;
        }
        if(index == 3){
            this.skill4Cd = cd;
        }
    }

    update(dt: number) {    
        if(this.skill1Cd){
            this.skill1Cd -= dt;
            if(this.skill1Cd <= 0){
                this.skill1Cd = null;
                this.mMaskButton_skill1.visibility = SlateVisibility.Collapsed;
            }else{
                this.mMaskButton_skill1.visibility = SlateVisibility.Visible;
                this.mMaskButton_skill1.fanShapedValue = 1-(this.skill1Cd / GameConfig.SkillObj.getElement(this._skill1).cd)
            }
        }

        if(this.skill2Cd){
            this.skill2Cd -= dt;
            if(this.skill2Cd <= 0){
                this.skill2Cd = null;
                this.mMaskButton_skill2.visibility = SlateVisibility.Collapsed;
            }else{
                this.mMaskButton_skill2.visibility = SlateVisibility.Visible;
                this.mMaskButton_skill2.fanShapedValue = 1-(this.skill2Cd / GameConfig.SkillObj.getElement(this._skill2).cd)
            }
        }

        if(this.skill3Cd){
            this.skill3Cd -= dt;
            if(this.skill3Cd <= 0){
                this.skill3Cd = null;
                this.mMaskButton_skill3.visibility = SlateVisibility.Collapsed;
            }else{
                this.mMaskButton_skill3.visibility = SlateVisibility.Visible;
                this.mMaskButton_skill3.fanShapedValue = 1-(this.skill3Cd / GameConfig.SkillObj.getElement(this._skill3).cd)
            }
        }

        if(this.skill4Cd){
            this.skill4Cd -= dt;
            if(this.skill4Cd <= 0){
                this.skill4Cd = null;
                this.mMaskButton_skill4.visibility = SlateVisibility.Collapsed;
            }else{
                this.mMaskButton_skill4.visibility = SlateVisibility.Visible;
                this.mMaskButton_skill4.fanShapedValue = 1-(this.skill4Cd / GameConfig.SkillObj.getElement(this._skill4).cd)
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