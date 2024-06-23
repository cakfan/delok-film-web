/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/", "/p"];

/**
 * An array of route that are used for authentication
 * These routes will redirect logged in users to homepage
 * @type {string[]}
 */
export const authRoutes: string[] = ["/signin"];

/**
 * An array of route that are used for user
 * These routes will use for username
 * @type {string[]}
 */
export const userRoutes: string[] = ["/@", "/auth/callback"];

/**
 * The prefix for public API
 * Routes that start with this prefix are used for public API purposes
 * @type {string}
 */
export const publicApiPrefix: string[] = ["/api/auth"];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/";
