import { ArmorPart } from "./ArmorType";

export class ArmorData {
    /**防具uuid */
    public uuid: string;
    /**防具id */
    public aid: number;
    /**防具种类：
1.重甲
2.板甲
3.布甲*/
    public aTid: number;
    /**防具部位：
1.头盔
2.上衣
3.下装
4.鞋子*/
    public aPid: ArmorPart;
    /**品级 */
    public quality: number;
    // 防御力
    public def: number;
    // 体力
    public vit: number;
    // 力量
    public str: number;
    // 智力
    public int: number;
    // 使用效果1
    useEffet1: boolean;
    // 使用效果2
    useEffet2: boolean;
    // 使用效果3
    useEffet3: boolean;
    // 使用效果4
    useEffet4: boolean;
}