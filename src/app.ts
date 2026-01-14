// modules
import fastify, { FastifyInstance } from 'fastify'
import 'dotenv/config'
import path from 'path'

//routes
import ThingRoute from './routes/thing-route/ThingRoute'
import PingRoute from './routes/ping-route/PingRoute'

//plugins
import { corsParams } from './plugins/cors'
import { swaggerParams } from './plugins/swagger'
import { swaggerUIParams } from './plugins/swagger/ui'
import { fastifyConfig } from './configs'
import { dbPlugin, dbParams } from './plugins/db'

export const build = async () => {
    const app = fastify(fastifyConfig)
    await checkServerEnv(app as any)

    app.register(require('@fastify/cors'), corsParams)
    app.register(require('@fastify/swagger'), swaggerParams)
    app.register(require('@fastify/swagger-ui'), swaggerUIParams)
    app.register(dbPlugin, dbParams)
    app.register(require('@fastify/multipart'), {
        limits: {
            files: 1,
            fileSize: 500 * 1024 * 1024
        }
    })
    app.register(require('@fastify/static'), {
      root: path.join(__dirname, 'store'),
      prefix: '/public/',
    })


    app.register(ThingRoute)
    app.register(PingRoute)

    app.after()
    return app
}

async function checkServerEnv(app: FastifyInstance){

    if(!process.env.SERVER_PORT){
        app.log.fatal('The environment variable responsible for the server port is not set')
        process.exit(1)
    }
    
    if(!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME){
        app.log.fatal('The environment variable responsible for connecting to the MongoDB database is not set')
        process.exit(1)
    }
    if(!process.env.ADMINS){
        app.log.fatal('The environment variable responsible for administrators list is not set')
        process.exit(1)
    }
    if(!process.env.BOT_TOKEN){
        app.log.fatal('The environment variable responsible for bot token is not set')
        process.exit(1)
    }
}