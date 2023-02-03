import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    phone: {type: String, required: true},
    street: {type: String, required: true},
    apartment: {type: String, default: ''},
    city: {type: String, default: ''},
    country: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
})


userSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

userSchema.set('toJSON', {virtuals: true});

const User = mongoose.model('USER', userSchema);

export default User;

export type UserDto = {
    name?: string;
    email?: string;
    passwordHash?: string;
    phone?: string;
    street?: string;
    apartment?: string;
    city?: string;
    country?: string;
    isAdmin?: boolean;
}
