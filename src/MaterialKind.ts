export enum MaterialEnum {
    CHIRAL_CRYSTALS = "Chiral crystals",
    RESINS = "Resins",
    METALS = "Metals",
    CERAMICS = "Ceramics",
    CHEMICALS = "Chemicals",
    SPECIAL_ALLOYS = "Special alloys",

}

export const MaterialKind = new Map<MaterialEnum, string> ([
    // [MaterialEnum.CHIRAL_CRYSTALS, MaterialEnum.CHIRAL_CRYSTALS.valueOf()],
    // [MaterialEnum.RESINS, MaterialEnum.RESINS.valueOf()],
    [MaterialEnum.METALS, MaterialEnum.METALS.valueOf()],
    [MaterialEnum.CERAMICS, MaterialEnum.CERAMICS.valueOf()],
    // [MaterialEnum.CHEMICALS, MaterialEnum.CHEMICALS.valueOf()],
    // [MaterialEnum.SPECIAL_ALLOYS, MaterialEnum.SPECIAL_ALLOYS.valueOf()]
]);

export const Amounts = new Map<MaterialEnum, number[]> ([
    [MaterialEnum.METALS, [50, 100, 200, 400, 600, 800, 1000]],
    [MaterialEnum.CERAMICS, [40, 80, 160, 320, 480, 640, 800]]
]);

