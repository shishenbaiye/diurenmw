
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Bag/MenuPropContent.ui
*/

import { GameEventBus } from "../../../common/eventBus/EventBus";
import MenuPropContent_Generate from "../../../ui-generate/Bag/MenuPropContent_generate";
import BagAttributeUI from "./BagAttributeUI";
import BagManagerUI from "./BagManagerUI";
import PlayerDataUI from "./PlayerDataUI";


@UIBind('UI/Bag/MenuPropContent.ui')
export default class MenuPropContent extends MenuPropContent_Generate {
 
	bagAttributeUIObj : BagAttributeUI;
	playerDataUIObj : PlayerDataUI;
	bagManagerUIObj : BagManagerUI;

	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		this.canUpdate = false;
		this.layer = UILayerMiddle;
        

		
		this.buttonPlayerInfo.onClicked.add(this.onPlayerInfoClick.bind(this));
		GameEventBus.on("AttributeModule_Change", this.onChangeAttribute.bind(this));
	}

	init() {
		this.playerLevel.text = BagAttributeUI.level.toString();
		this.playerName.text = AccountService.getNickName();
		this.updateAttributeUI();
		this.updatePlayerDataUI();
		this.updateBagManagerUI();
	}

	updatePlayerDataUI() {
		if(!this.playerDataUIObj)
		{
			this.playerDataUIObj = UIService.create(PlayerDataUI);
			this.playerDataCanvas.addChild(this.playerDataUIObj.uiObject);
			this.playerDataUIObj.uiObject.position = new mw.Vector2(0, 0);
			this.playerDataUIObj.uiObject.size = this.playerDataCanvas.size;
			this.playerDataUIObj.uiObject.visibility = mw.SlateVisibility.Visible;
		}
	}

	updateAttributeUI() {
		if(!this.bagAttributeUIObj)
		{
			this.bagAttributeUIObj = UIService.create(BagAttributeUI);
			this.attributeCanvas.addChild(this.bagAttributeUIObj.uiObject);
			this.bagAttributeUIObj.uiObject.position = new mw.Vector2(0, 0);
			this.bagAttributeUIObj.uiObject.size = this.attributeCanvas.size;
			this.bagAttributeUIObj.uiObject.visibility = mw.SlateVisibility.Hidden;
		}
	}

	updateBagManagerUI() {
		if(!this.bagManagerUIObj)
		{
			this.bagManagerUIObj = UIService.create(BagManagerUI);
			this.bagCanvas.addChild(this.bagManagerUIObj.uiObject);
			this.bagManagerUIObj.uiObject.position = new mw.Vector2(0, 0);
			this.bagManagerUIObj.uiObject.size = this.bagCanvas.size;
			this.bagManagerUIObj.uiObject.visibility = mw.SlateVisibility.Visible;
			this.bagManagerUIObj.init();
		}
	}

	protected onPlayerInfoClick() {
		this.bagAttributeUIObj.uiObject.visibility = mw.SlateVisibility.Visible;
	}

	onChangeAttribute (attrName:string,value:number,ownerId:string) {
		this.init();
	}
}
 