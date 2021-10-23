// TODO
// 1. Use driver method to fetch codex
// 2. map codex entries to display full text
// 3. Handle annotations
export interface ICodexEntry {
	title: string;
}

export const Browser = ({
	content
}: {
	content: ICodexEntry[];
}): JSX.Element => {
	return (
		<div>
			<h1>Codex content</h1>
			{content.map((rec, index) => <div key={index}>{rec.title}</div>)}
		</div>
	);
};


export default Browser;
