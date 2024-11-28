import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","quality","effect1","effect2","effect3","effect4","icon","stackMax"],["","","","","","","","",""],[10001,"下级生命药剂",1,"生命值恢复10%",null,null,null,"405266",99],[10002,"下级魔力药剂",1,"魔法值恢复10%",null,null,null,"142727",99],[10003,"全恢复药剂",4,"生命和魔法全恢复",null,null,null,"142699",99]];
export interface IConsumablesObjElement extends IElementBase{
 	/**ID*/
	id:number
	/**名称*/
	name:string
	/**品级：&#10;1.普通&#10;2.高级&#10;3.稀有&#10;4.史诗*/
	quality:number
	/**效果1描述*/
	effect1:string
	/**效果2描述*/
	effect2:string
	/**效果3描述*/
	effect3:string
	/**效果4描述*/
	effect4:string
	/**图标资源id*/
	icon:string
	/**堆叠数量上限*/
	stackMax:number
 } 
export class ConsumablesObjConfig extends ConfigBase<IConsumablesObjElement>{
	constructor(){
		super(EXCELDATA);
	}

}