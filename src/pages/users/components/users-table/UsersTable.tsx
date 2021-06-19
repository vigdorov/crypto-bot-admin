import {useAtom} from '@reatom/react';
import {Table} from 'antd';
import {head} from 'lodash';
import React, {FC, memo, useEffect, useMemo} from 'react';
import {ROUTES} from '../../../../core/consts/common';
import {usersAtom} from '../../../../core/infrastructure/atom/usersAtom';
import {routerService} from '../../../../core/services/RouterService';
import {EntityMode} from '../../../../core/types/EntityModes';
import {objectKeys} from '../../../../core/utils/objectKeys';
import {usersService} from '../../services/UsersServices';
import {User} from '../../types';

const onRow = (user: User) => ({
    onClick: () => {
        routerService.pushWithQuery(ROUTES.USERS, {
            id: user.id,
            mode: EntityMode.Show,
        });
    },
});

const UsersTable: FC = () => {
    const users = useAtom(usersAtom);

    useEffect(() => {
        usersService.loadUsers();
    }, []);

    const columns = useMemo(() => {
        return objectKeys(head(users) ?? {}).map(field => {
            return {
                title: field,
                dataIndex: field,
                key: field,
            };
        });
    }, [users]);

    const dataSource = useMemo(() => {
        return users.map(user => {
            return {
                ...user,
                key: user.id,
            };
        });
    }, [users]);

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            onRow={onRow}
        />
    );
};

export default memo(UsersTable);
