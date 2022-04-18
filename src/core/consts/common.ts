export const ROUTES = {
    MAIN: '/',
    USERS: '/users',
    ACTIONS: '/actions',
    CONDITIONS: '/conditions',
    GRAPHS: '/graphs',
    CURRENCIES: '/currencies',
};

const ORIGIN = location.origin;

export const ENDPOINT = {
    AUTH: `${ORIGIN}/api/auth`,
    USERS: `${ORIGIN}/api/users`,
    ACTIONS: `${ORIGIN}/api/bot/actions`,
    CONDITIONS: `${ORIGIN}/api/bot/conditions`,
    GRAPHS: `${ORIGIN}/api/bot/graphs`,
    CURRENCIES: `${ORIGIN}/api/bot/currencies`,
};
