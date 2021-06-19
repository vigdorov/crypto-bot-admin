import {useAtom} from '@reatom/react';
import {Button, Drawer, Form, Input} from 'antd';
import React, {FC, Fragment, memo, useCallback, useEffect, useMemo} from 'react';
import {createUseStyles} from 'react-jss';
import {ROUTES} from '../../../../core/consts/common';
import {useQuery} from '../../../../core/hooks/useQuery';
import {bindedActions, FieldData, userFormAtom} from '../../../../core/infrastructure/atom/usersAtom';
import {isNotEmpty} from '../../../../core/referers/common';
import {routerService} from '../../../../core/services/RouterService';
import {EntityMode} from '../../../../core/types/EntityModes';
import {usersService} from '../../services/UsersServices';
import {User} from '../../types';
import {queryParsers} from '../../utils';

const AVAILABLE_CLOSE_MODES = [EntityMode.Show];
const DISABLED_FORM_MODES = [EntityMode.Show];
const SHOW_ID_MODES = [EntityMode.Show];

const useStyles = createUseStyles({
    button: {
        marginRight: '8px',
    }
});

const handleClose = () => {
    routerService.push(ROUTES.USERS);
};

const onFieldsChange = (_: FieldData[], allFields: FieldData[]) => {
    bindedActions.loadUserForm(allFields);
};

const UserSidebar: FC = () => {
    const {mode, id} = useQuery(queryParsers);
    const fields = useAtom(userFormAtom);
    const classes = useStyles();

    useEffect(() => {
        usersService.loadUser(id);
    }, [id, mode]);

    const disabled = useMemo(() => !mode || DISABLED_FORM_MODES.includes(mode), [mode]);

    const handleCreate = useCallback(() => {
        const user = fields.reduce<User>((acc, {name, value}) => {
            if (Array.isArray(name)) {
                if (isNotEmpty(name[0])) {
                    acc[name[0]] = value;
                }
            } else {
                acc[name] = value;
            }
            return acc;
        }, {id: '', login: '', password: ''});
        usersService.createUser(user);
    }, [fields]);

    const handleCopy = useCallback(() => {
        if (id) {
            routerService.pushWithQuery(ROUTES.USERS, {
                id,
                mode: EntityMode.Copy,
            });
        }
    }, [id]);

    const handleEdit = useCallback(() => {
        if (id) {
            routerService.pushWithQuery(ROUTES.USERS, {
                id,
                mode: EntityMode.Edit,
            });
        }
    }, [id]);

    const handleDelete = useCallback(() => {
        usersService.removeUser(id);
    }, [id]);

    const handleBackdrop = useCallback(() => {
        if (mode && AVAILABLE_CLOSE_MODES.includes(mode)) {
            handleClose();
        }
    }, [mode]);

    const title = useMemo(() => {
        switch (mode) {
            case EntityMode.Create:
                return 'Creating a user';
            case EntityMode.Copy:
                return `Coping user "${id}"`;
            case EntityMode.Edit:
                return `Editing user "${id}"`;
            case EntityMode.Show:
                return `Viewing user "${id}"`;
            default:
                return `Mode "${mode}" not supported for user form`;
        }
    }, [mode, id]);

    const primaryButton = useMemo(() => {
        switch (mode) {
            case EntityMode.Create:
            case EntityMode.Copy:
                return (
                    <Button
                        className={classes.button}
                        onClick={handleCreate}
                        type="primary"
                    >
                        Create
                    </Button>
                );
            case EntityMode.Edit:
                return (
                    <Button
                        className={classes.button}
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
    }, [mode, classes, handleEdit, handleCreate]);

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
            <Form
                fields={fields}
                onFieldsChange={onFieldsChange as any}
            >
                <Form.Item
                    label="Login"
                    name="login"
                >
                    <Input disabled={disabled} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                >
                    <Input disabled={disabled} />
                </Form.Item>
                {mode && SHOW_ID_MODES.includes(mode) && (
                    <Form.Item
                        label="ID"
                        name="id"
                    >
                        <Input disabled={disabled} />
                    </Form.Item>
                )}
            </Form>
        </Drawer>
    );
};

export default memo(UserSidebar);
