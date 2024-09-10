export enum EGameAbilityTriggerSourceType{
    /**event触发，可以反复触发 */
    GameEvent,
    /**当标签添加的时候触发，标签移除时候不结束 */
    OwnedTagAdded,
    /**当标签添加的时候触发，标签移除的时候强制结束 */
    OwnedTagPresent,
}