import { Singleton } from "../../tools/Singleton";
import { ICharacterInfo } from "./base/ICharacterInfo";

export class AIManager extends Singleton {

    /** ai  同步脚本 */
    private aiScriptMap: Map<number, ICharacterInfo>;

    setScript(id: number, script: ICharacterInfo) {
        this.aiScriptMap.set(id, script);
    }

    delScript(id: number) {
        this.aiScriptMap.delete(id);
    }

    getScript(id: number): ICharacterInfo {
        return this.aiScriptMap.get(id);
    }

    getAllScripts(): ICharacterInfo[] {
        return Array.from(this.aiScriptMap.values());
    }

}