const mongoose =  require('mongoose')

const UserSchema = new mongoose.Schema({
    image:String
},{timestamps:true});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;