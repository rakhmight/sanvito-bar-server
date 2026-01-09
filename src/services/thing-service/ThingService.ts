import fs from 'fs/promises';
import path from 'path'
import { ThingModel } from '../../models/thing/ThingModel';
import ThingDTO from '../../dtos/thing-dto/ThingDTO';

export const addThing = async (data: Omit<ThingI, '_id'>) => {

    const sameProductName = await ThingModel.findOne({ productName: data.productName })
    if(sameProductName) throw new Error('dubl-thing')

    const thing = await ThingModel.create(data)

    // if(imageFile){
    //     const bufferData = await imageFile.toBuffer()
    //     const file = await fs.writeFile(path.join(__dirname, `../../store/${thing._id}.png`), bufferData)
    // }

    return ThingDTO(thing)
}

export const addImage = async (data: any, id: string) => {
    
    if(!data && !id) throw new Error('not-found')
    const bufferData = await data.toBuffer()

    const fileName = `${id}.png`

    const thingData = await ThingModel.updateOne({_id: id}, {
        image: fileName
    }, { new: true })

    if(thingData){
        // save to fs
        const file = await fs.writeFile(path.join(__dirname, `../../store/${fileName}`), bufferData)

        return ThingDTO(thingData)
    }
}

export const deleteThing = async (data: Array<string>) => {
    const thingsData = await ThingModel.deleteMany({ _id: { $in: data } })
    return thingsData
}

export const getThings = async () => {
    const things = await ThingModel.find()
    const thingsData = things.map(f => ThingDTO(f))

    return thingsData
}