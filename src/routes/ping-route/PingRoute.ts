import { 
    FastifyInstance, 
    FastifyPluginOptions, 
    FastifyPluginAsync 
} from 'fastify';
import fp from 'fastify-plugin';

const PingRoute: FastifyPluginAsync = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    fastify.get('/api/v1/ping', async (req, rep) => {
        const data = {
            ok: true,
            msg: 'Pong!',
            time: rep.elapsedTime,
            server: 'ijro-archive-server',
            v: 1
        }

        req.log.info({ actor: 'Route: ping' }, 'Ping')
        return rep.code(200).send({statusCode: 200, data })
    })
}

export default fp(PingRoute)