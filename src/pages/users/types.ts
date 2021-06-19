import {EntityMode} from '../../core/types/EntityModes';

export type User = {
    id: string;
    login: string;
    password: string;
};

export type QueryParams = {
    id?: string;
    mode?: EntityMode;
};
