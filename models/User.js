const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

userSchema.pre('save', async (next) => {
   if(this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10)
   }
   next();
})

userSchema.methods,comparePassword = (password) => {
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema);