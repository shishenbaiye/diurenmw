import { oTraceWarning } from "odin";

export default class EnvTool {

    /**
     * 九位数组转位置
     * @param arr 
     * @returns 
     */
    static arrToVec(arr: Array<number>, inform: string = ``): mw.Transform {
        if (!arr || arr.length != 9) {
            oTraceWarning(` arrToVec lengther erro ${arr} :${inform}`);
            return null;
        }
        let curArr = arr.concat();
        let newLoc = new mw.Vector(curArr[0], curArr[1], curArr[2]);
        let newRoc = new mw.Rotation(curArr[3], curArr[4], curArr[5]);
        let newScale = new mw.Vector(curArr[6], curArr[7], curArr[8]);
        let newTran = new mw.Transform(newLoc, newRoc, newScale);
        return newTran;
    }

    // /**
    //  * 当前时间最近前一位索引 （没找到使用第一位,当前时间就是索引返回自身）
    //  * @param weatherId 天气ID
    //  * @param curIndex 索引
    //  * @returns 
    //  */
    // static findNextIndex(weatherId: number, curIndex: number): ITimeElement {
    //     let allElement = GameConfig.Time.findElements(`WeatherType`, weatherId);
    //     if (allElement.length > 0) {
    //         allElement.sort((a, b) => a.Time - b.Time);
    //         let index = 0;
    //         for (let i = 0; i < allElement.length; i++) {
    //             // oTraceWarning(`findNextIndex : ${i}  time : ${allElement[i].Time}`);
    //             if (allElement[i].Time == curIndex) {
    //                 index = i;
    //                 break;
    //             } else if (allElement[i].Time > curIndex) {
    //                 index = i - 1;
    //                 if (index < 0) index = 0;
    //                 break;
    //             }
    //         }
    //         return allElement[index];
    //     } else {
    //         oTraceError(`findNextIndex no data`)
    //     }
    // }

    // /**
    //  * 当前时间最近后一位索引 （当前时间就是索引返回自身下一位，超过长度或者没有找到返回第一位）
    //  * @param weatherId 天气ID
    //  * @param curIndex 当前索引
    //  * @returns 时间表后一位索引
    //  */
    // static findBackIndex(weatherId: number, curIndex: number): ITimeElement {
    //     let allElement = GameConfig.Time.findElements(`WeatherType`, weatherId);
    //     if (allElement.length > 0) {
    //         allElement.sort((a, b) => a.Time - b.Time);
    //         let index = 0;
    //         for (let i = 0; i < allElement.length; i++) {
    //             // oTraceWarning(`findNextIndex : ${i}  time : ${allElement[i].Time}`);
    //             if (allElement[i].Time == curIndex) {
    //                 index = i + 1
    //                 break;
    //             } else if (allElement[i].Time > curIndex) {
    //                 index = i;
    //                 break;
    //             }
    //         }
    //         if (index >= allElement.length) index = 0;
    //         return allElement[index];
    //     } else {
    //         oTraceError(`findNextIndex no data`)
    //     }
    // }

    /** 比例计算 */
    static rateFun(back: number, front: number, rate: number): number {
        return ((back - front) * rate + front)
    }
    /** 转为时间戳 */
    static getStamp(hour: number, minute: number, second: number): number {
        return hour * 60 + minute;
    }

    /** 总权重 */
    private static totalWeight: number = 0;
    private static weightList: Array<Vector> = [];
    /** 初始化权重 */
    static initWeight(): void {
        this.totalWeight = 0;
        this.weightList = [];
    }
    /**
     * 设置权重
     * @param id 随机ID
     * @param weight 权重
     */
    static setWeight(id: number, weight: number) {
        this.weightList.push(new Vector(id, this.totalWeight, this.totalWeight + weight));
        this.totalWeight += weight;
    }
    /**
     * 获取随机权重
     * @returns 
     */
    static randomWeight(): number {
        let weight = Math.random() * this.totalWeight;
        for (let i = 0; i < this.weightList.length; i++) {
            let v = this.weightList[i];
            if (weight >= v.y && weight < v.z) {
                return v.x;
            }
        }
        return 0;
    }
}

export enum WeatherType {
    weather1 = 1,
    weather2 = 2,
    weather3 = 3,
    weather4 = 4,
    /** 长度 */
    length
};
export namespace Time {
    /** 渐变刷新频率 */
    export const FRAMEREFRESHTIME = 10;
}
