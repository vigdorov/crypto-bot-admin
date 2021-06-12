import {ENDPOINT} from '_consts/common';
import {CrudAPI} from '../../../core/api/CrudAPI';

export const usersAPI = new CrudAPI(ENDPOINT.USERS);
