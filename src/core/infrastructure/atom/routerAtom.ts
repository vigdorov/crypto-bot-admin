import {declareAction, declareAtom} from '@reatom/core';
import {createHashHistory} from 'history';
import {store} from './store';

const {location: {pathname, search}} = createHashHistory();

const routerAction = declareAction<string>();

export const routerAtom = declareAtom(`${pathname}${search}`, on => [
    on(routerAction, (_state, payload) => payload),
]);

export const bindedActions = {
    routerAction: (route: string) => {
        store.dispatch(routerAction(route));
    },
};
