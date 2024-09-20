import { MObject } from "../../framework/Object/MObject";

export abstract class WeaponBase extends MObject{
    /**持有者 */
    owner:Player;

    /**武器id */
    abstract wid:number;
    /**武器种类id */
    abstract wtid:number;
    // 物理攻击
    private atk:number;
    // 魔法攻击
    private matk:number;
    // 力量
    private str:number;
    // 智力
    private int:number;
    // 品级
    private quality:number;

    initDefaultData(): void {
        this.atk = 0;
        this.matk = 0;
        this.str = 0;
        this.int = 0;
        this.quality = 0;
    }

    // 特殊词条1
    abstract useEffet1:boolean;
    abstract excuteEffet1():void;
    // 特殊词条2
    abstract useEffet2:boolean;
    abstract excuteEffet2():void;
    // 特殊词条3
    abstract useEffet3:boolean;
    abstract excuteEffet3():void;
    // 特殊词条4
    abstract useEffet4:boolean;
    abstract excuteEffet4():void;
}