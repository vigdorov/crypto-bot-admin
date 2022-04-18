import {StorageAPI} from './StorageAPI';

class TokenAPI {
    private accessTokenAPI: StorageAPI<string>;

    private refreshTokenAPI: StorageAPI<string>;

    constructor() {
        this.accessTokenAPI = new StorageAPI('', 'access', 'session');
        this.refreshTokenAPI = new StorageAPI('', 'refresh', 'local');
    }

    setTokens(accessToken: string, refreshToken: string) {
        this.accessTokenAPI.set(accessToken);
        this.refreshTokenAPI.set(refreshToken);
    }

    getAccessToken() {
        return this.accessTokenAPI.get();
    }

    getRefreshToken() {
        return this.refreshTokenAPI.get();
    }

    clearTokents() {
        this.accessTokenAPI.clear();
        this.refreshTokenAPI.clear();
    }
}

export const tokenAPI = new TokenAPI();
