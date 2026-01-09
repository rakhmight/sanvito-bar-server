import { Schema, model } from 'mongoose'

const schema: Schema = new Schema<ThingI>(
    {
        manufacturer: {
            type: String,
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        region: {
            type: String,
            required: false
        },
        typeOfAlcohol: {
            type: String,
            required: true
        },
        variety: {
            type: String,
            required: false
        },
        typeOfDrink: {
            type: String,
            required: true
        },
        strength: {
            type: Number,
            required: true
        },
        aroma: {
            type: String,
            required: false
        },
        taste: {
            type: String,
            required: false
        },
        class: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: false
        }
    },
    { timestamps: true, strict: true, strictQuery: true }
)

export const ThingModel = model<ThingI, ThingModelI>('Thing', schema)