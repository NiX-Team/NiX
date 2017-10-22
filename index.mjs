import fastify from 'fastify'
import serveStatic from 'serve-static'

const app = fastify()

app.use('/', serveStatic('./build'))

app.listen(3000, function(err) {
  if (err) throw err
  console.log(`server listening on ${app.server.address().port}...`)
})
