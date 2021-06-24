import {EntityMode} from '../../core/types/EntityModes';
import {stringParser} from '../../core/utils/queryParsers';
import {ModalType} from './enums';

export const queryParsers = {
    id: stringParser(),
    mode: stringParser<EntityMode>(),
    modalType: stringParser<ModalType>(),
};
