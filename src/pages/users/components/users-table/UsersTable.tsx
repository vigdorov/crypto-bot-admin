import {useAtom} from '@reatom/react';
import {Button, Table} from 'antd';
import {ColumnsType} from 'antd/lib/table';
import {head} from 'lodash';
import React, {FC, memo, useEffect, useMemo} from 'react';
import {ROUTES} from '_consts/common';
import {usersAtom} from '_infrastructure/atom/usersAtom';
import {routerService} from '_services/RouterService';
import {EntityMode} from '_types/EntityModes';
import {objectKeys} from '_utils/objectKeys';
import {ModalType} from '../../enums';
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

const onClick = (id: string) => (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    routerService.pushWithQuery(ROUTES.USERS, {
        id,
        modalType: ModalType.ChangePassword,
    });
};

const UsersTable: FC = () => {
    const users = useAtom(usersAtom);

    useEffect(() => {
        usersService.loadUsers();
    }, []);

    const columns: ColumnsType<User> = useMemo(() => {
        const user = head(users);
        if (user) {
            return objectKeys(user).map(field => {
                if (field === 'password') {
                    return {
                        title: field,
                        key: field,
                        render: () => (
                            <Button onClick={onClick(user.id)}>Change password</Button>
                        ),
                    };
                }
                return {
                    title: field,
                    dataIndex: field,
                    key: field,
                };
            });
        }
        return [];
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
