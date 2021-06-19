import {Button, Layout} from 'antd';
import React, {FC, memo} from 'react';
import {createUseStyles} from 'react-jss';
import {ROUTES} from '../../../../core/consts/common';
import {routerService} from '../../../../core/services/RouterService';
import {EntityMode} from '../../../../core/types/EntityModes';
import UserSidebar from '../user-sidebar/UserSidebar';
import UsersTable from '../users-table/UsersTable';

const useStyles = createUseStyles({
    header: {
        backgroundColor: '#fff',
    }
});

const handleClickNewUser = () => {
    routerService.pushWithQuery(ROUTES.USERS, {
        mode: EntityMode.Create,
    });
};

const Page: FC = () => {
    const classes = useStyles();
    return (
        <Layout>
            <Layout.Header className={classes.header}>
                <Button
                    type="primary"
                    onClick={handleClickNewUser}
                >
                    New user
                </Button>
            </Layout.Header>
            <Layout.Content>
                <UsersTable />
                <UserSidebar />
            </Layout.Content>
        </Layout>
    );
};

export default memo(Page);
