import { MSingletonPlugin } from "../framework/DI/MContainer";
import { MObject } from "../framework/Object/MObject";

@MSingletonPlugin()
export class KvData extends MObject{

    /**异步设置kv数据 */
    async saveData(key:string,data:any):Promise<DataStorageResultCode>{
        return await DataStorage.asyncSetData(key,data);
    }

    /**异步获取kv数据 */
    async getData(key:string):Promise<DataStorageResult>{
        return await DataStorage.asyncGetData(key);
    }
}