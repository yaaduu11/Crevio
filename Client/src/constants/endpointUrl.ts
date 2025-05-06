
export const userEndPoints = {
    SIGNUP: "/auth/register",
    SIGNIN: "/auth/login",
    VERIFY_OTP: "/auth/verifyOtp",
    VERIFY_OTP_FP: '/auth/verifyOtpFP',
    RESEND_OTP: "/auth/resendOtp",
    CHECK_ROLE: "/auth/check-role",
    ASSIGN_ROLE: "/auth/assign-role",
    FETCH_USER_DATA: '/auth/fetch-user',
    FETCH_USER_BY_ID: '/auth/fetch-user-by-id',
    GOOGLE_AUTH: '/auth/google-auth',
    FORGOT_PASSWORD: '/auth/forgot-password',
    NEW_PASSWORD: '/auth/new-password',
    CHANGE_PROFILE: '/auth/update-profile',
    GET_PROFILE_IMAGE: '/auth/profile-image',
    EDIT_USER_NAME: '/auth/edit-user-name',
    REFRESH_TOKEN: '/auth/refreshToken',
    LOGOUT: '/auth/logout',
    ADD_MORE_INFO: '/auth/add-more-info',
    GET_MORE_INFO: '/auth/more-info',
    UPDATE_MORE_INFO: '/auth/update-more-info',
    UPDATE_USER_SUB_STATUS: '/auth/update-user-sub-status',
    CHECK_USER_SUBSCRIBED_: '/auth/check-user-subscribed',

    STRIPE_CHECKOUT: '/payment/pricing/checkout',
    CHECK_USER_SUBSCRIBED: '/payment/pricing/check-user-subscribed',

    ALL_PROJECTS: '/project/projects',
    ALL_PROJECTS_BY_ID: '/project/projects-by-id',
    ADD_PROJECT: '/project/projects/add-project',

    AI_CHATBOT: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`
}

export const adminEndPoints = {
    SIGNIN : "/auth/admin/login",
    FETCH_FREELANCERS : "/auth/admin/freelancers",
    GET_MORE_INFO: '/auth/admin/more-info',
    FETCH_CLIENTS : "/auth/admin/clients",
    CLIENT_BLOCK: "/auth/admin/clients/toggle-status",
    FREELANCER_BLOCK: "/auth/admin/freelancers/toggle-status",
    LOGOUT : '/auth/admin/logout',

    FETCH_PLANS: 'payment/admin/subscription-plans',
    EDIT_PLAN: '/payment/admin/subscription-plans/edit-plan'
}