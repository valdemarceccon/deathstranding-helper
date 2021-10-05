import type {Structure} from "./Structure";
import {Amounts, MaterialEnum, MaterialKind} from "./MaterialKind";

export default class Summary {
    structure: Structure;

    constructor(structure: Structure) {
        this.structure = structure
    }

    public getAmounts(): Map<string, Map<number, number>> {
        let ret = new Map();

        for (let k of MaterialKind.keys()) {
            let amount = this.calcAmounts(k);
            if (amount.size > 0) {
                ret.set(k.valueOf(), this.calcAmounts(k));
            }
            console.log(k);
        }

        return ret;
    }

    private calcAmounts(matKind: MaterialEnum): Map<number, number> {
        let missing = this.structure.want.get(matKind) - this.structure.have.get(matKind);

        if (missing <= 0)
            return new Map();

        if (!Amounts.has(matKind))
            return new Map();


        let total: number = 0;
        let mats = Amounts.get(matKind);

        while (total < missing) {
            let values = mats.filter(v => v <= (missing - total));
            let p: number = 0;

            if (values.length == 0) {
                p = Math.min(...mats);
            } else {
                p = Math.max(...values);
            }
            total += p;
        }
        let combination = this.getCombination(mats, total);
        let ret = [...combination.entries()];
        return new Map(ret.sort((a,b) => a[0]-b[0]));
    }

    private getCombination(possible: number[], total: number): Map<number, number>  {
        let ret: Map<number, number> = new Map();
        let iTotal: number = total;

        while (iTotal > 0) {
            const next: number = Math.max(...possible.filter(v => v <= iTotal))
            let qtNext: number = Math.floor(iTotal / next);
            iTotal -= qtNext * next;
            ret.set(next, qtNext);
        }

        return ret;
    }
}