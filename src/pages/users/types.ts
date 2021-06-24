import {EntityMode} from '../../core/types/EntityModes';
import {ModalType} from './enums';

export type User = {
    id: string;
    login: string;
    password: string;
};

export type QueryParams = {
    id?: string;
    mode?: EntityMode;
    modalType?: ModalType;
};
