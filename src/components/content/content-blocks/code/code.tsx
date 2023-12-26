import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { CodeInline } from "./code-inline";
import { CodeBlock } from "./code-block";

type CodeProps = {
	inline?: boolean;
};

export const Code = ({
	componentData,
	inline = false,
}: ContentComponentProps & CodeProps): JSX.Element => {
	if (inline) {
		return <CodeInline componentData={componentData} />;
	}

	return <CodeBlock componentData={componentData} />;
};
