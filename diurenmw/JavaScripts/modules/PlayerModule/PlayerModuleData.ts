export class PlayerModuleData extends Subdata {
    @Decorator.persistence()
    playerName: string;

    @Decorator.persistence()
    playerRole: string;

    public refreshName(name: string): void {
        this.playerName = name;
        this.save(true);
    }
}