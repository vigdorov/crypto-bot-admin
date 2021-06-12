import React, {Fragment, memo} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Container, createStyles, makeStyles} from '@material-ui/core';
import {createStore} from '@reatom/core';
import {context} from '@reatom/react';
import mainPageRouter from '_pages/main/routing';
import NotFoundPage from '_pages/not-found/components/page';
import './Page.scss';

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            height: '100hv',
            display: 'flex',
            flexDirection: 'column',
        },
    }),
);

const Page: React.FC = () => {
    const classes = useStyles();
    const store = createStore();

    return (
        <Fragment>
            <div className={classes.container}>
                <context.Provider value={store}>
                    <Container>
                        <Switch>
                            {mainPageRouter}
                            <Route>
                                <NotFoundPage />
                            </Route>
                        </Switch>
                    </Container>
                </context.Provider>
            </div>
        </Fragment>
    );
};

export default memo(Page);
