import {MaterialEnum, MaterialKind} from "./MaterialKind";

export class Structure {

    want: Map<MaterialEnum, number> = new Map();
    have: Map<MaterialEnum, number> = new Map();
    id: number;
    title: string;

    constructor(id: number, title: string = `Structure ${id}`) {
        this.id = id;
        this.title = title;
        for (let key of MaterialKind.keys()) {
            this.want.set(key, 0)
            this.have.set(key, 0)
        }
    }
}