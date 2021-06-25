import {useAtom} from '@reatom/react';
import {Button, Drawer, Input} from 'antd';
import React, {FC, Fragment, memo, SyntheticEvent, useCallback, useEffect, useMemo} from 'react';
import {createUseStyles} from 'react-jss';
import {ROUTES} from '_consts/common';
import {useQuery} from '_hooks/useQuery';
import {bindedActions, userFormAtom} from '_infrastructure/atom/usersAtom';
import {routerService} from '_services/RouterService';
import {EntityMode} from '_types/EntityModes';
import {usersService} from '../../services/UsersServices';
import {queryParsers} from '../../utils';

const AVAILABLE_CLOSE_MODES = [EntityMode.Show];
const DISABLED_FORM_MODES = [EntityMode.Show];
const SHOW_PASSWORD_MODES = [EntityMode.Create, EntityMode.Copy];

const useStyles = createUseStyles({
    button: {
        marginRight: '8px',
    },
    input: {
        marginBottom: '16px',
    },
});

const handleClose = () => {
    routerService.push(ROUTES.USERS);
};

const UserSidebar: FC = () => {
    const {mode, id} = useQuery(queryParsers);
    const form = useAtom(userFormAtom);
    const classes = useStyles();

    useEffect(() => {
        usersService.loadUser(id);
    }, [id, mode]);

    const onChange = (event: SyntheticEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget;
        bindedActions.loadUserForm({
            ...form,
            [name]: value,
        });
    };

    const disabled = useMemo(() => !mode || DISABLED_FORM_MODES.includes(mode), [mode]);

    const handleCreateUser = useCallback(() => {
        const {login, password} = form;
        usersService.createUser({login, password});
    }, [form]);

    const handleSaveUser = useCallback(() => {
        usersService.updateUser(form);
    }, [form]);

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
                <div>
                    <label>Логин:</label>
                    <Input
                        name="login"
                        className={classes.input}
                        disabled={disabled}
                        value={form.login}
                        onChange={onChange}
                    />
                </div>
                {mode && SHOW_PASSWORD_MODES.includes(mode) && (
                    <div>
                        <label>Пароль:</label>
                        <Input
                            name="password"
                            className={classes.input}
                            disabled={disabled}
                            value={form.password}
                            onChange={onChange}
                        />
                    </div>
                )}
            </form>
        </Drawer>
    );
};

export default memo(UserSidebar);
