import { AttributeModuleS } from "./AttributeModuleS";
import { AttributeModuleData } from "./AttributeModuleData";

export class AttributeModuleC extends ModuleC<AttributeModuleS, AttributeModuleData> {
    protected onStart(): void {
        InputUtil.onKeyDown(Keys.O, () => {
            this.server.net_OnClick();
        })
    }
}