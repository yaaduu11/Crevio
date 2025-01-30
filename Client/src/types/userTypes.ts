interface UserSignupFormType {
    name: string;
    email: string;
    password: string;
    role?: 'freelancer' | 'client' | 'admin' | '';
}
  
type UserSignupFormAction =
    | { type: "SET_NAME"; payload: string }
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_PASSWORD"; payload: string }


interface UserStoreType {
    _id: string;
    name: string;
    email: string;
    role?: 'freelancer' | 'client' | 'admin' | '';
    accessToken : null;
}

export type { UserStoreType, UserSignupFormAction, UserSignupFormType}