const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const UserModel = require('../../app/models/User.model')

async function connect() {
  try {
    await mongoose.connect(process.env.DB)
    console.log('Connect DataBase!!!')
  } catch (error) {
    console.log('Connect failure!!!')
  }
}

module.exports = { connect }
