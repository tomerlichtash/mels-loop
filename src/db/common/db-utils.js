"use strict";
/* eslint  @typescript-eslint/no-explicit-any: 0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.importDBData = void 0;
function processDBDump(db, data) {
    const processed = Object.assign(Object.assign({}, data), { collections: data.collections.map(c => {
            const dbCollection = db.collections[c.name];
            if (dbCollection) {
                c.schemaHash = dbCollection.schema.hash;
            }
            else {
                console.warn(`Missing schema for imported collection ${c.name}`);
            }
            return c;
        }) });
    return processed;
}
/**
 * Changes the data IN PLACE
 *
 * Creates a db dump with collecton schema hashes matching the schema hashes of the provided database,
 * then optionally imports the data to a rxdb
 *
 * Will throw if anything goes wrong
 * @param db
 * @param dump
 */
async function importDBData({ db, dump, loadData }) {
    for (let schema of dump.schemas || []) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await db.addCollections(schema);
    }
    const importData = processDBDump(db, dump.data);
    if (loadData) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await db.importJSON(importData);
    }
    return db;
}
exports.importDBData = importDBData;
//# sourceMappingURL=db-utils.js.map