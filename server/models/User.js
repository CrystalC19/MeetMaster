const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

});

// Pre-save middleware to hash the password before saving
// userSchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     console.log("User Schema before", this.password);
//     this.password = await bcrypt.hash(this.password, saltRounds);
//     console.log("User Schema after", this.password);
//   }
//   next();
// });

// Method to compare and validate password during login
userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  //debug
  console.log('Password comparison result:', result);
  return result;
};

const User = model('User', userSchema);

module.exports = User;
