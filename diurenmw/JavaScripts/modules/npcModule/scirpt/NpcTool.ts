/** 状态判断 */
export function isInState(curState: number, targetState: number) {
    return (curState & targetState) != 0;
}