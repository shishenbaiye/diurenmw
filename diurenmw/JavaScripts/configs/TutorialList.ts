import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","desc","step"],["","",""],[1,"初学者手册开始-进入宠物引导",[5001,61000,5002,5003,5004]]];
export interface ITutorialListElement extends IElementBase{
 	/**流程主id*/
	id:number
	/**描述*/
	desc:string
	/**引导步骤（对应新手引导类型表id）*/
	step:Array<number>
 } 
export class TutorialListConfig extends ConfigBase<ITutorialListElement>{
	constructor(){
		super(EXCELDATA);
	}

}