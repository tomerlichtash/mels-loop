import Link from "next/link";
import { t } from "../../locales/translate";
import { ILocaleRef } from "../../locales/types";
import { style, classes } from "./option.st.css";

export interface IOption {
	id: string;
	label: string;
	locale: ILocaleRef;
	targetPathname?: string;
	isCurrent?: boolean;
	callback?: (id: string) => void;
	closeDropDown?: () => void;
	className?: string;
}

export const Option = ({
	id,
	label,
	locale,
	targetPathname,
	isCurrent,
	callback,
	closeDropDown,
	className,
}: IOption): JSX.Element => {
	return (
		<li className={classes.root}>
			{callback && (
				<span
					title={label}
					aria-label={label}
					onClick={() => {
						closeDropDown();
						return callback(id);
					}}
					className={style(
						classes.optionContent,
						{
							current: isCurrent,
						},
						className
					)}
				>
					{t(label, locale)}
				</span>
			)}
			{targetPathname && (
				<Link href={`${targetPathname}`}>
					<a
						title={label}
						aria-label={label}
						className={style(
							classes.optionContent,
							{
								current: isCurrent,
							},
							className
						)}
					>
						{t(label, locale)}
					</a>
				</Link>
			)}
		</li>
	);
};

export default Option;
