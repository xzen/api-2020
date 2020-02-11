const users = require('../../models/');

/**
 * Create
 * @class
 */
class Show {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.get('/user/show/:id', (req, res) => {
      try {
        const { id } = req.params;

        res.status(200).json(users.find(user => user.id === id) || {})
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }

  /**
   * run
   */
  run () {
    this.middleware()
  }
}

module.exports = Show
