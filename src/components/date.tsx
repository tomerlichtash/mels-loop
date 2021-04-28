import { format, parseISO } from 'date-fns';
import { getLocale, getLocaleFormat } from '../utils';

export const Date = ({
  dateString,
  locale,
}: {
  dateString: string;
  locale: string;
}): JSX.Element => {
  if (!dateString) {
    return null;
  }
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, getLocaleFormat(locale), {
        locale: getLocale(locale),
      })}
    </time>
  );
};

export default Date;
