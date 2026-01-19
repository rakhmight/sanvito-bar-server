import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify"
import APIError from '../../exceptions/api-v1'
import 'dotenv/config'
import { parse, isValid } from '@telegram-apps/init-data-node';


export default async function(req:FastifyRequest, rep:FastifyReply, done:HookHandlerDoneFunction){
    try {
            const { initdata }  = req.headers

            const isInitDataValid = isValid(
                initdata as string,
                process.env.BOT_TOKEN!,
            );
            
            if(!isInitDataValid) throw Error('un-auth')

            const admins = process.env.ADMINS
            const userID = parse(initdata as string).user?.id

            if(!userID) throw Error('bad-req')
            if(!admins!.includes(''+userID)) throw Error('no-access')

    } catch (error) {
        return APIError(error as Error, rep, req)
    }
}