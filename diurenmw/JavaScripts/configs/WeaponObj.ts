import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","type","quality","atk","matk","str","int","effect1","effect2","effect3","effect4"],["","","","","","","","","","","",""],[1001,"大剑",1,1,[15,20],[5,10],100,20,null,null,null,null],[1002,"超级无敌牛逼大剑",1,5,[180,200],[50,80],1500,300,"效果1描述","效果1描述","效果1描述","效果1描述"]];
export interface IWeaponObjElement extends IElementBase{
 	/**ID*/
	id:number
	/**名称*/
	name:string
	/**武器种类：
1.剑*/
	type:number
	/**品级：
1.普通
2.高级
3.稀有
4.传说
5.史诗*/
	quality:number
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
 } 
export class WeaponObjConfig extends ConfigBase<IWeaponObjElement>{
	constructor(){
		super(EXCELDATA);
	}

}