import {decode, encode, ParsedUrlQuery} from 'querystring';
import {bindedActions} from '../infrastructure/atom/routerAtom';
import {isNotEmpty} from '../referers/common';
import {objectEntries} from '../utils/objectEntries';

type PushQueryOptions = {
    reset?: boolean;
    shouldRefresh?: boolean;
};

const getQuery = () => decode(window.location.search.slice(1));

class RouterService {
    push(route: string) {
        bindedActions.routerAction(route);
    }

    pushWithQuery(path: string, query: Indexed<Undefinable<string | string[]>>, options?: PushQueryOptions) {
        const currentQuery = getQuery();

        const finalQuery = encode({
            ...(!options?.reset ? {
                ...currentQuery,
            } : {}),
            ...(options?.shouldRefresh ? {
                __timestamp: Date.now(),
            } : {}),
            ...objectEntries(query).reduce<ParsedUrlQuery>((acc, [key, value]) => {
                if (value) {
                    acc[key] = value;
                }
                return acc;
            }, {}),
        });

        this.push([path, finalQuery].filter(isNotEmpty).join('?'));
    }
}

export const routerService = new RouterService();
