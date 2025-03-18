import {ObjectId} from 'mongoose'

interface UserSignupFormType {
    name: string;
    email: string;
    password: string;
    role?: 'freelancer' | 'client' | 'admin' | 'none' | '';
}

interface ErrorState {
    field?: string;
    message?: string;
}
  
type UserSignupFormAction =
    | { type: "SET_NAME"; payload: string }
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_PASSWORD"; payload: string }


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

interface UserStoreType {
    _id: string;
    name: string;
    email: string;
    role?: 'freelancer' | 'client' | 'admin' | 'none' | '';
    accessToken : null;
    showToast? : null
}

export type { UserStoreType, UserSignupFormAction, UserSignupFormType, ErrorState}