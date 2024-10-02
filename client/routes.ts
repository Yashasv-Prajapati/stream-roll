/**
 * Public routes - accessible to anyone visiting the website
 * @type [string]
 */
export const publicRoutes = ["/"];

/**
 * Private/Protected routes - accessible to authenticated users
 * @type [string]
 */
export const protectedRoutes = ["/upload", "/browse"];


export const authRoutes = ["/login", "/signup"];

/**
 * Auth API route
 * @type string
 */
// Prefixes for API authentication routes
// Routes that start with any of these prefixes are used for API authentication purposes
export const apiAuthPrefix = ['/api/auth'];

/**
 * The default redirect path after just loggin in
 * @type string
 */
export const DEFAULT_LOGIN_REDIRECT_URL = "/browse";
