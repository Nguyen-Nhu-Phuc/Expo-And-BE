const mongoose = require('mongoose')

const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema
const Destination = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    image: [
      {
        url: { type: String }
      }
    ],
    hotel_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
      }
    ],
    restaurant_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
      }
    ],
    place_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
      }
    ],
    rating: { type: Number },
    long: { type: String },
    lat: { type: String }
  },
  {
    timestamps: true
  }
)

// Add plugins
mongoose.set('strictQuery', false)

Destination.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'
})

module.exports = mongoose.model('Destination', Destination)
