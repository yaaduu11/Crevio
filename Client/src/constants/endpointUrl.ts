export const userEndPoints = {
    SIGNUP: "/auth/register",
    SIGNIN: "/auth/login",
    VERIFY_OTP: "/auth/verifyOtp",
    VERIFY_OTP_FP: '/auth/verifyOtpFP',
    RESEND_OTP: "/auth/resendOtp",
    CHECK_ROLE: "/auth/check-role",
    ASSIGN_ROLE: "/auth/assign-role",
    GOOGLE_AUTH: '/auth/google-auth',
    FORGOT_PASSWORD: '/auth/forgot-password',
    NEW_PASSWORD: '/auth/new-password',
    REFRESH_TOKEN: '/auth/refreshToken',
    LOGOUT: '/auth/logout'
}

export const adminEndPoints = {
    SIGNIN : "/auth/admin/login",
    FETCH_FREELANCERS : "/auth/admin/get-freelancers",
    FETCH_CLIENTS : "/auth/admin/get-clients",
    CLIENT_BLOCK: "/auth/admin/client-block-unblock",
    FREELANCER_BLOCK: "/auth/admin/freelancer-block-unblock",
    LOGOUT : '/auth/admin/logout'
}