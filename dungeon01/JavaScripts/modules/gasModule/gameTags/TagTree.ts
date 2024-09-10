import { MPlugin } from "../../../framework/DI/MContainer";
import { MObject } from "../../../framework/Object/MObject";
import { GameTags } from "./GameTags";
import { TagNode } from "./TagNode";

@MPlugin()
export class TagTree extends MObject{
    father: GameTags;
    root: TagNode;
    depthMap = new Map<number, Map<string,TagNode>>();
    // 标签总数(包含重复)
    count:number = 0;
    tags: string[] = [];
    protected constructor() {
        super();
        this.root = new TagNode('root');
    }

    init() {
        console.warn('TagTree init')
        this.count = 0;
    }

    addTag(tagPath: string): boolean {
        let tagNames: string[] = null;
        try{
            tagNames = tagPath.split('.');
        }catch(e){
            console.error(`添加标签失败: ${tagPath}`);
            return false;
        }
        this.tags.push(tagPath);
        // console.log(`添加标签: ${tagPath}`);
        if(SystemUtil.isServer()){
            this.father.operation.addOperation(tagPath);
        }
        let currentNode = this.root;
        let newTag = false;
        let checkTag = "";
        for(let i = 0; i < tagNames.length; i++){
            let last = false;
            if(i == tagNames.length - 1){
                last = true;
            }
            if(!this.depthMap.has(i+1)){
                this.depthMap.set(i+1, new Map<string, TagNode>());
            }
            let depthTag = this.depthMap.get(i+1);
            let tagName = checkTag + tagNames[i];
            if(depthTag.has(tagName)){
                currentNode = depthTag.get(tagName);
                currentNode.count++;
                if(last){
                    newTag = false;
                }
            }else{
                currentNode = currentNode.addChild(tagNames[i]);
                depthTag.set(tagName, currentNode);
                if(last){
                    newTag = true;
                }
            }
            checkTag += tagNames[i] + '.';
        }
        this.count++;
        return newTag;
    }


    removeTag(tagPath: string): boolean {
        let tagNames: string[] = null;
        try{
            tagNames = tagPath.split('.');
        }catch(e){
            console.error(`移除标签失败1: ${tagPath}`);
            return false;
        }

        let index = this.tags.indexOf(tagPath);
        if(index != -1){
            this.tags.splice(index, 1);
        }
        if(SystemUtil.isServer()){
            this.father.operation.removeOperation(tagPath);
        }

        let currentNode = this.root;
        let removeTag = false;
        let allNode = [];
        for(let i = 0; i < tagNames.length; i++){
            let tagName = tagNames[i];
            let childNode = currentNode.findChild(tagName);
            if(!childNode){
                console.error(`移除标签失败2: ${tagPath} ${tagName}`);
                return false;
            }
            allNode.push(childNode);
            currentNode = childNode;
        }
        let checkTag = tagNames.concat();
        for(let i = allNode.length - 1; i >= 0; i--){
            let last = false;
            if(i == allNode.length - 1){
                last = true;
            }
            let node = allNode[i];
            node.count--;
            if(node.count == 0){
                let parent = node.parent;
                parent.removeChild(node.name);
                this.depthMap.get(node.depth).delete(checkTag.join('.'));
                this.count--;
                if(last){
                    removeTag = true;
                }
            }
            checkTag.pop();
        }
        return removeTag;
    }

    hasTag(tagPath: string): boolean {
        let tagNames: string[] = null;
        try{
            tagNames = tagPath.split('.');
        }catch(e){
            console.error(`查找标签失败: ${tagPath}`);
            return false;
        }
        let currentNode = this.root;
        for(let i = 0; i < tagNames.length; i++){
            let tagName = tagNames[i];
            let childNode = currentNode.findChild(tagName);
            if(!childNode){
                return false;
            }
            currentNode = childNode;
        }
        return true;
    }

    getTagCount(): number {
        return this.count;
    }
}
