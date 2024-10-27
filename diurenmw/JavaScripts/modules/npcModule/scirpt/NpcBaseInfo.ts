import { AnimationExController } from "../anim/AnimationExController";
import { AnimationExInfo } from "../anim/AnimationExInfo";
import { ICharacterBase } from "../interface/ICharacterBase";
import { AIType } from "../type/AIType";
import { DamageResultType } from "../type/DamageTyp";
import { CharFightInfo } from "./CharFightInfo";
/** 基础信息 */

@Component
export class NpcBaseInfo extends CharFightInfo implements ICharacterBase {

    @Property({ replicated: true })
    playerId: number = 0;

    @Property({ replicated: true, onChanged: "" })
    aiType: AIType = AIType.None;

    /** 动画播放管理 */
    animExController: AnimationExController;

    protected onPlayerStateChanged(path: string, val: number, oldVal: number) {
        throw new Error("Method not implemented.");
    }


    addBuffs(buffIds: number[], sourceId: number) {
        throw new Error("Method not implemented.");
    }
    clearBuffs() {
        throw new Error("Method not implemented.");
    }
    handleDamage(damage: number, buffIds: number[], skillId?: number, attackIndex?: number, centerPos?: Vector, sourceId?: number): DamageResultType {
        throw new Error("Method not implemented.");
    }
    handleAttack(damage: number, vampireHp: number) {
        throw new Error("Method not implemented.");
    }
    client_playAnim(info: AnimationExInfo) {
        throw new Error("Method not implemented.");
    }
    client_stopAnim(assetId?: string) {
        throw new Error("Method not implemented.");
    }

    die(sourceId?: number, skillId?: number, direct?: Vector) {
        this.clearBuffs();
        this.character.changeState(CharacterStateType.Ragdoll);
        // 攻击冲量
        if (direct) this.character.addImpulse(direct, true);
        //重生
        setTimeout(() => {
            this.rebirth();
        }, 1000 * 5);
    }


    protected onStart(): void {
        super.onStart();
        this.init();
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    private async init(): Promise<void> {
        if (SystemUtil.isServer()) {
            this.useUpdate = true;
            //基础属性同步
        }
        if (SystemUtil.isClient()) {
            await this.character.asyncReady();
            this.animExController = new AnimationExController(this.character);
            this.useUpdate = true;
        }
    }

    protected rebirth() {
        super.rebirth();
    }


}