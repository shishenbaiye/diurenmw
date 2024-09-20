import { AttributeModuleS } from "./AttributeModuleS";
import { AttributeModuleData } from "./AttributeModuleData";
import { UuidCreater } from "../../tools/UuidCreater";

export class AttributeModuleC extends ModuleC<AttributeModuleS, AttributeModuleData> {
    protected onStart(): void {
        InputUtil.onKeyDown(Keys.O, () => {
            let uuid = UuidCreater.create();
            console.log(`武器uuid：`,uuid);
        })
    }
}