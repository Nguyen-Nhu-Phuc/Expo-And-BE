const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Schedule = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    schedule: [
      {
        day: { type: Number, required: true },
        place: [
          {
            place_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Place'
            },
            time: { type: String, required: true }
          }
        ],
        hotel: {
          hotel_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hotel'
          },
          check_in: { type: String },
          check_out: { type: String },
          time: { type: String, required: true }
        },
        restaurant: [
          {
            restaurant_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Restaurant'
            },
            time: { type: String, required: true }
          }
        ]
      }
    ]
  },
  {
    timestamps: true
  }
)

mongoose.set('strictQuery', false)

Schedule.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'
})

module.exports = mongoose.model('Schedule', Schedule)
