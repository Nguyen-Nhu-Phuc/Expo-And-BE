const mongoose = require('mongoose')

const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema
const User = new Schema(
  {
    fullName: { type: String, require: true },
    email: { type: String, require: true },
    role: { type: String, default: 'user' },
    password: { type: String, require: true },
    setchedule_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Schedule'
    }
  },
  {
    timestamps: true
  }
)

// Add plugins
mongoose.set('strictQuery', false)

User.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'
})

module.exports = mongoose.model('User', User)
