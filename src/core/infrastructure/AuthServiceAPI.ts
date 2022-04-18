import axios from 'axios';
import {bindedActions as authActions} from './atom/authAtom';

import {tokenAPI} from './TokenAPI';

type AuthResponse = {
    access_token: string;
    refresh_token: string;
};

const ENDPOINT = 'https://api.crypto-bot.vigdorov.ru/auth';

class AuthServiceApi {
    auth = (login: string, password: string) => {
        return axios.post<AuthResponse>(`${ENDPOINT}/auth-user`, {
            login,
            password,
        }).then(({data: {access_token, refresh_token}}) => {
            tokenAPI.setTokens(access_token, refresh_token);
            authActions.changeAuth(true);
        });
    }

    refresh = () => {
        const refreshToken = tokenAPI.getRefreshToken();
        if (refreshToken) {
            return axios.post<AuthResponse>(`${ENDPOINT}/refresh-tokens`, {refresh_token: refreshToken})
                .then(({data: {access_token, refresh_token}}) => {
                    tokenAPI.setTokens(access_token, refresh_token);
                    authActions.changeAuth(true);
                })
                .catch(e => {
                    tokenAPI.clearTokents();
                    authActions.changeAuth(false);
                    throw e;
                });
        }

        return Promise.reject(new Error('Не авторизован'));
    }

    signOut = () => {
        tokenAPI.clearTokents();
        authActions.changeAuth(false);
    }
}

const authServiceApi = new AuthServiceApi();

export default authServiceApi;
