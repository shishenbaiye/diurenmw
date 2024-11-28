import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","part","quality","def","str","int","effect1","effect2","effect3","effect4","icon","stackMax"],["","","","","","","","","","","","",""],[10001,"草指环",1,1,15,[1,2],[1,1],"力量增加2",null,null,null,"142702",1],[10002,"嘲笑命运之戒",1,4,260,[55,70],[34,50],"生命恢复速度增加150/s","力量增加40","爆伤增加15％","受到致命伤时回复满血（180scd）","142702",1],[20001,"草项圈",2,1,22,[2,2],[2,2],"生命值增加130",null,null,null,"129473",1],[20002,"坚如磐石之链",2,4,270,[50,80],[50,80],"生命值增加2000","生命值增加10％","技能伤增加7％","激活活力光环","129466",1],[30001,"草手链",3,1,16,[1,1],[1,2],"移动速度增加5％",null,null,null,"129474",1],[30002,"打破桎梏手镯",3,4,315,[34,50],[55,70],"法力回复速度增加5/s","移动速度增加10％","造成伤害无视10％防御力","攻击伤害增加10％","129475",1]];
export interface IJewelryObjElement extends IElementBase{
 	/**ID*/
	id:number
	/**名称*/
	name:string
	/**首饰类型：&#10;1.戒指&#10;2.项链&#10;3.手镯*/
	part:number
	/**品级：&#10;1.普通&#10;2.高级&#10;3.稀有&#10;4.史诗*/
	quality:number
	/**防御力*/
	def:number
	/**力量范围*/
	str:Array<number>
	/**智力范围*/
	int:Array<number>
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
export class JewelryObjConfig extends ConfigBase<IJewelryObjElement>{
	constructor(){
		super(EXCELDATA);
	}

}