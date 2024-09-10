import { AttributeSet } from "./AttributeSet";
import { AttributeSetData } from "./AttributeSetData";

export const AttributeDataInit = (arg:AttributeSet,varName:string,initValue: number) => {
    arg[varName] = new AttributeSetData(arg.gameObject.gameObjectId,varName,initValue);
};