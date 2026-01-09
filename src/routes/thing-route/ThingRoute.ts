import { 
    FastifyInstance, 
    FastifyPluginOptions, 
    FastifyPluginAsync 
} from 'fastify';
import fp from 'fastify-plugin';
import APIError from '../../exceptions/api-v1'
import { addImage, addThing, deleteThing, getThings } from '../../services/thing-service/ThingService';
import authMiddleware from '../../middlewares/authMiddleware';

const ThingRoute: FastifyPluginAsync = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    fastify.post<RouteWithData<ReqData<Omit<ThingI, '_id'>>>>('/api/v1/things', { preHandler: authMiddleware } , async (req, rep) =>{
        try{
            const thingData = await addThing(req.body.data)

            return rep.code(200).send({ statusCode: 200, data: thingData })
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    
    })
    
    fastify.post<RouteWithParams<{ id: string }>&RouteWithData<any>>('/api/v1/things/image/:id', { preHandler: authMiddleware } , async (req, rep) =>{
        try{
            const thingID = await req.params.id
            const imageFile = await req.file()
            const imageData = await addImage(imageFile, thingID)

            return rep.code(200).send({ statusCode: 200, data: imageData })
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    
    })

    fastify.delete<RouteWithData<ReqData<Array<string>>>>('/api/v1/things', { preHandler: authMiddleware }, async (req, rep) =>{
        try{
            const thingData = await deleteThing(req.body.data)

            return rep.code(200).send({ statusCode: 200, data: thingData })
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    
    })

    fastify.get('/api/v1/things', async (req, rep) =>{
        try {
            const thingsData = await getThings()            

            if(thingsData){
                return rep.code(200).send({ statusCode: 200, data: thingsData })
            }
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })
}

export default fp(ThingRoute)