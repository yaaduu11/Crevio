export const userEndPoints = {
    SIGNUP: "/auth/register",
    SIGNIN: "/auth/login",
    VERIFY_OTP: "/auth/verifyOtp",
    RESEND_OTP: "/auth/resendOtp",
    CHECK_ROLE: "/auth/check-role",
    ASSIGN_ROLE: "/auth/assign-role",
    GOOGLE_AUTH: '/auth/google-auth',
    LOGOUT: '/auth/logout'
}

export const adminEndPoints = {
    SIGNIN : "/auth/admin/login",
    FETCH_FREELANCERS : "/auth/admin/get-freelancers",
    FETCH_CLIENTS : "/auth/admin/get-clients",
    LOGOUT : '/auth/admin/logout'
}