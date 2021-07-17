import {declareAction, declareAtom} from '@reatom/core';
import {store} from './store';

export const createEntityAtoms = <T>(initEntity: T) => {
    const INIT_ENTITY_LIST: T[] = [];

    const loadEntityList = declareAction<typeof INIT_ENTITY_LIST>();
    const loadEntityForm = declareAction<T>();

    const entityListAtom = declareAtom(INIT_ENTITY_LIST, on => [
        on(loadEntityList, (_state, payload) => payload)
    ]);
    const entityFormAtom = declareAtom(initEntity, on => [
        on(loadEntityForm, (_state, payload) => payload)
    ]);

    const bindedActions = {
        loadEntityList: (entities: typeof INIT_ENTITY_LIST) => {
            store.dispatch(loadEntityList(entities));
        },
        loadEntityForm: (entity: T) => {
            store.dispatch(loadEntityForm(entity));
        },
    };

    return {entityListAtom, entityFormAtom, bindedActions};
};
