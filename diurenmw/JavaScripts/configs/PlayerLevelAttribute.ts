import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","level","exp","hp","mp","vitality","strength","intellect","atk","matk","armor","crit","isMaxLevel"],["","","","","","","","","","","","",""],[1,1,1000,100,100,10,10,10,10,10,100,0.1,false],[2,2,1500,200,150,15,20,20,15,15,300,0.1,true]];
export interface IPlayerLevelAttributeElement extends IElementBase{
 	/**id序列*/
	id:number
	/**等级*/
	level:number
	/**升级需要的经验值*/
	exp:number
	/**生命值*/
	hp:number
	/**法力值（资源条）*/
	mp:number
	/**体力*/
	vitality:number
	/**力量*/
	strength:number
	/**智力*/
	intellect:number
	/**物理攻击*/
	atk:number
	/**魔法攻击力*/
	matk:number
	/**防御力*/
	armor:number
	/**暴击率*/
	crit:number
	/**是否是最高等级*/
	isMaxLevel:boolean
 } 
export class PlayerLevelAttributeConfig extends ConfigBase<IPlayerLevelAttributeElement>{
	constructor(){
		super(EXCELDATA);
	}

}