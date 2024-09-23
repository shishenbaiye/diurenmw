import { AttributeModuleS } from "./AttributeModuleS";
import { AttributeModuleData } from "./AttributeModuleData";

export class AttributeModuleC extends ModuleC<AttributeModuleS, AttributeModuleData> {
    protected onStart(): void {
        InputUtil.onKeyDown(Keys.O, () => {
            // 添加一把武器
            this.server.net_OnClick();
        })

        InputUtil.onKeyDown(Keys.P, () => {
            // 添加一把武器
            this.server.net_Onclick2();
        })
    }
}