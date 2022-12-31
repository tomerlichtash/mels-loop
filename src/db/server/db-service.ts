
export interface IDBOptions {
    schema?: string;
}

export interface IDBService {
    init(): Promise<boolean>
}

class ServerDBService {
    private readonly options: IDBOptions;
    constructor(options: IDBOptions) {
        this.options = Object.assign({}, options);
    }
    async init(): Promise<boolean> {
        return true;
    }
}

export const createServerDB = (options: IDBOptions): IDBService => {
    return new ServerDBService(options);
}