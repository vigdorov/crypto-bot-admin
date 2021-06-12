import {declareAction, declareAtom} from '@reatom/core';

export const changeNameAction = declareAction<string>();

export const nameAtom = declareAtom('', on => [
    on(changeNameAction, (_state, payload) => payload),
]);
