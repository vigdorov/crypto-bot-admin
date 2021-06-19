import {declareAction, declareAtom} from '@reatom/core';
import {User} from '../../../pages/users/types';
import {store} from './store';

export type FieldData = {
    name: keyof User | Array<keyof User>;
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
};

const INIT_USERS: User[] = [];
export const INIT_USER: FieldData[] = [
    {name: 'id', value: ''},
    {name: 'login', value: ''},
    {name: 'password', value: ''},
];
export const loadUsersAction = declareAction<User[]>();

export const usersAtom = declareAtom(INIT_USERS, on => [
    on(loadUsersAction, (_state, payload) => payload),
]);

export const loadUserForm = declareAction<FieldData[]>();

export const userFormAtom = declareAtom(INIT_USER, on => [
    on(loadUserForm, (_state, payload) => payload),
]);

export const bindedActions = {
    loadUsersAction: (users: User[]) => {
        store.dispatch(loadUsersAction(users));
    },
    loadUserForm: (fieldData: FieldData[]) => {
        store.dispatch(loadUserForm(fieldData));
    }
};
