export class PlayerData {

    name: string

    vip: boolean


    public copy(): PlayerData {
        let newData = new PlayerData();
        newData.name = this.name;
        newData.vip = this.vip;
        return newData;
    }
}