import {ROUTES} from '../../../core/consts/common';
import {bindedActions, FieldData, INIT_USER} from '../../../core/infrastructure/atom/usersAtom';
import {routerService} from '../../../core/services/RouterService';
import {objectEntries} from '../../../core/utils/objectEntries';
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
                    const fieldData = objectEntries(user).reduce<FieldData[]>((acc, [name, value]) => {
                        acc.push({name, value});
                        return acc;
                    }, []);
                    bindedActions.loadUserForm(fieldData);
                });
        }
        bindedActions.loadUserForm(INIT_USER);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createUser({id, ...user}: User) {
        usersAPI
            .create(user)
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
