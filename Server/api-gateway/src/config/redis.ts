import { createClient, RedisClientType } from "redis";
import { env } from "./envValidator";

let redisClient : RedisClientType;

const initializeRedisClient = () => {
    if(!redisClient) {
        redisClient = createClient({url: env.REDIS_URI})
    }

    redisClient.on("connect",()=>{
        console.log('redis client connected');
    })

    redisClient.on("error", (err:Error)=>{
        console.error(err);
    })

    redisClient.connect().catch((err)=>{
        console.error('Error when connecting to redis', err);
    })

    return redisClient
}

export { initializeRedisClient, redisClient }


// environment:
// - REDIS_URI=redis://redis:6379