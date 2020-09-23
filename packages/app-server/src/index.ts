import fastify from 'fastify'
import serveStatics from 'fastify-static'
import path from 'path'
import proxy from 'fastify-reply-from'
import dotenv from 'dotenv'

dotenv.config()

function startServer() {
    const instance = fastify()
    
    //Decorate the reply object in requests with a from method that will
    // resolve with a reply from this origin instead of our own.
    instance.register(proxy, {
        base: 'https://localhost:8081/'
    })
    // Forward all API requests to the API server
    instance.get('/api', {}, (request, reply) => {
        reply.from('/')
    })

    // Serve static assets from the webpack output directory
    instance.register(serveStatics, {
        root: path.resolve(__dirname, '../build')
    })

    instance
        .listen(process.env.SERVER_PORT as unknown as number)
        .then(address => console.log(`App Server running at: ${address}`))
        .catch(error => {
            console.error(`Error starting App Server`, error)
            process.exit(1)
        })
}

startServer()