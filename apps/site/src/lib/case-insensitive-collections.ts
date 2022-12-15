const normalize = (key: string): string => {
	// safety, since data may be read dynamically
	return typeof key === "string" ? key.toLowerCase() : String(key);
};

export class CaseInsensitiveMap<U> extends Map<string, U> {
	set(key: string, value: U): this {
		return super.set(normalize(key), value);
	}

	get(key: string): U | undefined {
		return super.get(normalize(key));
	}

	has(key: string): boolean {
		return super.has(normalize(key));
	}
}

export class CaseInsensitiveSet extends Set<string> {
	add(key: string): this {
		return super.add(normalize(key));
	}

	delete(key: string): boolean {
		return super.delete(normalize(key));
	}

	has(key: string): boolean {
		return super.has(normalize(key));
	}
}
