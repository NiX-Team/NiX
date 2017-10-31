import fastify from 'fastify'
import serveStatic from 'serve-static'

const app = fastify()

app.use('/', serveStatic('./dist'))

app.listen(8080, function(err) {
  if (err) throw err
  console.log(`server listening on ${app.server.address().port}...`)
})
