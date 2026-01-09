import { FastifyReply, FastifyRequest } from 'fastify'

export default function (error:Error, rep:FastifyReply, req:FastifyRequest){
    switch (error.message) {
        // General
        case 'not-found':
            return rep.code(404).send({statusCode: 404, message: `Not found`})
        case 'no-access':
            return rep.code(403).send({statusCode: 403, message: `Access is denied (forbidden)`})
        case 'bad-req':
            return rep.code(400).send({statusCode: 400, message: `Bad request`})
        case 'env':
            req.log.fatal({ actor: 'Server Environment' }, 'One of the environment variables is not set')
            return rep.code(500).send({statusCode: 500, message: `Some technical problems on our side. Sorry`})
        case 'un-auth':
            return rep.code(401).send({statusCode: 401, message: `Unauthorized`})
        case 'dubl-thing':
            return rep.code(424).send({statusCode: 424, message: `Dublicate thing`})
        // Secure
        case 'locked':
            return rep.code(423).send({statusCode: 423, message: `Locked`})
    
        case 'server-error':
            return rep.code(500).send({statusCode: 500, message: `Some technical problems on our side. Sorry`})
        default:            
            req.log.error(error);
            return rep.code(500).send({statusCode: 500, message: `Some technical problems on our side. Sorry`})
    }
}