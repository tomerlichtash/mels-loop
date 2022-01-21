import Link from "next/link";
import { useRouter } from "next/router";
import { IOption } from "../../interfaces/models";
import { t } from "../../locales/translate";
import { style, classes } from "./option.st.css";

export const Option = ({
	id,
	label,
	targetPathname,
	isCurrent,
	callback,
	closeDropDown,
	className,
}: IOption): JSX.Element => {
	const router = useRouter();
	const { locale } = router;
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
