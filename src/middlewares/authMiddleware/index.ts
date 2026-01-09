import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify"
import APIError from '../../exceptions/api-v1'
import 'dotenv/config'


export default async function(req:FastifyRequest, rep:FastifyReply, done:HookHandlerDoneFunction){
    try {
            const { telegramID } = req.headers

            const admins = process.env.DB_USER
            if(!admins!.includes(telegramID as string)) throw Error('no-access')

    } catch (error) {
        return APIError(error as Error, rep, req)
    }
}