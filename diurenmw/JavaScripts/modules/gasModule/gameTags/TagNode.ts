export class TagNode {
    name: string;
    children: Map<string, TagNode>;
    parent: TagNode | null;
    depth:number;
    count:number;

    constructor(name: string, parent: TagNode | null = null, depth:number = 0) {
        this.name = name;
        this.children = new Map<string, TagNode>();
        this.parent = parent;
        this.depth = depth;
        this.count = 1;
    }


    // 添加子节点
    addChild(tagName: string): TagNode {
        if (!this.children.has(tagName)) {
            const childNode = new TagNode(tagName, this, this.depth + 1);
            this.children.set(tagName, childNode);
            return childNode;
        }else{
            return this.children.get(tagName);
        }    
    }

    removeChild(tagName: string): boolean {
        return this.children.delete(tagName);
    }

    findChild(tagName: string): TagNode | null {
        return this.children.get(tagName) || null;
    }

    getFullPath(): string {
        const path: string[] = [];
        let currentNode: TagNode | null = this;
        while (currentNode) {
            path.unshift(currentNode.name);
            currentNode = currentNode.parent;
        }
        return path.join('.');
    }
}