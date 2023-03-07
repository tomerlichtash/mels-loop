"use strict";
/**
 * General utility functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mlUtils = void 0;
const ALLOWED_MERGE_TYPES = [
    "object",
    "string",
    "number",
    "boolean",
];
class MLUtils {
    constructor() {
        var _a;
        this.seed = `mlid-${String(Date.now() % 1000)}`;
        this.nextNumber = Math.round(Date.now() % 1000);
        const t = typeof window;
        this._appEnvironment = {
            isDevMode: Boolean((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NEXT_PUBLIC_ML_DEBUG),
            isBrowser: (t === "object" || t === "function") && typeof window.setTimeout === "function"
        };
    }
    get appEnvironment() {
        return this._appEnvironment;
    }
    uniqueId(prefix = this.seed) {
        return `${prefix}-${this.nextNumber++}`;
    }
    arrayToMap(array, field) {
        const map = array.reduce((acc, elem) => {
            const value = elem && elem[field];
            if (value !== null && value !== undefined) {
                acc[String(value)] = elem;
            }
            return acc;
        }, {});
        return map;
    }
    stringArraysToMap(...arrays) {
        let map = {};
        for (const array of arrays) {
            array === null || array === void 0 ? void 0 : array.forEach(s => map[s] = 1);
        }
        return map;
    }
    parseDate(dateString) {
        const t = typeof dateString;
        if (t === "number") {
            return new Date(dateString);
        }
        if (t === "string") {
            try {
                const t = Date.parse(dateString);
                return new Date(t);
            }
            catch (e) {
                console.error(`Error parsing date ${dateString}`);
            }
        }
        return new Date();
    }
    /**
     * Sort-of-safely merge data into an object. The object should contain values in its fields,
     * so that the type can be determined at runtime
     * @param into
     * @param data
     * @returns
     */
    safeMerge(into, data) {
        if (!into || !data) {
            return into;
        }
        const realData = typeof data === "string" ? JSON.parse(data) : data;
        Object.keys(into).forEach((key) => {
            const val = realData[key];
            const tSource = typeof val;
            if (!ALLOWED_MERGE_TYPES.includes(tSource)) {
                return;
            }
            const myVal = into[key];
            const tTarget = typeof myVal;
            if (tTarget === "object") {
                if (myVal === null) {
                    into[key] = val;
                }
                else if (val instanceof Date || Array.isArray(val)) {
                    // we don't deep-merge arrays
                    into[key] = val;
                }
                else if (tSource === "object") {
                    this.safeMerge(myVal, val);
                }
                else if (myVal instanceof Date && tSource === "string") {
                    into[key] = this.parseDate(val);
                }
                else {
                    console.warn(`merge data: cannot merge field ${key} of type ${tSource} into object`);
                }
            }
            else {
                // target field is primitive, check source field
                if (tSource !== "object") {
                    into[key] = val;
                }
                else {
                    console.warn(`merge data: cannot merge field ${key} of type ${tSource} into ${tTarget}}`);
                }
            }
        });
        return into;
    }
    clonePlainObject(source) {
        return JSON.parse(JSON.stringify(source));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flattenArray(arr) {
        return arr.reduce((flat, toFlatten) => {
            return flat.concat(Array.isArray(toFlatten) ? this.flattenArray(toFlatten) : toFlatten);
        }, []);
    }
}
exports.mlUtils = new MLUtils();
//# sourceMappingURL=ml-utils.js.map