import { SkillModuleData } from "./SkillModuleData";
import { SkillModuleS } from "./SkillModuleS";
import { SkillMainPanel } from "./ui/SkillMainPanel";

export class SkillModuleC extends ModuleC<SkillModuleS,SkillModuleData>{

    private skillUI:SkillMainPanel;
    protected onAwake(): void {
        if(!this.skillUI){
            this.skillUI = UIService.create(SkillMainPanel);
        }   
    }
    //#region UI操作
    showSkillMainPanel(){
        this.skillUI.open();
    }

    setSkillUI(skillId:number,index:number){
        if(!this.skillUI) UIService.create(SkillMainPanel);
        this.skillUI.setSkillUI(skillId,index);
        this.skillUI.refeshSkillList();
    }

    equipSkill(skillId:number,index:number){
        this.server.net_equipSkill(skillId,index);
    }

    unequipSkill(index:number){
        this.server.net_unequipSkill(index);
    }

    // #endregion

    activeSkill(index: number) {
        this.server.net_activeSkill(index);
    }

    activeNormalSkill() {
        this.server.net_activeNormalSkill();
    }



    net_drowCheckHitByBoxOverlap(posCenter: mw.Vector, boxExtent: mw.Vector) {
        console.log("net_drowCheckHitByBoxOverlap",posCenter,boxExtent);
        QueryUtil.boxOverlap(posCenter, boxExtent, true, undefined, false,Player.localPlayer.character);
    }

    net_drowCheckHitByBoxTrace(start: mw.Vector, end: mw.Vector, boxExtent: mw.Vector, dir: mw.Rotation) {
        // console.log("net_drowCheckHitByBoxTrace",start,end,boxExtent,dir);
        QueryUtil.boxTrace(start, end, boxExtent, dir, true,true,undefined,false,Player.localPlayer.character);
    }
}