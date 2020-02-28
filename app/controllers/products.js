const Product = require('../models/product.js')
const User = require('../models/user.js')

const mongoose = require('mongoose')
const cors = require('cors')

/**
 * Products
 * @class
 */
class Products {
  constructor (app, connect) {
    this.app = app
    this.ProductModel = connect.model('Product', Product)
    this.UserModel = connect.model('User', User)

    this.create() 
    this.list()
    this.delete()
    this.addCaddy()
    this.showCaddy()
  }

  /**
   * Create
   */
  create () {
    this.app.post('/product/create', (req, res) => {
      try {
        const productModel = new this.ProductModel(req.body)

        productModel.save().then(product => {
          res.status(200).json(product || {})
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
    this.app.get('/products/list', cors(), (req, res) => {
      try {
        this.ProductModel.find().then(products => {
          res.status(200).json(products || {})
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

  delete () {
    this.app.delete('/product/remove/:id', (req, res) => {
      try {
        this.ProductModel.findOneAndRemove({_id: req.params.id})
          .then(product => {
            res.status(200).json(product || {})
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

  addCaddy () {
    this.app.post('/product/:id/caddy/add', (req, res) => {
      try {
        const { user_id } = req.body
        const { id } = req.params

        this.ProductModel.findById(id).then((product) => {
          this.UserModel.findByIdAndUpdate(
            user_id,
            {$push: {caddy: {_id: product._id}}}
          ).then((user) => {
            res.status(200).json(user.caddy || [])
          }).catch(err => {
            res.status(500).json({
              'code': 500,
              'message': err
            })
          })
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

  showCaddy () {
    this.app.post('/products/caddy/show', (req, res) => {
      try {
        const { user_id } = req.body

        this.UserModel.findById(user_id).then((user) => {
          const productsId = user.caddy.map(product => (
            mongoose.Types.ObjectId(product._id)
          ));

          this.ProductModel.find(
            {'_id': { $in: productsId } }
          ).then((products) => {
            res.status(200).json(products || []);
          }).catch(err => {
            res.status(500).json({'code': 500, 'message': err});
          })
        }).catch(err => {
          res.status(500).json({'code': 500, 'message': err});
        });
      } catch (err) {
        res.status(500).json({'code': 500, 'message': err});
      }
    })
  }
}

module.exports = Products
