import { GameConfig } from "../../configs/GameConfig";
import { MPlugin } from "../../framework/DI/MContainer";
import { MObject } from "../../framework/Object/MObject";
import { MathTool } from "../../tools/MathTool";
import { PlayerAttributeSet } from "../AttributeModule/PlayerAttributeSet";
import { ArmorData } from "./ArmorData";

@MPlugin()
export abstract class ArmorBase extends MObject{
        /**持有者 */
        owner:Player;
        /**持有者属性 */
        ownerAttribute:PlayerAttributeSet;
    
        /**防具uuid */
        public uuid:string;
        /**防具id */
        abstract aid:number;
        /**防具种类id */
        public aTid:number;
        /**防具部位id */
        private aPid:number;
        /**品级 */
        private quality:number;
        // 防御力
        private def:number;
        // 体力
        private vit:number;
        // 力量
        private str:number;
        // 智力
        private int:number;
    
        initByData(data:ArmorData):void{
            this.uuid = data.uuid;
            this.aid = data.aid;
            this.aTid = data.aTid;
            this.aPid = data.aPid;
            this.quality = data.quality;
            this.def = data.def;
            this.vit = data.vit;
            this.str = data.str;
            this.int = data.int;
            this.useEffet1 = data.useEffet1;
            this.useEffet2 = data.useEffet2;
            this.useEffet3 = data.useEffet3;
            this.useEffet4 = data.useEffet4;
        }
    
        init(){
            let armorConfig = GameConfig.ArmorObj.getElement(this.aid);
            this.aTid = armorConfig.type;
            this.aPid = armorConfig.body;
            this.quality = armorConfig.quality;
            this.def = armorConfig.def;
            this.vit = armorConfig.vit;
            this.str = MathTool.normalDistribution(armorConfig.str[0],armorConfig.str[1]);
            this.int = MathTool.normalDistribution(armorConfig.int[0],armorConfig.int[1]);
        }

        abstract refesh(): void;
    
        equip(){
            this.ownerAttribute.def.add(this.def);
            this.ownerAttribute.vit.add(this.vit);
            this.ownerAttribute.str.add(this.str);
            this.ownerAttribute.int.add(this.int);
 
    
            if(this.useEffet1){
                this.excuteEffet1();
            }
            if(this.useEffet2){
                this.excuteEffet2();
            }
            if(this.useEffet3){
                this.excuteEffet3();
            }
            if(this.useEffet4){
                this.excuteEffet4();
            }
        }
    
        unEquip():void{
            this.ownerAttribute.def.sub(this.def);
            this.ownerAttribute.vit.sub(this.vit);
            this.ownerAttribute.str.sub(this.str);
            this.ownerAttribute.int.sub(this.int);
    
            if(this.useEffet1){
                this.unExcuteEffet1();
            }
            if(this.useEffet2){
                this.unExcuteEffet2();
            }
            if(this.useEffet3){
                this.unExcuteEffet3();
            }
            if(this.useEffet4){
                this.unExcuteEffet4();
            }
    
            //Todo:添加进背包
        }
    
        // 特殊词条1
        abstract useEffet1:boolean;
        abstract effect1Desc:string;
        abstract excuteEffet1():void;
        abstract unExcuteEffet1():void;
        // 特殊词条2
        abstract useEffet2:boolean;
        abstract effect2Desc:string;
        abstract excuteEffet2():void;
        abstract unExcuteEffet2():void;
        // 特殊词条3
        abstract useEffet3:boolean;
        abstract effect3Desc:string;
        abstract excuteEffet3():void;
        abstract unExcuteEffet3():void;
        // 特殊词条4
        abstract useEffet4:boolean;
        abstract effect4Desc:string;
        abstract excuteEffet4():void;
        abstract unExcuteEffet4():void;
    
        //生成持久化数据体
        getData():ArmorData{
            let data = new ArmorData();
            data.uuid = this.uuid;
            data.aid = this.aid;
            data.aTid = this.aTid;
            data.aPid = this.aPid;
            data.quality = this.quality;
            data.def = this.def;
            data.vit = this.vit;
            data.str = this.str;
            data.int = this.int;
            data.useEffet1 = this.useEffet1;
            data.useEffet2 = this.useEffet2;
            data.useEffet3 = this.useEffet3;
            data.useEffet4 = this.useEffet4;
            return data;
        }
}