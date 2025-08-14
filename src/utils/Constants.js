export const navigationLinks = {
  home: { path: "/" },
  about: { path: "/about" },
  contact: { path: "/contact" },
  faq: { path: "/faq" },
  register: { path: "/register" },
  login: { path: "/login" },
  profile: { path: "/profile" },
  marketplace: { path: "/marketplace" },
  weatherDashboard: { path: "/weather-dashboard" },
  message: { path: "/message" },
  dashboard: { path: "/dashboard" },
  map: { path: "/map" },
};

export const apiEndpoints = {
  auth: {
    register: { method: "POST", url: "/auth/register" },
    verifyRegistration: { method: "POST", url: "/auth/verify-registration" },
    login: { method: "POST", url: "/auth/login" },
    logout: { method: "POST", url: "/auth/logout" },
    forgotPassword: { method: "POST", url: "/auth/forgot-password" },
    resetPassword: { method: "POST", url: "/auth/reset-password" },
    changePassword: { method: "POST", url: "/auth/change-password" },
  },
  profile: {
    getProfile: { method: "GET", url: "/profile" },
    updateProfile: { method: "PUT", url: "/profile" },
  },
  chat: {
    getChats: { method: "GET", url: "/chat" },
    getMessages: { method: "GET", url: "/chat/:id/messages" },
    sendMessage: { method: "POST", url: "/chat/:id/messages" },
  },
  crop: {
    getCrops: { method: "GET", url: "/crop" },
    addCrop: { method: "POST", url: "/crop" },
    updateCrop: { method: "PUT", url: "/crop/:id" },
    deleteCrop: { method: "DELETE", url: "/crop/:id" },
  },
  marketplace: {
    getListings: { method: "GET", url: "/marketplace" },
    addListing: { method: "POST", url: "/marketplace" },
    updateListing: { method: "PUT", url: "/marketplace/:id" },
    deleteListing: { method: "DELETE", url: "/marketplace/:id" },
  },
  pestDetection: {
    detect: { method: "POST", url: "/pest/detect" },
  },
  dashboard: {
    getDashboard: { method: "GET", url: "/dashboard" },
  },
  map: {
    getMapData: { method: "GET", url: "/map" },
  },
  admin: {
    listUsers: { method: "GET", url: "/admin/users" },
    changeUserRole: { method: "PUT", url: "/admin/user/:id/role" },
    deleteUser: { method: "DELETE", url: "/admin/user/:id" },
  },
  ai: {
    cropRecommendations: { method: "POST", url: "/ai/recommend/crop" },
    buyerRecommendations: { method: "POST", url: "/ai/recommend/buyer" },
    predict: { method: "POST", url: "/ai/predict" },
    recommend: { method: "POST", url: "/ai/recommend" },
  },
};
