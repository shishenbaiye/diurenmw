import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["Id","Name","Desc","Reward","RewardType","ItemID","RewardID","BigIcon","TaskClass","TaskIcon","DirectLoaction","NeedCount","TaskTime","TaskConditionType","TaskGuide","TaskConditionValue","Bubblelanguage","Endlanguage","Prompt"],["","Language","Language","","","","","","","","","","","","","","Language","Language",""]];
export interface ITaskElement extends IElementBase{
 	/**序号*/
	Id:number
	/**名称*/
	Name:string
	/**描述*/
	Desc:string
	/**获得奖励数量*/
	Reward:number
	/**1=钻石 2=钞票 3=钞票+亲密度 奖励类型：*/
	RewardType:number
	/**道具id*/
	ItemID:string
	/**全屏通用奖励id*/
	RewardID:string
	/**大图展示icon*/
	BigIcon:string
	/**1=每日任务 2=角色事件 3=宠物事件 任务类型：*/
	TaskClass:number
	/**事件完成提示icon*/
	TaskIcon:string
	/**引导位置坐标*/
	DirectLoaction:number
	/**任务完成次数*/
	NeedCount:number
	/**角色和宠物随机事件会出现在xx地方呆xx秒 任务持续时间*/
	TaskTime:number
	/**1.到达指定位置 2.打开某个功能页面 3.接收其他功能触发 4.使用某个物品 （类型|物品id） 5.获得某个物品 （物品id） 6.登录类型 7.停留在某个地方多久（区域id|时间） 8.钓鱼 （1.长度 2.数量 3. 特定鱼 4.卖鱼 ） 9.自定义（引导） 10.交互物交互 11.持续交互（1：浴缸 2.宠物睡觉 3.长椅 4.烟花秀 5.秋千 ） 12.换装（不填随便使用一个） 13.宠物动作 任务完成条件类型
21.完成一次捕捉
22.完成一次聊天*/
	TaskConditionType:number
	/**1.没有引导 2.打开某个页面 （1.服装商店 2.背包） 3.引导目标 任务引导类型*/
	TaskGuide:Array<string>
	/**对应任务完成条件类型的内容（没有就不填）*/
	TaskConditionValue:Array<string>
	/**气泡语*/
	Bubblelanguage:string
	/**结束气泡语*/
	Endlanguage:string
	/**事件提示*/
	Prompt:number
 } 
export class TaskConfig extends ConfigBase<ITaskElement>{
	constructor(){
		super(EXCELDATA);
	}

}