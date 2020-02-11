const express = require('express')
const routes = require('./controllers/routes.js')
const bodyParser = require('body-parser')

/**
 * Server
 * @Class
 */
class Server {
  constructor () {
    this.app = express()
  }

  /**
   * middleware
   */
  middleware() {
    this.app.use(bodyParser.urlencoded({ 'extended': true }))
    this.app.use(bodyParser.json())
  }

  /**
   * routes
   */
  routes () {
    new routes.users.Create(this.app)
    new routes.users.Show(this.app)
    new routes.users.Update(this.app)
    new routes.users.Delete(this.app)

    this.app.use((req, res) => {
      res.status(404).json({
        'code': 404,
        'message': 'Not Found'
      })
    })
  }

  /**
   * run
   */
  run () {
    this.middleware()
    this.routes()
    this.app.listen(3000)
  }
}

module.exports = Server
