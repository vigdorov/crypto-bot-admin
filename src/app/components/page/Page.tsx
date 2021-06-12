import React, {memo} from 'react';
import {Route, Switch} from 'react-router-dom';
import {createStore} from '@reatom/core';
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
    const store = createStore();

    return (
        <context.Provider value={store}>
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
        </context.Provider>
    );
};

export default memo(Page);
