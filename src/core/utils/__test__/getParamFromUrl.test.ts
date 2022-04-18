import {getParamsFromUrl} from '../getParamFromUrl';
import {QueryParsers} from '../getQueryFromUrl';
import {booleanParser, numberParser, stringParser} from '../queryParsers';

describe('getParamsFromUrl', () => {
    type Params = {
        name?: string;
        id?: number;
        isNew: boolean;
    };

    it('Получение параметров', () => {
        const parsers: QueryParsers<Params> = {
            name: stringParser(),
            id: numberParser(),
            isNew: booleanParser(false),
        };
        expect(getParamsFromUrl(parsers, {olo: 't'})).toEqual({isNew: false});
        expect(getParamsFromUrl(parsers, {name: 't'})).toEqual({name: 't', isNew: false});
        expect(getParamsFromUrl(parsers, {
            name: 't',
            id: '6',
            pageType: 'tags',
            isNew: 'true',
        })).toEqual({name: 't', id: 6, isNew: true});
    });
});
