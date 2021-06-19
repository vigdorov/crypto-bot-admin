import {isNotEmpty} from '_referers/common';
import {http} from '../infrastructure/Http';

type Filter<T> = {
    field: keyof T;
    search: string;
};

type Sort<T> = {
    field: keyof T;
    order: 'ASC' | 'DECS';
};

type RequestEntities<T> = {
    filters?: Filter<T>[];
    sort?: Sort<T>;
    limit?: number;
    offset?: number;
};

type EntityWithId<T> = T & {
    id: string;
};
type EntityWithoutId<T> = Omit<T, 'id'>;

type ResponseEntities<T> = {
        data: EntityWithId<T>[];
        count: number;
        total: number;
        page: number;
        pageCount: number;
};

type BulkCreateRequest<T> = {
    bulk: T[];
};

export class CrudAPI<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    request = (options?: RequestEntities<T>): Promise<ResponseEntities<T>> => {
        const {filters, sort, limit = 50, offset = 0} = options ?? {};
        const query = [];

        filters?.forEach(({field, search}) => {
            query.push(`filter=${field}||$eq||${search}`);
        });

        if (sort) {
            query.push(`sort=${sort.field},${sort.order}`);
        }

        query.push(`limit=${limit}`);
        query.push(`offset=${offset}`);

        return http.get<never, ResponseEntities<T>>([this.endpoint, query.join('&')].filter(isNotEmpty).join('?'));
    }

    find = (id: string): Promise<T> => {
        return http.get<never, T>(`${this.endpoint}/${id}`);
    }

    create = (entity: EntityWithoutId<T>): Promise<EntityWithId<T>> => {
        return http.post<never, EntityWithoutId<T>, EntityWithId<T>>(this.endpoint, undefined, entity);
    }

    update = (id: string, entity: T): Promise<EntityWithId<T>> => {
        return http.patch<never, T, EntityWithId<T>>(`${this.endpoint}/${id}`, undefined, entity);
    }

    replace = (id: string, entity: T): Promise<EntityWithId<T>> => {
        return http.put<never, T, EntityWithId<T>>(`${this.endpoint}/${id}`, undefined, entity);
    }

    remove = (id: string): Promise<null> => {
        return http.delete<never, null>(`${this.endpoint}/${id}`);
    }

    bulkCreate = (entities: T[]): Promise<EntityWithId<T>[]> => {
        return http.post<never, BulkCreateRequest<T>, EntityWithId<T>[]>(`${this.endpoint}/bulk`, undefined, {
            bulk: entities,
        });
    }
}
