import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","quality","effect1","effect2","effect3","effect4","icon","stackMax"],["","","","","","","","",""],[10001,"钻石",4,"珍贵的物品，商品出售能获得大量金币",null,null,null,"88568",99]];
export interface IMaterialsObjElement extends IElementBase{
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
export class MaterialsObjConfig extends ConfigBase<IMaterialsObjElement>{
	constructor(){
		super(EXCELDATA);
	}

}