const Product = require('../models/product.js')
const cors = require('cors')
/**
 * Products
 * @class
 */
class Products {
  constructor (app, connect) {
    this.app = app
    this.ProductModel = connect.model('Product', Product)

    this.create() 
    this.list()
    this.delete()
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
}

module.exports = Products
