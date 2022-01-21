import Link from "next/link";
import { style, classes } from "./option.st.css";

export interface IOption {
	id: string;
	label: string;
	targetPathname: string;
	isCurrent?: boolean;
	className?: string;
}

export const Option = ({
	id,
	label,
	targetPathname,
	isCurrent,
	className,
}: IOption): JSX.Element => {
	return (
		<Link href={`${targetPathname}`}>
			<a
				title={label}
				aria-label={label}
				className={style(
					classes.root,
					{
						current: isCurrent,
					},
					className
				)}
			>
				{label}
			</a>
		</Link>
	);
};

export default Option;
