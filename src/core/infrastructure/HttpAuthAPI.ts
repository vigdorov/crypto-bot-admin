import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import authServiceApi from './AuthServiceAPI';
import {tokenAPI} from './TokenAPI';

type HandlerArgs<T> = {
    resolve: (v: AxiosResponse<T>) => void,
    reject: (reason?: any) => void,
    requestConfig: AxiosRequestConfig
    error?: AxiosError<T>,
}

type Handler<T> = (args: HandlerArgs<T>) => void;

class HttpAuthApi {
    pendingRequests: HandlerArgs<any>[];

    isPendingRefresh: boolean;

    constructor() {
        this.pendingRequests = [];
        this.isPendingRefresh = false;
    }

    processPendingRequests = (handler: Handler<unknown>) => {
        this.isPendingRefresh = false;
        while (this.pendingRequests.length) {
            const pendingRequest = this.pendingRequests.shift()!;
            handler(pendingRequest);
        }
    }

    repeatRequests = () => {
        this.processPendingRequests(({resolve, reject, requestConfig}) => {
            this.request(requestConfig)
                .then(resolve)
                .catch(reject);
        });
    }

    rejectRequests = (error: AxiosError) => {
        this.processPendingRequests(({reject}) => {
            reject(error);
        });
    }

    errorHandling = (
        error: AxiosError<unknown>,
        resolve: (v: AxiosResponse<any>) => void,
        reject: (reason?: any) => void,
        requestConfig: AxiosRequestConfig
    ) => {
        if (error.response?.status === 401) {
            this.isPendingRefresh = true;
            this.pendingRequests.push({resolve, reject, requestConfig});
            authServiceApi.refresh()
                .then(() => {
                    this.repeatRequests();
                })
                .catch((refreshError: AxiosError) => {
                    this.rejectRequests(refreshError);
                    tokenAPI.clearTokents();
                    location.reload();
                });
        } else {
            reject(error);
        }
    }

    addTokenToRequest = (requestConfig: AxiosRequestConfig): AxiosRequestConfig => ({
        ...requestConfig,
        headers: {
            ...(requestConfig.headers ?? {}),
            'Authorization': tokenAPI.getAccessToken(),
        },
    })

    request = <T>(requestConfig: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return new Promise((resolve, reject) => {
            if (this.isPendingRefresh) {
                this.pendingRequests.push({resolve, reject, requestConfig});
            } else {
                axios(this.addTokenToRequest(requestConfig))
                    .then(response => resolve(response))
                    .catch(error => this.errorHandling(error, resolve, reject, requestConfig));
            }
        });
    }
}

const httpAuthApi = new HttpAuthApi();

export default httpAuthApi;
