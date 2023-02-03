import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUserDocument extends mongoose.Document {
    email: string;
    name: string;
    passwordHash: string;
    phone: string;
    street: string;
    apartment: string;
    city: string;
    country: string;
    isAdmin: boolean;
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateAuthToken(): string;
}

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

userSchema.pre('save', async (next) => {
    let user = this as unknown as IUserDocument;
    if(!user.isModified('passwordHash'))
        return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.passwordHash, salt);
    user.passwordHash = hash;

    return next();
})

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as unknown as IUserDocument;
    return bcrypt.compare(candidatePassword, user.passwordHash)
        .catch(e => false);
}

userSchema.methods.generateAuthToken = function () {
    const user = this as unknown as IUserDocument;
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.isAdmin
        },
        process.env.JWT_PRIVATE_KEY || 'secure_jwt_key',
        {expiresIn: '24h'}
    )
    return token;
}

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
