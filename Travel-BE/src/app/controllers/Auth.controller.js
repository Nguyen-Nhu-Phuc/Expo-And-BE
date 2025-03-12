const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const User = require('../models/User.model')

dotenv.config()

const authController = {
  async signUp(req, res) {
    const { fullName, email, password } = req.body
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({ fullName, email, password: hashedPassword })
      const user = await newUser.save()
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong!' })
    }
  },

  async signIn(req, res) {
    const { email, password } = req.body
    try {
      const user = await User.findOne({ email })
      if (!user) return res.status(400).json({ message: 'Email không tồn tại!' })

      const validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) return res.status(400).json({ message: 'Mật khẩu không đúng!' })

      const { password: _, ...userData } = user._doc
      return res.status(200).json(userData)
    } catch (err) {
      return res.status(500).json({ message: 'Lỗi máy chủ!' })
    }
  },

  async signOut(req, res) {
    return res.status(200).json({ message: 'Đăng xuất thành công!' })
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.find().select('-password').lean()
      return res.status(200).json(users)
    } catch (err) {
      return res.status(500).json({ message: 'Lỗi máy chủ!' })
    }
  }
}

module.exports = authController
