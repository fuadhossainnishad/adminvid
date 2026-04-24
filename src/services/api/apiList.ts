const apiList = {
    signup: "/auth/signup",
    login: "/users/login/",
    forgotPassword: "/auth/forgot_password",
    verifyOtp: "/auth/verify_otp",
    resetPassword: "/auth/reset_password",
    updatePassword: "/auth/update_password",
    settings: "/system/admin/settings/",
    updateSettings: (id: number) => `/system/admin/settings/:${id}/`,
    subscription: "/subscription",
    user: "/users/admin/users/",
    blockUser: (user_id: string) => `/users/admin/users/${user_id}/toggle-block/`,
    earnings: "/earnings",
    video: "/video",
    dashboard: "/users/admin/dashboard-home/"
}

export default apiList