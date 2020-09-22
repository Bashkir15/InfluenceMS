import Redis from 'ioredis'

export function createRedis(options: Record<string, any> = {}) {
    return new Redis({
        host: process.env.REDIS_LABS_JOB_QUEUE_URL,
        password: process.env.REDIS_LABS_JOB_QUEUE_PASSWORD,
        port: process.env.REDIS_LABS_JOB_QUEUE_PORT,
        ...options
    })
}