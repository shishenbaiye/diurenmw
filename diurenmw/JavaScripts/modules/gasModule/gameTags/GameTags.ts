import { MFramework } from "../../../framework/MFramework";
import TagOperation from "./TagOperation";
import { TagTree } from "./TagTree";

@Component
export class GameTags extends Script {

    // 当前标签容器名
    @Property({ replicated: true })
    public Gas_GameTags_Name = "GameTags_Script";

    // 双端同步当前标签
    @Property({ replicated: true })
    private tags: string[] = [];

    // 双端同步标签操作
    @Property({ replicated: true, onChanged: 'onTagsChanged' })
    public operation: TagOperation = new TagOperation();

    private currentOperationId: number = 0;

    addTagAction: Action1<string> = new Action1<string>();
    removeTagAction: Action1<string> = new Action1<string>();


    private tagTree: TagTree = null;
    init() {
        this.tagTree = MFramework.createObject(TagTree) as TagTree;
        this.tagTree.father = this;
        this.tags.forEach(tag => {
            this.tagTree.addTag(tag);
        })
    }
    protected onStart(): void {
        console.warn('GameTags onStart');
        this.init();
    }
    /************************************************************************************************************************ */
    // 添加标签
    addTag(tag: string) {
        let res = this.tagTree.addTag(tag);
        if (SystemUtil.isServer()) {
            this.tags = this.tagTree.tags;
        }
        if (res) {
            this.addTagAction.call(tag);
        }
    }

    // 删除标签
    removeTag(tag: string) {
        let res = this.tagTree.removeTag(tag);
        if (SystemUtil.isServer()) {
            this.tags = this.tagTree.tags;
        }
        if (res) {
            this.removeTagAction.call(tag);
        }
    }

    // 是否拥有标签
    hasTag(tag: string): boolean {
        return this.tagTree.hasTag(tag);
    }

    // 获取标签总数
    getTagCount(): number {
        return this.tagTree.getTagCount();
    }

    // 获取所有标签
    getAllTags(): string[] {
        return this.tagTree.tags;
    }

    private onTagsChanged(path: string, value: unknown, oldVal: unknown) {
        // let isShowLog = false
        // if (this.Gas_GameTags_Name == "ASC_GameTags") isShowLog = true;
        if (this.operation.operationId == this.currentOperationId) {
            return;
        }
        this.currentOperationId = this.operation.operationId;
        this.operation.operationIdList.forEach((id, index) => {
            if (this.operation.currentOperationTypeList[index] == 1) {
                // if (isShowLog)
                    // console.warn('onTagsChanged', id, this.operation.currentOperationTypeList[index], this.operation.currentOperationTagList[index]);
                this.addTag(this.operation.currentOperationTagList[index]);
            }
            if (this.operation.currentOperationTypeList[index] == 2) {
                // if (isShowLog)
                    // console.warn('onTagsChanged', id, this.operation.currentOperationTypeList[index], this.operation.currentOperationTagList[index]);
                this.removeTag(this.operation.currentOperationTagList[index]);
            }
        })
    }
}






