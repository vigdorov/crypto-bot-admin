import {Button, Layout} from 'antd';
import React, {FC, memo} from 'react';
import {createUseStyles} from 'react-jss';
import {createEntitySidebar} from '../../../../core/blocks/entity-sidebar';
import {createEntityTable} from '../../../../core/blocks/entity-table';
import {ENDPOINT, ROUTES} from '../../../../core/consts/common';
import {createEntityAtoms} from '../../../../core/infrastructure/atom/createEntityAtoms';
import {CrudService} from '../../../../core/services/CrudService';
import {EntityMode} from '../../../../core/types/EntityModes';
import {CurrencyModel} from '../../types';

const {entityListAtom, entityFormAtom, bindedActions} = createEntityAtoms<CurrencyModel>({
    name: '',
});

const service = new CrudService<CurrencyModel>(ROUTES.GRAPHS, ENDPOINT.GRAPHS, bindedActions);

const formOptions = [
    {name: 'name', label: 'Name'},
];

const EntityTable = createEntityTable({entityListAtom, service});
const EntitySidebar = createEntitySidebar({entityFormAtom, service, formOptions, entityName: 'Currency'});

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
                        New currency
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
