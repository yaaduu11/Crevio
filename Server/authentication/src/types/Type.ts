import { ObjectId } from "mongoose";

export interface UserType {
    _id?: ObjectId;
    name?: string;
    email: string;
    password?: string;
    profilePicture?: string;
    role?: 'freelancer' | 'client' | 'admin';
    isBlocked?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type SigninResponse = {accessToken: string, refreshToken: string, user: UserType}

export interface GoogleAuthUserType {
    email: string;
    name: string;
    profilePicture?: string;
}

export interface FileType {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  }