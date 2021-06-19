import {QueryParsers} from '../../core/utils/getQueryFromUrl';
import {stringParser} from '../../core/utils/queryParsers';
import {QueryParams} from './types';

export const queryParsers: QueryParsers<QueryParams> = {
    id: stringParser(),
    mode: stringParser(),
};
