
import { CaseInsensitiveMap } from "../src/lib/case-insensitive-collections";

type ArgMap = CaseInsensitiveMap<string>;

export interface ICommandLineArguments {
	hasCommandLineArgument(key: string): boolean;

	addCommandLineArgument(key: string, value: string): void;

	getAllCommandLineArguments(): ArgMap;

	getCommandLineArgument(key: string): string | undefined;
}

const makeArgumentKey = function (key: string): string {
	return (key || "").trim().replace(/^-+/, "");
}

const createArgMap = function (argv: string[]): ArgMap {

	const map = new CaseInsensitiveMap<string>();
	let nextArg: string,
		param: string;
	for (let i = 0, len = argv.length; i < len; ++i) {
		nextArg = argv[i];
		if (nextArg && (nextArg[0] === '-')) {
			if (i === len - 1) {
				param = "";
			}
			else {
				param = argv[i + 1];
				if (param && param[0] === '-') {
					param = "";
				}
				else {
					++i;
				}
			}
			map.set(makeArgumentKey(nextArg), String(param));
		}
	}
	return map;
}

export class CommandLineArguments implements ICommandLineArguments {
	private _argMap: ArgMap;


	constructor(argv: string[]) {
		this._argMap = createArgMap(argv || []);
	}
	public hasCommandLineArgument(key: string): boolean {
		return this._argMap.has(makeArgumentKey(key));
	}

	public addCommandLineArgument(key: string, value: string): void {
		key = (key || "").trim().replace(/^\-+/, "");
		if (!key) {
			throw new Error("addCommandLineArgument: Illegal empty key");
		}
		key = makeArgumentKey(key);
		if (value === undefined || value === null) {
			value = "";
		}
		else {
			value = String(value);
		}
		this._argMap.set(key, value);
	}

	public getAllCommandLineArguments(): ArgMap {
		return new Map<string, string>(this._argMap);
	}

	public getCommandLineArgument(key: string): string | undefined {
		if (typeof key !== "string") {
			return undefined;
		}
		key = makeArgumentKey(key);
		return this._argMap.has(key)?
			this._argMap.get(key): undefined;
	}


}
