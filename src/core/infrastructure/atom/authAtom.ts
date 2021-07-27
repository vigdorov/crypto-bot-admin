import {declareAction, declareAtom} from '@reatom/core';
import {store} from './store';

const authAction = declareAction<boolean>();

export const authAtom = declareAtom(false, on => [
    on(authAction, (_state, payload) => payload),
]);

export const bindedActions = {
    changeAuth: (isAuth: boolean) => {
        store.dispatch(authAction(isAuth));
    },
};
