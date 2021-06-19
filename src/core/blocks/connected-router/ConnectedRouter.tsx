import {useAtom} from '@reatom/react';
import React, {FC, Fragment, memo, PropsWithChildren, useEffect} from 'react';
import {useHistory} from 'react-router';
import {routerAtom} from '../../infrastructure/atom/routerAtom';

const ConnectedRouter: FC<PropsWithChildren<unknown>> = ({children}) => {
    const history = useHistory();

    const route = useAtom(routerAtom);

    useEffect(() => {
        history.push(route);
    }, [history, route]);

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default memo(ConnectedRouter);
