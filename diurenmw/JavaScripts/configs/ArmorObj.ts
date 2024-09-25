import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","body","type","quality","def","vit","str","int","effect1","effect2","effect3","effect4"],["","","","","","","","","","","","",""],[10001,"普通布甲头盔",1,3,1,15,16,[12,20],[50,100],null,null,null,null],[20001,"锁子甲",2,1,1,22,100,[100,150],[20,50],null,null,null,null],[20002,"银鳞胸甲",2,2,5,1600,1000,[600,800],[100,120],"效果1描述","效果1描述","效果1描述","效果1描述"],[30001,"普通布甲下装",3,3,1,16,10,[13,22],[77,98],null,null,null,null],[40001,"普通重甲鞋子",4,1,1,5,10,[5,8],[16,21],null,null,null,null]];
export interface IArmorObjElement extends IElementBase{
 	/**ID*/
	id:number
	/**名称*/
	name:string
	/**防具部位：
1.头盔
2.上衣
3.下装
4.鞋子*/
	body:number
	/**防具种类：
1.重甲
2.板甲
3.布甲*/
	type:number
	/**品级：
1.普通
2.高级
3.稀有
4.传说
5.史诗*/
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
 } 
export class ArmorObjConfig extends ConfigBase<IArmorObjElement>{
	constructor(){
		super(EXCELDATA);
	}

}