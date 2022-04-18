import {Button, Layout} from 'antd';
import React, {FC, memo} from 'react';
import {createUseStyles} from 'react-jss';
import {createEntitySidebar, FormInputType} from '../../../../core/blocks/entity-sidebar';
import {createEntityTable} from '../../../../core/blocks/entity-table';
import {ENDPOINT, ROUTES} from '../../../../core/consts/common';
import {createEntityAtoms} from '../../../../core/infrastructure/atom/createEntityAtoms';
import {CrudService} from '../../../../core/services/CrudService';
import {EntityMode} from '../../../../core/types/EntityModes';
import {ConditionModel} from '../../types';

const {entityListAtom, entityFormAtom, bindedActions} = createEntityAtoms<ConditionModel>({
    graphs: [],
    currencies: [],
    takeProfitCoeff: 0,
    stopLossCoeff: 0,
    cost: 0,
    login: '',
});

const service = new CrudService<ConditionModel>(ROUTES.CONDITIONS, ENDPOINT.CONDITIONS, bindedActions);

const GRAPH_OPTIONS = [
    {label: 'grapth1', value: '90431'},
    {label: 'grapth2', value: '904311231'},
];

const CURRENCY_OPTIONS = [
    {label: 'RUB', value: 'RUB'},
    {label: 'EUR', value: 'EUR'},
];

const formOptions = [
    {name: 'graphs', label: 'Graphs', type: FormInputType.Select, options: GRAPH_OPTIONS},
    {name: 'currencies', label: 'Currencies', type: FormInputType.Select, options: CURRENCY_OPTIONS},
    {name: 'takeProfitCoeff', label: 'Take Profit Coeff'},
    {name: 'stopLossCoeff', label: 'Stop Loss Coeff'},
    {name: 'cost', label: 'cost'},
    {name: 'login', label: 'Login'},
];

const EntityTable = createEntityTable({entityListAtom, service});
const EntitySidebar = createEntitySidebar({entityFormAtom, service, formOptions, entityName: 'Conditions'});

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
                        New condition
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
