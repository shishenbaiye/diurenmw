import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","body","type","quality","def","vit","str","int","effect1","effect2","effect3","effect4","icon","stackMax"],["","","","","","","","","","","","","","",""],[10001,"普通布甲头盔",1,3,1,9,7,[2,3],[1,2],"生命值增加27",null,null,null,"95598",1],[10002,"剑气纵横头盔",1,0,4,400,160,[55,70],[41,59],"生命值增加1200","剑气波消耗增加50％","剑气波伤害增加50％","剑气波大小增加30％","68420",1],[20001,"锁子甲",2,1,1,22,23,[3,5],[2,3],"生命值增加58",null,null,null,"336185",1],[20002,"剑气纵横胸甲",2,2,4,800,350,[90,110],[70,93],"生命值增加2000","技能伤增加10％","剑气波伤害增加10％","剑气波释放的剑气数量+2","336533",1],[30001,"普通布甲下装",3,3,1,16,18,[2,4],[1,3],"生命值增加43",null,null,null,"314966",1],[30002,"剑刃无双护腿",3,0,4,580,270,[77,90],[59,78],"生命值增加1550","暴伤增加15％","拔刀斩CD+1s","拔刀斩增加收刀动作，追加60％伤害","87817",1],[40001,"普通重甲鞋子",4,1,1,5,5,[1,2],[1,1],"生命值增加15",null,null,null,"95590",1],[40002,"剑刃无双战靴",4,0,4,350,120,[43,50],[21,44],"生命值增加860","移动速度增加20％","拔刀斩范围增加50％","拔刀斩伤害增加20％","26871",1]];
export interface IArmorObjElement extends IElementBase{
 	/**ID*/
	id:number
	/**名称*/
	name:string
	/**防具部位：&#10;1.头盔&#10;2.上衣&#10;3.下装&#10;4.鞋子*/
	body:number
	/**防具种类：&#10;1.重甲&#10;2.板甲&#10;3.布甲*/
	type:number
	/**品级：&#10;1.普通&#10;2.高级&#10;3.稀有&#10;4.史诗*/
	quality:number
	/**防御力*/
	def:number
	/**体力*/
	vit:number
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
export class ArmorObjConfig extends ConfigBase<IArmorObjElement>{
	constructor(){
		super(EXCELDATA);
	}

}