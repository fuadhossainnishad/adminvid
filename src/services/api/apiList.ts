const apiList = {
  signup: "/auth/signup",
  login: "/users/login/",
  forgotPassword: "/users/forgot-password/",
  verifyOtp: "/users/forgot-password/verify/",
  resetPassword: "/users/forgot-password/set-password/",
  updatePassword: "/auth/update_password",
  settings: "/system/admin/settings/",
  updateSettings: (id: number) => `/system/admin/settings/:${id}/`,
  subscription: "/subscription",
  user: "/users/admin/users/",
  blockUser: (user_id: string) => `/users/admin/users/${user_id}/toggle-block/`,
  earnings: "/earnings",
  allVideo: "/system/admin/videos/",
  dashboard: "/users/admin/dashboard-home/",
  notifications: "/users/notifications/",
};

export default apiList;
