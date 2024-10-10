import { Constructor, MSingletonPlugin } from "../../framework/DI/MContainer";
import { MFramework } from "../../framework/MFramework";
import { MObject } from "../../framework/Object/MObject";
import { ESkillType } from "./SkillType";

@MSingletonPlugin()
export class SkillManager extends MObject{
    static _skillmgr: SkillManager;
    static get instance(): SkillManager {
        if (!this._skillmgr) {
            this._skillmgr = MFramework.createObject(SkillManager);
        }
        return this._skillmgr;
    }

    private registerMap:Map<string,Constructor<any>> = new Map<string,Constructor<any>>();

    registerSkill(skillname:string,skill: Constructor<any>){
        if(this.registerMap.has(skillname)){
            console.warn(skillname,"技能已经注册过了");
            return;
        }
        this.registerMap.set(skillname,skill);
    }

    getSkillByName(skillname:string):Constructor<any>{
        if(this.registerMap.has(skillname)){
            return this.registerMap.get(skillname);
        }
        console.warn(skillname,"技能未注册");
        return null;
    }
}




export function RegisterSkill(skillType:ESkillType){
    return function(target: any){
        SkillManager.instance.registerSkill(target.name,target);
    }
}