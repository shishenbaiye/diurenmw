import { AttributeSet } from "./AttributeSet";
import { AttributeSetData } from "./AttributeSetData";

export const AttributeDataInit = (arg:AttributeSet,varName:string,initValue: number) => {
    let data = new AttributeSetData(arg.gameObject.gameObjectId,varName,initValue);
    data.ownerAs = arg;
    arg[varName] = data;
};