import { build } from "./app";
import getHostAddress from "./utils/getHostAddress";
import fs from 'fs'
import path from 'path'
import 'dotenv/config'

if(!fs.existsSync(path.join(__dirname, `./store`))){
    fs.mkdir(path.join(__dirname, `./store`), { recursive: true }, (err) => {
        if (err) {
            return console.error(err);
        }

        console.log(`[Server starter] Server store init`)
    })
}
if(!fs.existsSync(path.join(__dirname, `./logs`))){ 
    fs.mkdir(path.join(__dirname, `./logs`), { recursive: true }, (err) => {
        if (err) return console.error(err)

        if(!fs.existsSync(path.join(__dirname, `./logs/general`))){
            fs.mkdir(path.join(__dirname, `./logs/general`), { recursive: true }, (err) => {
                if (err) return console.error(err);
            })
        }
        
        if(!fs.existsSync(path.join(__dirname, `./logs/errors`))){
            fs.mkdir(path.join(__dirname, `./logs/errors`), { recursive: true }, (err) => {
                if (err) return console.error(err);
            })
        }
        console.log(`[Server starter] Server logs init`)
    })
}

export const app = build();

(async () => {
    try {        
        (await app).ready((err:Error | null) => {
            if (err) throw err
        })
        
        if(!process.env.SERVER_PORT) throw new Error('SERVER_PORT enverventment variable is not defined')
        const serverHost = getHostAddress();
    
        
        if(!serverHost) throw new Error('Cannot determine host address');
            
        (await app).listen({port: +process.env.SERVER_PORT, host: serverHost })
        .then(async () => {            
            (await app).log.info({ actor: 'sanvito-bar-server' }, 'Server started successfully')
        })
    } catch (err) {
        (await app).log.fatal((err as Error).message)
        process.exit(1)
    }
})()