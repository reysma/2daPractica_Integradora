
import mongoose from "mongoose";


const userCollection = "users";

const userSchema = mongoose.Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,

});

const UserModel = mongoose.model(userCollection, userSchema)

export default UserModel