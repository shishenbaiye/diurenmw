import { JewelryPart } from "./JewelryType";

export class JewelryData {
    /**首饰uuid */
    public uuid: string;
    /**首饰id */
    public aid: number;
    /**防具部位：1.戒指 2.项链 3.手镯*/
    public aPid: JewelryPart;
    /**品级 */
    public quality: number;
    // 防御力
    public def: number;
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