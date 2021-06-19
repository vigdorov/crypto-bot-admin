import {ENDPOINT} from '_consts/common';
import {CrudAPI} from '../../../core/api/CrudAPI';
import {User} from '../types';

export const usersAPI = new CrudAPI<User>(ENDPOINT.USERS);
