import {Button, Layout} from 'antd';
import React, {FC, Fragment, memo} from 'react';
import {createUseStyles} from 'react-jss';
import {ROUTES} from '_consts/common';
import {routerService} from '_services/RouterService';
import {EntityMode} from '_types/EntityModes';
import ChangePasswordModal from '../change-password-modal/ChangePasswordModal';
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
        <Fragment>
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
            <ChangePasswordModal />
        </Fragment>
    );
};

export default memo(Page);
