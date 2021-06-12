import {Layout} from 'antd';
import React, {FC, memo, PropsWithChildren} from 'react';
import {createUseStyles} from 'react-jss';
import Menu from '../menu';

const useStyles = createUseStyles({
    layout: {
        height: '100%',
    },
});

const MainLayout: FC<PropsWithChildren<unknown>> = ({children}) => {
    const classes = useStyles();
    return (
        <Layout className={classes.layout}>
            <Layout.Sider>
                <Menu />
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
