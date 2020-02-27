const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  stock: Number
}, {
  collection: 'products',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
