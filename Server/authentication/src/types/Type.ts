import { ObjectId } from "mongoose";

export interface UserType {
    _id?: ObjectId;
    name?: string;
    email: string;
    password?: string;
    role?: 'freelancer' | 'client' | 'admin';
    isBlocked?: false;
    createdAt?: Date;
    updatedAt?: Date;
}

export type SigninResponse = {accessToken: string, refreshToken: string, user: UserType}

export interface GoogleAuthUserType {
    email: string;
    name: string;
    profilePicture?: string;
}