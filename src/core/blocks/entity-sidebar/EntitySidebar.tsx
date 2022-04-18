import {Atom} from '@reatom/core';
import {useAtom} from '@reatom/react';
import {Button, Checkbox as CheckboxInput, Drawer, Input, Select as SelectInput} from 'antd';
import {CheckboxChangeEvent} from 'antd/lib/checkbox';
import {SelectValue} from 'antd/lib/select';
import React, {FC, Fragment, memo, SyntheticEvent, useCallback, useEffect, useMemo} from 'react';
import {createUseStyles} from 'react-jss';
import {queryParsers} from '../../../pages/users/utils';
import {useQuery} from '../../hooks/useQuery';
import {CrudService} from '../../services/CrudService';
import {EntityMode} from '../../types/EntityModes';

export enum FormInputType {
    Text = 'text',
    Checkbox = 'checkobx',
    Select = 'select',
}

type SelectOption = {
    value: string;
    label: string;
};

type FormOption = {
    name: string;
    label: string;
    type?: FormInputType;
    options?: SelectOption[];
    checkboxLabel?: string;
};

type Options<T> = {
    entityFormAtom: Atom<T>;
    service: CrudService<T>;
    formOptions: FormOption[];
    entityName: string;
};

const AVAILABLE_CLOSE_MODES = [EntityMode.Show];
const DISABLED_FORM_MODES = [EntityMode.Show];

const useStyles = createUseStyles({
    button: {
        marginRight: '8px',
    },
    input: {
        marginBottom: '16px',
        width: '100%',
    },
});

export const createEntitySidebar = function <T> ({
    entityFormAtom,
    service,
    formOptions,
    entityName,
}: Options<T>): FC {
    return memo(() => {
        const {mode, id} = useQuery(queryParsers);
        const form = useAtom(entityFormAtom);
        const classes = useStyles();

        useEffect(() => {
            service.loadEntity(id);
        }, [id, mode]);

        const handleClose = () => {
            service.navigate();
        };

        const onChangeInput = (event: SyntheticEvent<HTMLInputElement>) => {
            const {name, value} = event.currentTarget;
            service.loadEntityForm({
                ...form,
                [name]: value,
            });
        };

        const onChangeCheckbox = (event: CheckboxChangeEvent) => {
            const {name, checked} = event.target;
            service.loadEntityForm({
                ...form,
                [name!]: checked,
            });
        };

        const onChangeSelect = (name: string) => (value: SelectValue) => {
            if (!Array.isArray(value)) {
                service.loadEntityForm({
                    ...form,
                    [name]: value,
                });
            }
        };

        const disabled = useMemo(() => !mode || DISABLED_FORM_MODES.includes(mode), [mode]);

        const handleCreateUser = useCallback(() => {
            service.createEntity(form);
        }, [form]);

        const handleSaveUser = useCallback(() => {
            if (id) {
                service.updateEntity({
                    ...form,
                    id,
                });
            }
        }, [form, id]);

        const handleCopy = useCallback(() => {
            service.navigate(EntityMode.Copy, id);
        }, [id]);

        const handleEdit = useCallback(() => {
            service.navigate(EntityMode.Edit, id);
        }, [id]);

        const handleDelete = useCallback(() => {
            service.removeEntity(id);
        }, [id]);

        const handleBackdrop = useCallback(() => {
            if (mode && AVAILABLE_CLOSE_MODES.includes(mode)) {
                handleClose();
            }
        }, [mode]);

        const title = useMemo(() => {
            switch (mode) {
                case EntityMode.Create:
                    return `Creating a ${entityName}`;
                case EntityMode.Copy:
                    return `Coping ${entityName} "${id}"`;
                case EntityMode.Edit:
                    return `Editing ${entityName} "${id}"`;
                case EntityMode.Show:
                    return `Viewing ${entityName} "${id}"`;
                default:
                    return `Mode "${mode}" not supported for ${entityName} form`;
            }
        }, [mode, id]);

        const primaryButton = useMemo(() => {
            switch (mode) {
                case EntityMode.Create:
                case EntityMode.Copy:
                    return (
                        <Button
                            className={classes.button}
                            onClick={handleCreateUser}
                            type="primary"
                        >
                            Create
                        </Button>
                    );
                case EntityMode.Edit:
                    return (
                        <Button
                            className={classes.button}
                            onClick={handleSaveUser}
                            type="primary"
                        >
                            Save
                        </Button>
                    );
                case EntityMode.Show:
                    return (
                        <Button
                            className={classes.button}
                            onClick={handleEdit}
                            type="primary"
                        >
                            Edit
                        </Button>
                    );
                default:
                    return null;
            }
        }, [mode, classes, handleEdit, handleCreateUser, handleSaveUser]);

        const renderFooter = useMemo(() => {
            return (
                <div>
                    {primaryButton}
                    {mode === EntityMode.Show && (
                        <Fragment>
                            <Button
                                className={classes.button}
                                onClick={handleCopy}
                            >
                                Copy
                            </Button>
                            <Button
                                className={classes.button}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </Fragment>
                    )}
                    <Button onClick={handleClose}>Cancel</Button>
                </div>
            );
        }, [primaryButton, mode, classes, handleCopy, handleDelete]);

        return (
            <Drawer
                visible={!!mode}
                closable={false}
                onClose={handleBackdrop}
                width="600"
                title={title}
                footer={renderFooter}
            >
                <form>
                    {formOptions.map(({name, label, type = FormInputType.Text, options, checkboxLabel}) => {
                        return (
                            <div key={name}>
                                <label>{label}:</label>
                                {type === FormInputType.Checkbox && (
                                    <CheckboxInput
                                        name={name}
                                        className={classes.input}
                                        disabled={disabled}
                                        value={(form as any)[name]}
                                        onChange={onChangeCheckbox}
                                        type="checkbox"
                                    >
                                        {checkboxLabel ?? label}
                                    </CheckboxInput>
                                )}
                                {type === FormInputType.Select && (
                                    <SelectInput
                                        className={classes.input}
                                        disabled={disabled}
                                        value={(form as any)[name]}
                                        onChange={onChangeSelect(name)}
                                    >
                                        {(options ?? []).map(option => (
                                            <SelectInput.Option
                                                value={option.value}
                                                key={option.value}
                                            >
                                                {option.label}
                                            </SelectInput.Option>
                                        ))}
                                    </SelectInput>
                                )}
                                {type === FormInputType.Text && (
                                    <Input
                                        name={name}
                                        className={classes.input}
                                        disabled={disabled}
                                        value={(form as any)[name]}
                                        onChange={onChangeInput}
                                    />
                                )}
                            </div>
                        );
                    })}
                </form>
            </Drawer>
        );
    });
};
