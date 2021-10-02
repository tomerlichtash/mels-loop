// TODO
// 1. Use driver method to fetch codex
// 2. map codex entries to display full text
// 3. Handle annotations
export const Browser = ({
	content
}: {
	content: any;
}): JSX.Element => {
	return (
		<div>
			<h1>All content</h1>
			{
				content.map(rec => <div>{rec.id}</div>)
			}
		</div>
	);
};


export default Browser;
