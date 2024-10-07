import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","type","quality","model","atk","matk","str","int","effect1","effect2","effect3","effect4","icon","stackMax"],["","","","","","","","","","","","","","",""],[1001,"大剑",1,1,"ED1D823242771BAA249294A58DE4710A",[15,20],[5,10],100,20,null,null,null,null,"37668",1],[1002,"超级无敌牛逼大剑",1,5,"4D82B7F549634FA3E420FA80E2FB3CD3",[180,200],[50,80],1500,300,"效果1描述","效果1描述","效果1描述","效果1描述","37668",1]];
export interface IWeaponObjElement extends IElementBase{
 	/**ID*/
	id:number
	/**名称*/
	name:string
	/**武器种类：&#xA;1.剑*/
	type:number
	/**品级：&#xA;1.普通&#xA;2.高级&#xA;3.稀有&#xA;4.传说&#xA;5.史诗*/
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