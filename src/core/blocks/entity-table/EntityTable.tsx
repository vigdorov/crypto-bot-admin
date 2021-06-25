import {Atom} from '@reatom/core';
import {useAtom} from '@reatom/react';
import {head} from 'lodash';
import Table, {ColumnsType} from 'antd/lib/table';
import React, {FC, memo, useCallback, useEffect, useMemo} from 'react';
import {CrudService} from '../../services/CrudService';
import {EntityMode} from '../../types/EntityModes';
import {EntityWithId} from '../../api/CrudAPI';

type Props<T> = {
    entityListAtom: Atom<T[]>;
    service: CrudService<T>;
};

export const createEntityTable = function <T extends EntityWithId<unknown>> ({
    entityListAtom,
    service,
}: Props<T>): FC {
    return memo(() => {
        const entityList = useAtom(entityListAtom);

        useEffect(() => {
            service.loadEntityList();
        }, []);

        const onRow = useCallback((entity: EntityWithId<T>) => ({
            onClick: () => {
                service.navigate(EntityMode.Show, entity.id);
            },
        }), []);

        const columns: ColumnsType<EntityWithId<T>> = useMemo(() => {
            const entity = head(entityList);
            if (entity) {
                return Object.keys(entity).map(field => {
                    return {
                        title: field,
                        dataIndex: field,
                        key: field,
                    };
                });
            }
            return [];
        }, [entityList]);

        const dataSource = useMemo(() => {
            return entityList.map(entity => {
                return {
                    ...entity,
                    key: entity.id,
                };
            });
        }, [entityList]);

        return (
            <Table
                columns={columns}
                dataSource={dataSource}
                onRow={onRow}
            />
        );
    });
};

