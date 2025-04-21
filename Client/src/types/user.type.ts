import mongoose, {ObjectId} from 'mongoose'

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

export interface ProjectType {
    title: string;
    thumbnail: File | null;
    description: string;
    category: string;
    skills: string[];
    deadline: string;
    additional_info: string;
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
    subscriptionType? : string;
    isBlocked?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserStoreType {
    _id: string;
    name: string;
    email: string;
    role?: 'freelancer' | 'client' | 'admin' | 'none' | '';
    subscription?: 'none' | 'basic' | 'standard' | 'extended'
    accessToken : null;
    showToast? : null
}

export type { UserStoreType, UserSignupFormAction, UserSignupFormType, ErrorState}

export interface IFreelancerDetail {
    user_id: mongoose.Schema.Types.ObjectId;
    profession: string;
    company: string;
    qualification: string;
    bio: string;
    work_experience: string;
    proficient_languages: string[];
    skills: string[];
    working_days: string;
    active_hours: string;
    basic_price: number;
    standard_price: number;
    premium_price: number;
    portfolio: string;
    linkedin: string;
    twitter: string;
}