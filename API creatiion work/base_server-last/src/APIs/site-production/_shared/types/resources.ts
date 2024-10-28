export enum ConstructionResources {
    CONCRETE = 'Concrete',
    CEMENT = 'Cement',
    SAND = 'Sand',
    GRAVEL = 'Gravel',
    BRICKS = 'Bricks',
    STEEL = 'Steel',
    WOOD = 'Wood',
    REBAR = 'Rebar',
    GLASS = 'Glass',
    WIRES = 'Electrical Wires',
    PIPES = 'Pipes',
    TOOLS = 'Hand Tools',
    MACHINERY = 'Machinery',
    HEAVY_EQUIPMENT = 'Heavy Equipment',
    SAFETY_EQUIPMENT = 'Safety Equipment',
    INSULATION = 'Insulation Materials',
    DOORS = 'Doors',
    WINDOWS = 'Windows',
    ROOFING = 'Roofing Materials',
    PAINT = 'Paint',
    PLUMBING = 'Plumbing Fixtures',
    HVAC = 'HVAC Equipment'
}

type ResourcePrices = Record<ConstructionResources, number>

export const resourcePrices: ResourcePrices = {
    [ConstructionResources.CONCRETE]: 120, // Price per unit (example)
    [ConstructionResources.CEMENT]: 50,
    [ConstructionResources.SAND]: 30,
    [ConstructionResources.GRAVEL]: 40,
    [ConstructionResources.BRICKS]: 10,
    [ConstructionResources.STEEL]: 200,
    [ConstructionResources.WOOD]: 80,
    [ConstructionResources.REBAR]: 150,
    [ConstructionResources.GLASS]: 100,
    [ConstructionResources.WIRES]: 25,
    [ConstructionResources.PIPES]: 60,
    [ConstructionResources.TOOLS]: 15,
    [ConstructionResources.MACHINERY]: 5000,
    [ConstructionResources.HEAVY_EQUIPMENT]: 15000,
    [ConstructionResources.SAFETY_EQUIPMENT]: 200,
    [ConstructionResources.INSULATION]: 75,
    [ConstructionResources.DOORS]: 300,
    [ConstructionResources.WINDOWS]: 400,
    [ConstructionResources.ROOFING]: 500,
    [ConstructionResources.PAINT]: 20,
    [ConstructionResources.PLUMBING]: 100,
    [ConstructionResources.HVAC]: 3000
}
