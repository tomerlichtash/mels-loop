
export interface IDBOptions {

}

export interface IDBService {

}

class ServerDBService {
    constructor(options: IDBOptions) {

    }
}

export const createServerDB = (options: IDBOptions): IDBService => {
    return new ServerDBService(options);
}