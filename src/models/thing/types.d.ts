declare interface ThingModelI extends ModelExC<ThingI> {
}

declare interface ThingI extends DocumentExC{
    _id: import('mongoose').Schema.Types.ObjectId,
    manufacturer: string,
    productName: string,
    country: string,
    region: string,
    typeOfAlcohol: string,
    variety: string,
    typeOfDrink: string,
    strength: number,
    aroma: string,
    taste: string,
    class: string,
    price: number,
    image: string,
}