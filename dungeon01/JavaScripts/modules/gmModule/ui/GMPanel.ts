import { GMBasePanel } from "module_gm";
import GMHUD_Generate from "../../../ui-generate/Gm/GMHUD_generate";
import GMItem_Generate from "../../../ui-generate/Gm/GMItem_generate";

export default class GMPanel extends GMBasePanel<GMHUD_Generate, GMItem_Generate> {
    constructor() {
        super(GMHUD_Generate, GMItem_Generate);
    }

}