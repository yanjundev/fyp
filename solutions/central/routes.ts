/**
 * an array of routes that do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/'];

/**
 * an array of routes that will redirect logged in users
 * @type {string[]}
 */
export const authRoutes = ['/login', '/register'];

/**
 * prefix for API authentication routes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * the default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/home';
