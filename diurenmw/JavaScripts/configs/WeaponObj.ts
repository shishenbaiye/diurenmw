import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","type","quality","model","atk","matk","str","int","effect1","effect2","effect3","effect4","icon","stackMax"],["","","","","","","","","","","","","","",""],[1001,"生锈的铁剑",1,1,"ED1D823242771BAA249294A58DE4710A",[15,20],[7,10],6,3,null,null,null,null,"37668",1],[1002,"石中剑",1,4,"4D82B7F549634FA3E420FA80E2FB3CD3",[400,450],[200,225],170,90,"技能伤增加15％","攻击力增加15％","防御力增加15％","血量增加15％","37668",1],[2001,"树枝",2,1,null,[7,10],[15,20],3,6,null,null,null,null,null,1],[2002,"陨星杖",2,4,null,[200,225],[400,450],90,170,"技能伤增加20％","技能CD减少20％","释放技能时10％几率召唤陨石","释放技能时1％几率召唤大陨石",null,1],[3001,"随时会断的弓",3,1,null,[14,18],[13,16],5,5,null,null,null,null,null,1],[3002,"月神的弓弦",3,4,null,[350,410],[330,395],130,130,"攻击速度增加10％","攻击力增加20％","命中时使敌人减速10％","箭矢附带冰蓝色拖尾",null,1]];
export interface IWeaponObjElement extends IElementBase{
 	/**ID*/
	id:number
	/**名称*/
	name:string
	/**武器种类：&#xA;1.刀剑;2.法杖&#xA;3.弓弩*/
	type:number
	/**品级：&#xA;1.普通&#xA;2.高级&#xA;3.稀有&#xA;4.史诗*/
	quality:number
	/**模型*/
	model:string
	/**物理攻击力范围*/
	atk:Array<number>
	/**魔法攻击力范围*/
	matk:Array<number>
	/**力量*/
	str:number
	/**智力*/
	int:number
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
export class WeaponObjConfig extends ConfigBase<IWeaponObjElement>{
	constructor(){
		super(EXCELDATA);
	}

}