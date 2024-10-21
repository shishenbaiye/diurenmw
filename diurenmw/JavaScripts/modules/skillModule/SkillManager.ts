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
    private registerTypeMap:Map<ESkillType,Array<number>> = new Map<ESkillType,Array<number>>();
    private registerMap:Map<number,Constructor<any>> = new Map<number,Constructor<any>>();

    registerSkill(skillId:number,skillType:ESkillType,skill: Constructor<any>){
        if(this.registerMap.has(skillId)){
            console.warn(skill.name,"技能已经注册过了");
            return;
        }
        if(!this.registerTypeMap.has(skillType)){
            this.registerTypeMap.set(skillType,[]);
        }
        this.registerTypeMap.get(skillType).push(skillId);
        this.registerMap.set(skillId,skill);
    }

    getSkillById(skillId:number):Constructor<any>{
        if(this.registerMap.has(skillId)){
            return this.registerMap.get(skillId);
        }
        console.warn(skillId,"技能未注册");
        return null;
    }
}




export function RegisterSkill(skillId:number,skillType:ESkillType){
    return function(target: any){
        SkillManager.instance.registerSkill(skillId,skillType,target);
    }
}