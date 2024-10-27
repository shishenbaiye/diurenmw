

export interface IBehavior {
    owner: any;
    /** 当这个行为成立的时候不会去执行下个行为 */
    checkCondition(dt: number): boolean;
    /** 重启行为树 */
    onReset();
}