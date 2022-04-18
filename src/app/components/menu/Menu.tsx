import {Menu} from 'antd';
import React, {FC, memo, useCallback, useMemo, useState} from 'react';
import {TeamOutlined, DollarCircleOutlined, ClusterOutlined, InteractionOutlined, DeploymentUnitOutlined} from '@ant-design/icons';
import {ROUTES} from '_consts/common';
import {Link, useLocation} from 'react-router-dom';

const MENU = [
    {
        label: 'Users',
        icon: <TeamOutlined />,
        url: ROUTES.USERS,
    },
    {
        label: 'Actions',
        icon: <InteractionOutlined />,
        url: ROUTES.ACTIONS,
    },
    {
        label: 'Conditions',
        icon: <ClusterOutlined />,
        url: ROUTES.CONDITIONS,
    },
    {
        label: 'Graphs',
        icon: <DeploymentUnitOutlined />,
        url: ROUTES.GRAPHS,
    },
    {
        label: 'Currencies',
        icon: <DollarCircleOutlined />,
        url: ROUTES.CURRENCIES,
    },
];

const TopMenu: FC = () => {
    const {pathname} = useLocation();
    const [selected, setSelected] = useState(pathname);

    const selectedKeys = useMemo(() => [selected], [selected]);

    const handleClick = useCallback((e: {key: string}) => {
        setSelected(e.key);
    }, [setSelected]);

    return (
        <Menu onClick={handleClick} selectedKeys={selectedKeys} theme="dark" mode="inline">
            {MENU.map(({label, icon, url}) => {
                return (
                    <Menu.Item key={url} icon={icon}>
                        <Link to={url}>{label}</Link>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};

export default memo(TopMenu);
