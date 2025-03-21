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
    CHANGE_PROFILE: '/auth/update-profile',
    GET_PROFILE_IMAGE: '/auth/profile-image',
    EDIT_USER_NAME: '/auth/edit-user-name',
    REFRESH_TOKEN: '/auth/refreshToken',
    LOGOUT: '/auth/logout',

    STRIPE_CHECKOUT: '/payment/pricing/checkout'
}

export const adminEndPoints = {
    SIGNIN : "/auth/admin/login",
    FETCH_FREELANCERS : "/auth/admin/freelancers",
    FETCH_CLIENTS : "/auth/admin/clients",
    CLIENT_BLOCK: "/auth/admin/clients/toggle-status",
    FREELANCER_BLOCK: "/auth/admin/freelancers/toggle-status",
    LOGOUT : '/auth/admin/logout',

    FETCH_PLANS: 'payment/admin/subscription-plans',
    ADD_PLAN: '/payment/admin/subscription-plans/add-plan'

}