

export interface IClientDBService {
    /**
     * Returns the load error, if any
     */
    load(): Promise<string>;
}