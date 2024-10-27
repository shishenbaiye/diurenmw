/** Buff信息类 */
@Serializable
export class BuffInfo {

    buffIds: number[] = [];

    times: number[] = [];

    repId: number = 0;

    static id: number = 1;

    static getRepId(): number {
        this.id += 1;
        if (this.id > 1024) {
            this.id = 1;
        }
        return this.id;
    }
}
