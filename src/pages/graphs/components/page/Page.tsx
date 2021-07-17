import {Button, Layout} from 'antd';
import React, {FC, memo} from 'react';
import {createUseStyles} from 'react-jss';
import {createEntitySidebar} from '../../../../core/blocks/entity-sidebar';
import {createEntityTable} from '../../../../core/blocks/entity-table';
import {ENDPOINT, ROUTES} from '../../../../core/consts/common';
import {createEntityAtoms} from '../../../../core/infrastructure/atom/createEntityAtoms';
import {CrudService} from '../../../../core/services/CrudService';
import {EntityMode} from '../../../../core/types/EntityModes';
import {GraphModel} from '../../types';

const {entityListAtom, entityFormAtom, bindedActions} = createEntityAtoms<GraphModel>({
    type: '',
    graphName: '',
    from: '',
    to: '',
});

const service = new CrudService<GraphModel>(ROUTES.GRAPHS, ENDPOINT.GRAPHS, bindedActions);

const formOptions = [
    {name: 'type', label: 'Type'},
    {name: 'graphName', label: 'Graph name'},
    {name: 'from', label: 'From'},
    {name: 'to', label: 'To'},
];

const EntityTable = createEntityTable({entityListAtom, service});
const EntitySidebar = createEntitySidebar({entityFormAtom, service, formOptions, entityName: 'Graph'});

const useStyles = createUseStyles({
    header: {
        backgroundColor: '#fff',
    }
});

const handleClickNewEntity = () => {
    service.navigate(EntityMode.Create);
};

const Page: FC = () => {
    const classes = useStyles();

    return (
        <Layout>
                <Layout.Header className={classes.header}>
                    <Button
                        type="primary"
                        onClick={handleClickNewEntity}
                    >
                        New graph
                    </Button>
                </Layout.Header>
                <Layout.Content>
                    <EntityTable />
                    <EntitySidebar />
                </Layout.Content>
            </Layout>
    );
};

export default memo(Page);
