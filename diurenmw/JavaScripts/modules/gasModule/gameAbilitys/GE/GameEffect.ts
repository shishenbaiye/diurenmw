
import { Constructor } from "../../../../framework/DI/MContainer";
import { MObject } from "../../../../framework/Object/MObject";
import { AbilitySystemComponent } from "../ASC/AbilitySystemComponent";
import { GameEffectComponent } from "./GameEffectComponent";
import { EGameEffectCalculationType, EGameEffectDurationType, EGameEffectPeriodicInhibitionPolicy } from "./GameEffectType";

export abstract class GameEffect extends MObject {

    /**ownerAsc */
    geContext: { sourceASC: AbilitySystemComponent, targetASC: AbilitySystemComponent, sourceEffect: GameEffect };

    // #region 持续时间
    /**持续时间策略 */
    abstract durationPolicy: EGameEffectDurationType;

    /**持续时间的计算类型 */
    abstract durationCalculationType: EGameEffectCalculationType;

    /**持续时间 */
    abstract duration: number;

    /**周期（只有在持续时间策略为持续一段时间和永久的时候才会生效） */
    abstract period: number;

    /**周期是否立即生效 */
    abstract periodInstant: boolean;

    /**周期响应策略 */
    abstract periodicInhibitionPolicy: EGameEffectPeriodicInhibitionPolicy;
    // #endregion

    // #region GamePlay效果
    /**组件 */
    abstract geComponent: GameEffectComponent[];

    /*属性修改 */
    abstract geAttribute: { [key: string]: number }[]
    // #endregion

    private isActivate: boolean = false;
    canApply(): boolean {
        if (this.geComponent) {
            for (let i = 0; i < this.geComponent.length; i++) {
                if (!this.geComponent[i].canApply(this.geContext)) {
                    return false;
                }
            }
            return true;
        }
        return true;
    }

    active() {
        this.isActivate = true;
        if (this.durationPolicy === EGameEffectDurationType.Instant) {
            this.activeInstant();
        }
        if (this.durationPolicy === EGameEffectDurationType.Infinite) {
            this.activeInfinite();
        }
        if (this.durationPolicy === EGameEffectDurationType.HasDuration) {
            this.activeHasDuration();
        }
    }

    /**瞬时 */
    private activeInstant() {
        this.apply();
        this.end();
    }

    /**无限 */
    private activeInfinite() {

    }

    private isStartTime: boolean = false;
    private currentTime: number;
    /**持续一段时间 */
    private activeHasDuration() {
        if (this.period && this.period != 0 && !this.periodInstant) {
            this.currentPeriodTime = 0;
            this.isStartPeriod = true
        } else {
            this.apply();
            this.currentTime = 0;
            this.isStartTime = true;
        }
    }

    /**应用组件效果 */
    private apply() {
        this.geComponent.forEach((geComponent) => {
            geComponent.active(this.geContext);
        });
        this.isTickComponent = true;
    }


    /**结束当前效果 */
    protected end() {
        this.isActivate = false;
        this.isTickComponent = false;
        this.geComponent.forEach((geComponent) => {
            geComponent.end(this.geContext);
        });
        this.geContext.targetASC.endEffect(this);
    }

    /**检查是否能结束，如果是周期则从重新开始 */
    private isStartPeriod: boolean = false;
    private currentPeriodTime: number;
    private checkEnd() {
        if (this.period && this.period != 0) {
            // 先结束一轮效果等待周期
            this.isActivate = false;
            this.isTickComponent = false;
            this.geComponent.forEach((geComponent) => {
                geComponent.end(this.geContext);
            });
            this.currentTime = 0;
            this.currentPeriodTime = 0;
            this.isStartPeriod = true;
        } else {
            this.end();
        }
    }

    /**获取剩余时间 */
    getRestTime(): number {
        if (this.durationPolicy == EGameEffectDurationType.HasDuration && this.isStartTime) {
            return this.duration - this.currentTime;
        } else {
            throw new Error("当前效果不是持续时间类型,无法获取剩余时间");
        }
    }

    private isTickComponent: boolean = false;
    update(dt: number) {
        if (this.isTickComponent) {
            this.geComponent.forEach((geComponent) => {
                geComponent.update(dt);
            });
        }

        if (this.isStartTime) {
            this.currentTime += dt;
            if (!this.duration) this.duration = 0;
            if (this.currentTime >= this.duration) {
                this.currentTime = this.duration;
                this.isStartTime = false;
                this.checkEnd();
            }
        }

        if (this.isStartPeriod) {
            this.currentPeriodTime += dt;
            if (this.currentPeriodTime >= this.period) {
                this.currentPeriodTime = this.period;
                this.isStartPeriod = false;
                this.active();
            }
        }
    }

    init() {
        this.geComponent.forEach((geComponent) => {
            geComponent.init();
        });
    }
}