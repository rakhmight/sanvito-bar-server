const pjson = require('../../../package.json')

export const swaggerParams = {
    swagger: {
      info: {
        title: 'Backend test API documentation',
        description: 'structures of requests, responses and errors are described',
        version: pjson.version,
        contact: {
          name: pjson.author,
          email: pjson.email
        }
      }
    }
  }