import session from 'express-session';

const sessionConfiguration = {
    secret: 'descretion',
    cookie: { secure: false },
};

export const sessionMiddleware = session(sessionConfiguration);