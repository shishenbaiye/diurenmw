import {ConfigBase, IElementBase} from "./ConfigBase";
import {ArmorObjConfig} from "./ArmorObj";
import {JewelryObjConfig} from "./JewelryObj";
import {PlayerLevelAttributeConfig} from "./PlayerLevelAttribute";
import {TaskConfig} from "./Task";
import {WeaponObjConfig} from "./WeaponObj";

export class GameConfig{
	private static configMap:Map<string, ConfigBase<IElementBase>> = new Map();
	/**
	* 多语言设置
	* @param languageIndex 语言索引(-1为系统默认语言)
	* @param getLanguageFun 根据key获取语言内容的方法
	*/
	public static initLanguage(languageIndex:number, getLanguageFun:(key:string|number)=>string){
		ConfigBase.initLanguage(languageIndex, getLanguageFun);
		this.configMap.clear();
	}
	public static getConfig<T extends ConfigBase<IElementBase>>(ConfigClass: { new(): T }): T {
		if (!this.configMap.has(ConfigClass.name)) {
			this.configMap.set(ConfigClass.name, new ConfigClass());
		}
		return this.configMap.get(ConfigClass.name) as T;
	}
	public static get ArmorObj():ArmorObjConfig{ return this.getConfig(ArmorObjConfig) };
	public static get JewelryObj():JewelryObjConfig{ return this.getConfig(JewelryObjConfig) };
	public static get PlayerLevelAttribute():PlayerLevelAttributeConfig{ return this.getConfig(PlayerLevelAttributeConfig) };
	public static get Task():TaskConfig{ return this.getConfig(TaskConfig) };
	public static get WeaponObj():WeaponObjConfig{ return this.getConfig(WeaponObjConfig) };
}