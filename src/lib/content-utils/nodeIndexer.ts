export class NodeIndexer {
	// static - insure multiple pages get different keys
	private static keyIndex = 0;
	private readonly indices: Map<string, number> = new Map<string, number>();

	public nextKey(): string {
		return `ast-${NodeIndexer.keyIndex++}`;
	}

	public nextLine(): number {
		return this.nextIndex('line');
	}

	public nextIndex(key: string): number {
		if (!this.indices.has(key)) {
			this.indices.set(key, -1);
		}
		const ind = this.indices.get(key) + 1;
		this.indices.set(key, ind);
		return ind;
	}

	public currentIndex(key: string): number {
		return this.indices.has(key) ? this.indices.get(key) : 0;
	}

	public currentLine(): number {
		return this.currentIndex('line');
	}
}
