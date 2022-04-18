import {Button, Layout} from 'antd';
import moment from 'moment';
import React, {FC, memo} from 'react';
import {createUseStyles} from 'react-jss';
import {createEntityAtoms} from '_infrastructure/atom/createEntityAtoms';
import {createEntitySidebar, FormInputType} from '../../../../core/blocks/entity-sidebar';
import {createEntityTable} from '../../../../core/blocks/entity-table';
import {ENDPOINT, ROUTES} from '../../../../core/consts/common';
import {CrudService} from '../../../../core/services/CrudService';
import {EntityMode} from '../../../../core/types/EntityModes';
import {ActionModel} from '../../types';

const {entityListAtom, entityFormAtom, bindedActions} = createEntityAtoms<ActionModel>({
    createAt: moment().toISOString(),
    closedAt: moment().toISOString(),
    type: '',
    login: '',
    isExperiment: true,
});

const service = new CrudService<ActionModel>(ROUTES.ACTIONS, ENDPOINT.ACTIONS, bindedActions);

const TYPE_SELECT_OPTIONS = [
    {value: 'up', label: 'Up'},
    {value: 'down', label: 'Down'},
];

const formOptions = [
    {name: 'createAt', label: 'Create at'},
    {name: 'closedAt', label: 'Close at'},
    {name: 'type', label: 'Type', type: FormInputType.Select, options: TYPE_SELECT_OPTIONS},
    {name: 'login', label: 'Login'},
    {name: 'isExperiment', label: 'Is experiment', type: FormInputType.Checkbox, checkboxLabel: 'Enabled experiment'},
];

const EntityTable = createEntityTable({entityListAtom, service});
const EntitySidebar = createEntitySidebar({
    entityFormAtom,
    service,
    formOptions,
    entityName: 'Action'
});

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
                    New action
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
