import { FastifyPluginAsync, FastifyPluginOptions, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import mongoose from 'mongoose';
import { ThingModel } from '../../models/thing/ThingModel';

const ConnectDB: FastifyPluginAsync<MyPluginOptions> = async (
    fastify: FastifyInstance,
    options: FastifyPluginOptions
) => {
    try {
        mongoose.connection.on('connected', () => {
            fastify.log.info({ actor: 'MongoDB' }, 'connected');
        });
        mongoose.connection.on('disconnected', () => {
            fastify.log.error({ actor: 'MongoDB' }, 'disconnected');
        });
        const db = await mongoose.connect(options.url, {
            autoIndex: false
        });
        const models: Models = {
            ThingModel,
        };
        // fastify.decorate('db', { models });
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
};

export const dbPlugin = fp(ConnectDB);
export const dbParams = { url: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@127.0.0.1:27017/${process.env.DB_NAME}` }