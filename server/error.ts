export default defineNitroErrorHandler((error, event) => {
  setResponseHeader(event, 'Content-Type', 'application/json')
  return send(event, JSON.stringify({message: error.message, statusCode: error.statusCode}), error.statusCode)
})
