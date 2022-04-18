import {EntityMode} from '_types/EntityModes';
import {stringParser} from '_utils/queryParsers';
import {ModalType} from './enums';

export const queryParsers = {
    id: stringParser(),
    mode: stringParser<EntityMode>(),
    modalType: stringParser<ModalType>(),
};
