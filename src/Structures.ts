import {MaterialEnum, MaterialKind} from "./MaterialKind";

export class Structures {

    want: Map<MaterialEnum, number> = new Map();
    have: Map<MaterialEnum, number> = new Map();
    id: number;

    constructor(id: number) {
        this.id = id;
        for (let key of MaterialKind.keys()) {
            this.want.set(key, 0)
            this.have.set(key, 0)
        }
    }
}