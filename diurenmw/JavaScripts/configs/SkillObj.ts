import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","type","weaponType","quality","iconGuid","cd"],["","","","","","",""],[1001,"旋风斩",1,1,1,"ED1D823242771BAA249294A58DE4710A",15]];
export interface ISkillObjElement extends IElementBase{
 	/**ID*/
	id:number
	/**名称*/
	name:string
	/**技能种类：
1.普通技能
2.被动技能*/
	type:number
	/**关联武器种类：
1.大剑
2.法杖
*/
	weaponType:number
	/**技能品级：
1.普通技能
2.终极技能*/
	quality:number
	/**技能图标*/
	iconGuid:string
	/**技能CD*/
	cd:number
 } 
export class SkillObjConfig extends ConfigBase<ISkillObjElement>{
	constructor(){
		super(EXCELDATA);
	}

}