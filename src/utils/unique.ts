type IMLUnique = {
	id(prefix?: string): string;
};

class Unique implements IMLUnique {
	private readonly seed = `mlid-${String(Date.now() % 1000)}`;
	private nextNumber = Math.round(Date.now() % 1000);

	id(prefix?: string): string;

	public id(prefix: string = this.seed): string {
		return `${prefix}-${this.nextNumber++}`;
	}
}

export const unique: IMLUnique = new Unique();
