import React, {FC, Fragment, memo, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {context, useAtom} from '@reatom/react';
import mainPageRouter from '_pages/main/routing';
import usersPageRouter from '_pages/users/routing';
import actionsPageRouter from '_pages/actions/routing';
import conditionsPageRouter from '_pages/conditions/routing';
import graphsPageRouter from '_pages/graphs/routing';
import currenciesPageRouter from '_pages/currencies/routing';
import NotFoundPage from '_pages/not-found/components/page';
import MainLayout from '../main-layout';
import jss from 'jss';
import preset from 'jss-preset-default';
import {store} from '../../../core/infrastructure/atom/store';
import ConnectedRouter from '../../../core/blocks/connected-router/ConnectedRouter';
import {authAtom} from '../../../core/infrastructure/atom/authAtom';
import LoginLayout from '../login-layout';
import authServiceApi from '../../../core/infrastructure/AuthServiceAPI';

jss.setup(preset());

const styles = {
    '@global': {
        html: {
            height: '100%',
        },
        body: {
            height: '100%',
            margin: '0',
        },
        '#root': {
            height: '100%',
        },
    }
};

jss.createStyleSheet(styles).attach();

const SecurityRoutes: FC = memo(() => {
    const isAuth = useAtom(authAtom);
    return (
        <Fragment>
            {isAuth && (
                <MainLayout>
                    <Switch>
                        {mainPageRouter}
                        {usersPageRouter}
                        {actionsPageRouter}
                        {conditionsPageRouter}
                        {graphsPageRouter}
                        {currenciesPageRouter}
                        <Route>
                            <NotFoundPage />
                        </Route>
                    </Switch>
                </MainLayout>
            )}
            {!isAuth && (
                <LoginLayout />
            )}
        </Fragment>
    );
});

const Page: FC = () => {
    useEffect(() => {
        authServiceApi.refresh();
    });

    return (
        <context.Provider value={store}>
            <ConnectedRouter>
                <SecurityRoutes />
            </ConnectedRouter>
        </context.Provider>
    );
};

export default memo(Page);
