export const ROUTES = {
    MAIN: '/',
    USERS: '/users',
    ACTIONS: '/actions',
    CONDITIONS: '/conditions',
    GRAPHS: '/graphs',
    CURRENCIES: '/currencies',
};

const PROTOCOL = location.protocol;

export const ENDPOINT = {
    AUTH: `${PROTOCOL}//localhost:3189/api/auth`,
    USERS: `${PROTOCOL}//localhost:3189/api/users`,
    ACTIONS: `${PROTOCOL}//localhost:3189/api/bot/actions`,
    CONDITIONS: `${PROTOCOL}//localhost:3189/api/bot/conditions`,
    GRAPHS: `${PROTOCOL}//localhost:3189/api/bot/graphs`,
    CURRENCIES: `${PROTOCOL}//localhost:3189/api/bot/currencies`,
};
