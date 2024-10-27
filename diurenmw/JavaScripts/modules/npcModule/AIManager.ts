import { Singleton } from "../../tools/Singleton";
import { ICharacterBase } from "./interface/ICharacterBase";

export class AIManager extends Singleton {

    private aiScriptMap: Map<number, ICharacterBase>;

    public setScript(id: number, script: ICharacterBase) {
        this.aiScriptMap.set(id, script);
    }

    public delScript(id: number) {
        this.aiScriptMap.delete(id);
    }

    public getScript(id: number): ICharacterBase {
        return this.aiScriptMap.get(id);
    }

    public getAllScripts(): ICharacterBase[] {
        return Array.from(this.aiScriptMap.values());
    }

}