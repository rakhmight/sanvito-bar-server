export default function(thing:ThingI):ThingDTOI{
    const thingDTO:ThingDTOI = {
        id: thing._id,
        manufacturer: thing.manufacturer,
        productName: thing.productName,
        country: thing.country,
        region: thing.region,
        typeOfAlcohol: thing.typeOfAlcohol,
        variety: thing.variety,
        typeOfDrink: thing.typeOfDrink,
        strength: thing.strength,
        aroma: thing.aroma,
        taste: thing.taste,
        class: thing.class,
        price: thing.price,
        image: thing.image,
    }

    return thingDTO
}