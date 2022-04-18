import {CrudAPI, EntityWithId, EntityWithoutId} from '../api/CrudAPI';
import {EntityMode} from '../types/EntityModes';
import {routerService} from './RouterService';

type Actions<T> = {
    loadEntityList: (entities: T[]) => void,
    loadEntityForm: (entity: T) => void;
};

export class CrudService<T> {
    api: CrudAPI<T>;

    actions: Actions<T>;

    route: string;

    constructor(route: string, endpoint: string, actions: Actions<T>) {
        this.api = new CrudAPI(endpoint);
        this.actions = actions;
        this.route = route;
    }

    loadEntityForm(form: T) {
        this.actions.loadEntityForm(form);
    }

    loadEntityList() {
        return this.api
            .request()
            .then(({data}) => {
                this.actions.loadEntityList(data);
            });
    }

    loadEntity(id?: string) {
        if (id) {
            this.api
                .find(id)
                .then(entity => {
                    this.actions.loadEntityForm(entity);
                });
        }
    }

    updateEntity({id, ...entity}: EntityWithId<T>) {
        this.api
            .update(id, entity)
            .then(this.goRootAndReload);
    }

    removeEntity(id?: string) {
        if (id) {
            this.api
                .remove(id)
                .then(this.goRootAndReload);
        }
    }

    createEntity(entity: EntityWithoutId<T>) {
        this.api
            .create(entity)
            .then(this.goRootAndReload);
    }

    goRootAndReload = () => {
        this.loadEntityList().then(() => {
            this.navigate();
        });
    }

    navigate(mode?: EntityMode, id?: string) {
        routerService.pushWithQuery(this.route, {mode, id}, {reset: true});
    }
}
