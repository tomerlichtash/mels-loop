/** A stack of parsed nodes */
interface IContentStack<T> {
	readonly count: number;

	/** Returns the topmost node, null when the stack is empty. */
	readonly current: T | null;

	/** Returns a copy of the stack array */
	readonly stack: Array<T>;

	/**
	 * Pushes the node only if its not null and different (by key) from the top node
	 * @param node
	 * @returns the content stack object, e.g. for chaining
	 */
	push(node: T): IContentStack<T>;

	/**
	 * Set the tip of the stack to the provided index, if legal (bad input is ignored)
	 * @param index
	 */
	setIndex(index: number): IContentStack<T>;

	/**
	 * Returns the topmost node, after removing it from the stack
	 * Null when the stack is empty.
	 */
	pop(): T | null;

	clear(): IContentStack<T>;
}

export class ContentStack<T> implements IContentStack<T> {
	constructor(private readonly key = 'key') {
		this._nodes = [];
	}
	private readonly _nodes: Array<T>;

	public get count(): number {
		return this._nodes.length;
	}

	public get stack(): Array<T> {
		return this._nodes.slice();
	}

	public setIndex(index: number): IContentStack<T> {
		if (index >= 0 && index < this._nodes.length - 1) {
			this._nodes.length = index + 1;
		}
		return this;
	}

	public clear(): IContentStack<T> {
		this._nodes.length = 0;
		return this;
	}

	public push(node: T): IContentStack<T> {
		if (!node) {
			return this;
		}

		const key = this.key,
			current = this.current;

		if (!key || !current || node[key] !== current[key]) {
			this._nodes.push(node);
		}

		return this;
	}

	public pop(): T | null {
		return (this._nodes.length && this._nodes.pop()) || null;
	}

	public get current(): T | null {
		return this._nodes.length ? this._nodes[this._nodes.length - 1] : null;
	}
}
