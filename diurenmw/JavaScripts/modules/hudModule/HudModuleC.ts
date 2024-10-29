import { CurrentScence } from "../../CurrentScence";
import { SkillModuleData } from "../skillModule/SkillModuleData";
import { HudModuleS } from "./HudModuleS";
import { MainHudPanel } from "./ui/MainHudPanel";

export class HudModuleC extends ModuleC<HudModuleS,null>{
    net_initHud(){
        if(CurrentScence.currentScenceName == "diurenmw"){
            this.initDiurenmwHud();
        }
        if(CurrentScence.currentScenceName == "dungeon01"){
            this.initDungeon01();
        }
    }
    // #region DiurenmwHud
    public diurenmwHudPanel:MainHudPanel;
    initDiurenmwHud(){
        if(!this.diurenmwHudPanel){
            this.diurenmwHudPanel = UIService.create(MainHudPanel);
        }
        this.diurenmwHudPanel.mMaskButton_normal.visibility = SlateVisibility.Collapsed;
        this.diurenmwHudPanel.mMaskButton_skill1.visibility = SlateVisibility.Collapsed;
        this.diurenmwHudPanel.mMaskButton_skill2.visibility = SlateVisibility.Collapsed;
        this.diurenmwHudPanel.mMaskButton_skill3.visibility = SlateVisibility.Collapsed;
        this.diurenmwHudPanel.mMaskButton_skill4.visibility = SlateVisibility.Collapsed;
        UIService.showUI(this.diurenmwHudPanel);
    }

    setNormalSkill(skillId: number[]){
        if(!this.diurenmwHudPanel){
            this.initDiurenmwHud();
        }
        this.diurenmwHudPanel.setNormalSkill(skillId);
    }

    setSkill(skillId: number,index:number){
        if(!this.diurenmwHudPanel){
            this.initDiurenmwHud();
        }

        if(index == 0){
            this.diurenmwHudPanel.setSkill1(skillId);
        }
        
        if(index == 1){
            this.diurenmwHudPanel.setSkill2(skillId);
        }

        if(index == 2){
            this.diurenmwHudPanel.setSkill3(skillId);
        }

        if(index == 3){
            this.diurenmwHudPanel.setSkill4(skillId);
        }

    }
    //#endregion

    //#region Dungeon01
    public dungeon01HudPanel:MainHudPanel;
    initDungeon01(){

    }
    //#endregion
    net_setSkillCD(cd: number, index: number){
        if(!this.diurenmwHudPanel){
            this.initDiurenmwHud();
        }
        this.diurenmwHudPanel.setSkillCD(cd,index);
    }

    protected onUpdate(dt: number): void {
        if(this.diurenmwHudPanel){
            this.diurenmwHudPanel.update(dt);
        }
    }
}