/**N叉数 */
export class Tree<T>{
    // 根节点
    private _root: TreeNode<T>;
    // 树大小
    private _size: number;
    // 树深度
    private _depth: number;
    // 节点索引
    private _nodeMap: Map<number, TreeNode<T>> = new Map<number, TreeNode<T>>();
    constructor() {
        this._root = new TreeNode<T>(null);
        this._size = 0;
        this._depth = 0;
    }

    public getRoot(): TreeNode<T> {
        return this._root;
    }

    public setRoot(id:number,value: TreeNode<T>) {
        this._root = value;
        this._nodeMap.clear();
        this._size = 0;
        this._depth = 0;
        this._nodeMap.set(id, this._root);
        this._root.parent = null;
    }

    public get size(): number {
        return this._size;
    }

    public set size(value: number) {
        this._size = value;
    }

    public get depth(): number {
        return this._depth;
    }

    public set depth(value: number) {
        this._depth = value;
    }

    public addNode(id:number,data: T, parent: TreeNode<T> = null): TreeNode<T>{
        let node = new TreeNode<T>(data, parent);
        if (parent == null) {
            parent = this._root;
        }
        parent.addChild(node);
        this._size++;
        this._depth = Math.max(this._depth, this._root.depth);
        this._nodeMap.set(id, node);
        return node;
    }

    public removeNode(node: TreeNode<T>) {
        if (node.parent != null) {
            node.parent.removeChild(node);
        }else if(node.isRoot()){
            this._root.children = [];
            this.size = 0;
            this.depth = 0;
        }
        this.size -= node.size;
    }

    public getNode(id: number): TreeNode<T>{
        return this._nodeMap.get(id);
    }

    public clear() {
        this._root.clearChildren();
        this.size = 0;
        this.depth = 0;
    }

}

export class TreeNode<T>{
    // 数据
    private _data: T;
    // 父节点
    private _parent: TreeNode<T>;
    // 子节点
    private _children: Array<TreeNode<T>>;
    // 深度
    private _depth: number;
    // 节点大小
    private _size: number;

    constructor(data: T, parent: TreeNode<T> = null) {
        this._data = data;
        this._parent = parent;
        this._children = new Array<TreeNode<T>>();
        this._depth = 0;
    }

    public get data(): T {
        return this._data;
    }

    public set data(value: T) {
        this._data = value;
    }

    public get parent(): TreeNode<T> {
        return this._parent;
    }

    public set parent(value: TreeNode<T>) {
        this._parent = value;
    }

    public get children(): Array<TreeNode<T>> {
        return this._children;
    }

    public set children(value: Array<TreeNode<T>>) {
        this._children = value;
    }

    public get depth(): number {
        return this._depth;
    }

    public set depth(value: number) {
        this._depth = value;
        if(this._parent != null){
            this._parent.depth = Math.max(this._parent.depth, value + 1);
        }
    }

    public get size(): number {
        return this._size;
    }

    public set size(value: number) {
        this._size = value;
        if(this._parent != null){
            this._parent.size = this._parent.size + (value - this._size);
        }
    }

    public addChild(child: TreeNode<T>) {
        this.depth = Math.max(this._depth, child.depth + 1);
        this.size = this.size + child.size + 1;
        this._children.push(child);
    }

    public removeChild(child: TreeNode<T>) {
        let index = this._children.indexOf(child);
        if (index != -1) {
            this.size = this.size - child.size - 1;
            this._children.splice(index, 1);
            if(this._children.length == 0){
                this.depth = 0;
            }
            if(this._depth == child.depth + 1){
                let maxDepth = 0;
                for(let i = 0; i < this._children.length; i++){
                    maxDepth = Math.max(this.depth, this._children[i].depth + 1);
                }
                this.depth = maxDepth;
            }
            
        }
    }

    public clearChildren() {
        this._children = new Array<TreeNode<T>>();
        this.size = 0;
        this.depth = 0;
    }

    public isLeaf(): boolean {
        return this._children.length == 0;
    }

    public isRoot(): boolean {
        return this._parent == null;
    }
}