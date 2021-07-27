export class StorageAPI<T> {
    private _init: T;

    private _storage: Storage;

    private _stateName: string;

    constructor(init: T, stateName: string, storageType: 'local' | 'session' = 'local') {
        this._init = init;
        this._stateName = stateName;
        this._storage = storageType === 'local' ? localStorage : sessionStorage;

        if (!this._storage.getItem(stateName)) {
            this.set(this._init);
        }
    }

    set(updatedState: T) {
        this._storage.setItem(this._stateName, JSON.stringify(updatedState));
    }

    get(): T {
        const stringValue = this._storage.getItem(this._stateName) || '';

        try {
            return JSON.parse(stringValue);
        } catch (e) {
            return this._init;
        }
    }

    clear() {
        this._storage.removeItem(this._stateName);
    }
}
