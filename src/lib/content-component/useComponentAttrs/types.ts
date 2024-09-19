export interface IComponentAttributeData {
	attributes: NodeAttributeMap;
}

export type NodeAttributeMap = {
	readonly [rekey: string]: string;
};
