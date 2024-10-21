import { RankCustomizedData } from "./RankCustomizedData";
import { RankModuleS } from "./RankModuleS";
import { RankPanel } from "./ui/RankPanel";

export class RankModuleC extends ModuleC<RankModuleS, null> {

    private rankUI: RankPanel;

    protected onStart(): void {
        this.rankUI = UIService.create(RankPanel);
    }

    net_refresh_rank(data: RankCustomizedData[]) {
        this.rankUI.refreshRank(data)
    }
}
