import React, {memo} from 'react';
import {Route, Switch} from 'react-router-dom';
import {context} from '@reatom/react';
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

const Page: React.FC = () => {
    return (
        <context.Provider value={store}>
            <ConnectedRouter>
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
            </ConnectedRouter>
        </context.Provider>
    );
};

export default memo(Page);
