import {ENDPOINT} from '_consts/common';
import {CrudAPI, EntityWithId, EntityWithoutId} from '_api/CrudAPI';
import {http} from '_infrastructure/Http';
import {User} from '../types';
import {ChangePasswordRequest} from './types';

class UsersAPI<T> extends CrudAPI<T> {
    create = (entity: EntityWithoutId<T>): Promise<EntityWithId<T>> => {
        return http.post<never, EntityWithoutId<T>, EntityWithId<T>>(
            `${ENDPOINT.AUTH}/register-user`,
            undefined,
            entity,
        );
    }

    changePassword = (id: string, password: string): Promise<string> => {
        return http.post<never, ChangePasswordRequest, string>(
            `${ENDPOINT.AUTH}/admin-change-password`,
            undefined,
            {id, password},
        );
    }
}

export const usersAPI = new UsersAPI<User>(ENDPOINT.USERS);
