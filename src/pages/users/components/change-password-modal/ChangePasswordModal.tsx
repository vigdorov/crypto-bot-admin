import {Input, Modal} from 'antd';
import React, {FC, memo, useCallback, useState} from 'react';
import {ROUTES} from '../../../../core/consts/common';
import {useQuery} from '../../../../core/hooks/useQuery';
import {routerService} from '../../../../core/services/RouterService';
import {LABELS} from '../../consts';
import {ModalType} from '../../enums';
import {usersService} from '../../services/UsersServices';
import {queryParsers} from '../../utils';

const handleClose = () => {
    routerService.pushWithQuery(ROUTES.USERS, {}, {reset: true});
};

const ChangePasswordModal: FC = () => {
    const {id, modalType} = useQuery(queryParsers);
    const isOpen = modalType === ModalType.ChangePassword;

    const [password, setForm] = useState('');

    const handleChange = useCallback((event: React.SyntheticEvent<HTMLInputElement>) => {
        setForm(event.currentTarget.value);
    }, [setForm]);

    const handleChangePassword = useCallback(() => {
        usersService.changePassword(id, password);
    }, [id, password]);

    return (
        <Modal
            title={LABELS.CHANGE_PASSWORD}
            visible={isOpen}
            onOk={handleChangePassword}
            onCancel={handleClose}
        >
            <form>
                <label>Password:</label>
                <Input onChange={handleChange} value={password} />
            </form>
        </Modal>
    );
};

export default memo(ChangePasswordModal);
