import {decode, encode, ParsedUrlQuery} from 'querystring';
import {bindedActions} from '../infrastructure/atom/routerAtom';
import {isNotEmpty} from '../referers/common';

type PushQueryOptions = {
    reset?: boolean;
    shouldRefresh?: boolean;
};

const getQuery = () => decode(window.location.search.slice(1));

class RouterService {
    push(route: string) {
        bindedActions.routerAction(route);
    }

    pushWithQuery(path: string, query: ParsedUrlQuery, options?: PushQueryOptions) {
        const currentQuery = getQuery();

        const finalQuery = encode({
            ...(!options?.reset ? {
                ...currentQuery,
            } : {}),
            ...(options?.shouldRefresh ? {
                __timestamp: Date.now(),
            } : {}),
            ...query,
        });

        this.push([path, finalQuery].filter(isNotEmpty).join('?'));
    }
}

export const routerService = new RouterService();
