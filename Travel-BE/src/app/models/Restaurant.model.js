const mongoose = require('mongoose')

const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema
const Restaurant = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    destination_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination'
    },

    long: { type: String },
    lat: { type: String },
    image: [
      {
        url: { type: String }
      }
    ],
    rating: { type: Number },
    address: { type: String, require: true },
    price: { type: Number }
  },
  {
    timestamps: true
  }
)

// Add plugins
mongoose.set('strictQuery', false)

Restaurant.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'
})

module.exports = mongoose.model('Restaurant', Restaurant)
