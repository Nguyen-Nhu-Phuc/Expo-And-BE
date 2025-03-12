const mongoose = require('mongoose')

const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema
const Place = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    long: { type: String },
    lat: { type: String },
    image: [
      {
        url: { type: String }
      }
    ],
    address: { type: String, require: true },
    destination_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination'
    },
    rating: { type: Number }
  },
  {
    timestamps: true
  }
)

// Add plugins
mongoose.set('strictQuery', false)

Place.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'
})

module.exports = mongoose.model('Place', Place)
