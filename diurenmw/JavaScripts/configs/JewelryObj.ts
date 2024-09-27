import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","part","quality","def","str","int","effect1","effect2","effect3","effect4"],["","","","","","","","","","",""],[10001,"戒指",1,1,15,[12,20],[50,100],null,null,null,null],[20001,"项链",2,1,22,[100,150],[20,50],null,null,null,null],[20002,"牛b项链",2,4,1600,[600,800],[100,120],"效果1描述","效果1描述","效果1描述","效果1描述"],[30001,"手镯",3,1,16,[13,22],[77,98],null,null,null,null]];
export interface IJewelryObjElement extends IElementBase{
 	/**ID*/
	id:number
	/**名称*/
	name:string
	/**首饰类型：
1.戒指
2.项链
3.手镯*/
	part:number
	/**品级：
1.普通
2.高级
3.稀有
4.史诗*/
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
 } 
export class JewelryObjConfig extends ConfigBase<IJewelryObjElement>{
	constructor(){
		super(EXCELDATA);
	}

}