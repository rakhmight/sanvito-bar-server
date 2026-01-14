import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify"
import APIError from '../../exceptions/api-v1'
import 'dotenv/config'
import { parse, isValid } from '@telegram-apps/init-data-node';


export default async function(req:FastifyRequest, rep:FastifyReply, done:HookHandlerDoneFunction){
    try {
            const { initData }  = req.headers

            const isInitDataValid = isValid(
                initData as string,
                process.env.BOT_TOKEN!,
            );
            
            if(!isInitDataValid) throw Error('no-auth')

            const admins = process.env.DB_USER
            const userID = parse(initData as string).user?.id

            if(!userID) throw Error('bad-req')
            if(!admins!.includes(''+userID)) throw Error('no-access')

    } catch (error) {
        return APIError(error as Error, rep, req)
    }
}