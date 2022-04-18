import {EntityWithoutId} from '_api/CrudAPI';
import {ROUTES} from '_consts/common';
import {bindedActions, INIT_USER} from '_infrastructure/atom/usersAtom';
import {routerService} from '_services/RouterService';
import {usersAPI} from '../api/UsersAPI';
import {User} from '../types';

class UsersService {
    loadUsers() {
        return usersAPI
            .request()
            .then(({data}) => {
                bindedActions.loadUsersAction(data);
            });
    }

    loadUser(id?: string) {
        if (id) {
            usersAPI
                .find(id)
                .then(user => {
                    bindedActions.loadUserForm({
                        ...user,
                        password: '',
                    });
                });
        }
        bindedActions.loadUserForm(INIT_USER);
    }

    createUser(user: EntityWithoutId<User>) {
        usersAPI
            .create(user)
            .then(() => {
                this.loadUsers().then(() => {
                    routerService.push(ROUTES.USERS);
                });
            });
    }

    changePassword(id?: string, password?: string) {
        if (id && password) {
            usersAPI
                .changePassword(id, password)
                .then(() => {
                    this.loadUsers().then(() => {
                        routerService.push(ROUTES.USERS);
                    });
                });
        }
    }

    updateUser({id, ...user}: User) {
        usersAPI
            .update(id, user)
            .then(() => {
                this.loadUsers().then(() => {
                    routerService.push(ROUTES.USERS);
                });
            });
    }

    removeUser(id?: string) {
        if (id) {
            usersAPI
                .remove(id)
                .then(() => {
                    this.loadUsers().then(() => {
                        routerService.push(ROUTES.USERS);
                    });
                });
        }
    }
}

export const usersService = new UsersService();
