declare interface ThingDTOI extends Pick<ThingI, 'manufacturer' | 'productName' | 'country' | 'region' | 'typeOfAlcohol' | 'variety' | 'typeOfDrink' | 'strength' | 'aroma' | 'taste' |  'class' | 'price' | 'image'>{
    id: import('mongoose').Schema.Types.ObjectId
}