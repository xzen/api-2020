const User = require('../models/user.js')

/**
 * Users
 * @class
 */
class Users {
  constructor (app, connect) {
    this.app = app
    this.UserModel = connect.model('User', User)

    this.create()
    this.list()
  }

  /**
   * Create
   */
  create () {
    this.app.post('/users/create', (req, res) => {
      try {
        const userModel = new this.UserModel(req.body)

        userModel.save().then(user => {
          res.status(200).json(user || {})
        }).catch(err => {
          res.status(500).json({
            'code': 500,
            'message': err
          })
        })
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }

  list () {
    this.app.get('/users/list', (req, res) => {
      try {
        this.UserModel.find().then(user => {
          res.status(200).json(user || {})
        }).catch(err => {
          res.status(500).json({
            'code': 500,
            'message': err
          })
        })
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }
}

module.exports = Users
