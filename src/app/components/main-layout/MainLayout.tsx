import {Button, Layout} from 'antd';
import React, {FC, memo, PropsWithChildren} from 'react';
import {createUseStyles} from 'react-jss';
import authServiceApi from '../../../core/infrastructure/AuthServiceAPI';
import Menu from '../menu';

const useStyles = createUseStyles({
    layout: {
        height: '100%',
    },
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    buttonContainer: {
        margin: 'auto 16px 16px 16px',
    },
    button: {
        width: '100%',
    }
});

const handleSignOut = () => {
    authServiceApi.signOut();
};

const MainLayout: FC<PropsWithChildren<unknown>> = ({children}) => {
    const classes = useStyles();

    return (
        <Layout className={classes.layout}>
            <Layout.Sider>
                <div className={classes.container}>
                    <Menu />
                    <div className={classes.buttonContainer}>
                        <Button type="primary" className={classes.button} onClick={handleSignOut}>Sign out</Button>
                    </div>
                </div>
            </Layout.Sider>
            <Layout>
                <Layout.Content>
                    {children}
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default memo(MainLayout);
