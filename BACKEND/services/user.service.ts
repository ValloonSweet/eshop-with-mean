import User, { UserDto } from "../models/users.model";

export const newUser = async (user: UserDto) => {
    return await User.create(user);
}

export const updateUser = async (id: string, userDto: UserDto) => {
    return await User.findByIdAndUpdate(id, userDto);
}

export const getUsers = async () => {
    return await User.find();
}

export const getUserById = async (id: string) => {
    return await User.findById(id);
}

export const getUserByEmail = async (email: string) => {
    return await User.findOne({email});
}

export const deleteUserById = async (id: string) => {
    return await User.findByIdAndDelete(id);
}
