import { GA } from "./tagClass/Tag_GA";
import { GE } from "./tagClass/Tag_GE";


export class TagContainer {
    static GE = new GE();
    static GA = new GA();
}


console.warn("tags测试1",TagContainer.GE.owner)
console.warn("tags测试2",TagContainer.GE.CoolDown.owner)
console.warn("tags测试3",TagContainer.GE.CoolDown.Mage.owner)

console.warn("tags测试4",TagContainer.GA.owner)
console.warn("tags测试5",TagContainer.GA.CoolDown.owner)