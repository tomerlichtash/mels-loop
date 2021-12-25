import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import homeStyles from '../styles/home.module.scss';


export default function Home({
}: {
}) {
	const { locale } = useRouter();

	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<article className={homeStyles.rtl}>
				<section className={homeStyles.intro}>
					<p>פורסם בידי מחברו, אד ניית׳ר &lt;nather@astro.as.utexas.edu&gt;, ברשת Usenet, ב-21 במאי 1983.</p>
				</section>
				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>מאמר מן הזמן האחרון על צד מצ'ואיסטי בתכנות</p>
					<p className={homeStyles.paragraph}>יצא בהכרזה נועזת וחסרת בסיס:</p>
					<blockquote className={homeStyles.blockquote}>מתכנתים אמיתיים כותבים בפוֹרְטְרַן.</blockquote>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>אולי כיום,</p>
					<p className={homeStyles.paragraph}>בתקופה דקדנטית זו של</p>
					<p className={homeStyles.paragraph}>בירה לייט, מחשבוני כיס, ותוכנה "ידידותית-למשתמש"</p>
					<p className={homeStyles.paragraph}>אך בימים ההם,</p>
					<p className={homeStyles.paragraph}>כשהמונח "תוכנה" עוד היה נשמע מצחיק,</p>
					<p className={homeStyles.paragraph}>ומחשבים אמיתיים נבנו בתופים ובשפופרות,</p>
					<p className={homeStyles.paragraph}>מתכנתים אמיתיים כתבו בשפת מכונה.</p>
					<p className={homeStyles.paragraph}>לא פוֹרְטְרַן. לא ראטפוֹר. אפילו לא שפת סף.</p>
					<p className={homeStyles.paragraph}>שפת מכונה.</p>
					<p className={homeStyles.paragraph}>מספרים גולמיים ויפים בבסיס הקסדצימלי.</p>
					<p className={homeStyles.paragraph}>ישירות.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>לבל יגדל דור מתכנתים חדש</p>
					<p className={homeStyles.paragraph}>בּוּר במורשת מפוארת זו</p>
					<p className={homeStyles.paragraph}>אני חש כי מחובתי לתאר</p>
					<p className={homeStyles.paragraph}>כמיטב יכולתי מבעד לפער הדורות</p>
					<p className={homeStyles.paragraph}>איך מתכנת אמיתי כתב קוד.</p>
					<p className={homeStyles.paragraph}>אקרא לו מֵל,</p>
					<p className={homeStyles.paragraph}>כי זה היה שמו.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>את מל פגשתי כשעבדתי בחברת המחשבים רוֹיאל-מֶק'בִּי,</p>
					<p className={homeStyles.paragraph}>כיום ישות רפאים עסקית המייצרת מכונת כתיבה.</p>
					<p className={homeStyles.paragraph}>החברה ייצרה אז את ה-30-PLG,</p>
					<p className={homeStyles.paragraph}>מחשב קטן וזול (בסטנדרטים של היום)</p>
					<p className={homeStyles.paragraph}>בעל זיכרון תוף,</p>
					<p className={homeStyles.paragraph}>ובדיוק החלה בייצור</p>
					<p className={homeStyles.paragraph}>ה-4000-RPC, מחשב מתקדם יותר,</p>
					<p className={homeStyles.paragraph}>גדול יותר, טוב יותר, מהיר יותר – בעל זיכרון תוף.</p>
					<p className={homeStyles.paragraph}>ליבּוֹת זיכרון היו יקרות מדי,</p>
					<p className={homeStyles.paragraph}>ובכל אופן, עמדו להעלם.</p>
					<p className={homeStyles.paragraph}>(זו הסיבה שלא שמעת על החברה,</p>
					<p className={homeStyles.paragraph}>או על המחשב.)</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>נשׂכרתי לכתוב מְהַדֵּר פוֹרְטְרַן</p>
					<p className={homeStyles.paragraph}>עבור הפֶּלא החדש הזה ומל היה המדריך שלי לכל נפלאותיו.</p>
					<p className={homeStyles.paragraph}>מל תיעב מהדרים.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>"אם תוכנה לא יודעת לשכתב את הקוד של עצמה,"</p>
					<p className={homeStyles.paragraph}>שאל, "למה היא טובה?"</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>מל כתב,</p>
					<p className={homeStyles.paragraph}>במספרים הקסדצימליים,</p>
					<p className={homeStyles.paragraph}>את תוכנת הדגל של החברה.</p>
					<p className={homeStyles.paragraph}>היא רצה על ה-30-LGP</p>
					<p className={homeStyles.paragraph}>ושיחקה בלאק ג'ק בתערוכות מחשבים</p>
					<p className={homeStyles.paragraph}>עם לקוחות פוטנציאליים.</p>
					<p className={homeStyles.paragraph}>התגובות שעוררה תמיד היו דרמטיות.</p>
					<p className={homeStyles.paragraph}>בכל תערוכה היה ביתן ה-30-LGP עמוס,</p>
					<p className={homeStyles.paragraph}>סביב התגודדו אנשי המכירות של IBM</p>
					<p className={homeStyles.paragraph}>ודיברו ביניהם.</p>
					<p className={homeStyles.paragraph}>אם כל זה מכר מחשבים או לא</p>
					<p className={homeStyles.paragraph}>זו היתה שאלה שמעולם לא שאלנו.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>העבודה של מל היתה לשכתב</p>
					<p className={homeStyles.paragraph}>את תוכנת הבלאק ג'ק עבור ה-4000-RPC.</p>
					<p className={homeStyles.paragraph}>(מי בכלל ידע אז מה זה פּוֹרְט?)</p>
					<p className={homeStyles.paragraph}>מִיעוּן הכְּתוֹבוֹת במחשב החדש</p>
					<p className={homeStyles.paragraph}>היה מסוג אחד-ועוד-אחד</p>
					<p className={homeStyles.paragraph}>כך שבכל הוראה למכונה,</p>
					<p className={homeStyles.paragraph}>בנוסף לקוד-הפעולה</p>
					<p className={homeStyles.paragraph}>ולכתובת האוֹפֵּרַנְדּ,</p>
					<p className={homeStyles.paragraph}>היתה כתובת נוספת שציינה היכן, על התוף המסתובב,</p>
					<p className={homeStyles.paragraph}>ממוקמת ההוראה הבאה.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>בהשאלה לימינו,</p>
					<p className={homeStyles.paragraph}>כל פעולה הסתיימה בפקודה TO GO!</p>
					<p className={homeStyles.paragraph}>פַּטְמוּ בַּזֶּה את מיקטרתו של פסקל ועשנו.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>מל אהב את ה-4000-RPC</p>
					<p className={homeStyles.paragraph}>משום שידע לכתוב עבורו קוד אופטימלי:</p>
					<p className={homeStyles.paragraph}>כלומר, למקם הוראות על התוף</p>
					<p className={homeStyles.paragraph}>כך, כאשר הוראה נשלמה,</p>
					<p className={homeStyles.paragraph}>הבאה כבר הגיעה אל "הראש הקורא"</p>
					<p className={homeStyles.paragraph}>נגישה ליישום מיידי.</p>
					<p className={homeStyles.paragraph}>הייתה תוכנה שנועדה לעשות את הדבר הזה בדיוק,</p>
					<p className={homeStyles.paragraph}>"אָסֶמְבְּלֶר מייעל",</p>
					<p className={homeStyles.paragraph}>אך מל סירב להשתמש בה.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>"לך תדע איפה זה יניח את הדברים",</p>
					<p className={homeStyles.paragraph}>הסביר, "כך שתיאלץ להשתמש בקבועים נפרדים."</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>רק לאחר זמן רב הבנתי את ההערה הזו באמת.</p>
					<p className={homeStyles.paragraph}>מאחר ומל הכיר את הערך המספרי</p>
					<p className={homeStyles.paragraph}>של כל הוראה</p>
					<p className={homeStyles.paragraph}>והִקצה בעצמו את הכתובות על התוף</p>
					<p className={homeStyles.paragraph}>כל הוראה שכתב יכולה הייתה להחשב</p>
					<p className={homeStyles.paragraph}>לקבוע מספרי.</p>
					<p className={homeStyles.paragraph}>כך יכול היה לקחת הוראת "חיבור", למשל,</p>
					<p className={homeStyles.paragraph}>ואם ערכה המספרי התאים,</p>
					<p className={homeStyles.paragraph}>להשתמש בה כּכוֹפֵל.</p>
					<p className={homeStyles.paragraph}>עריכת הקוד שלו הייתה מסובכת לכולם, זולתו.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>השוויתי את האופטימיזציה הידנית של מל</p>
					<p className={homeStyles.paragraph}>עם קוד זהה שעבר עיסוי באָסֶמְבְּלֶר המייעל,</p>
					<p className={homeStyles.paragraph}>הקוד של מל תמיד רץ מהר יותר.</p>
					<p className={homeStyles.paragraph}>זה היה משום שעיצוב המעלה-מטה</p>
					<p className={homeStyles.paragraph}>עוד לא הומצא אז</p>
					<p className={homeStyles.paragraph}>ומל ממילא לא היה משתמש בזה.</p>
					<p className={homeStyles.paragraph}>הדבר הראשון שכתב היו הלולאות הפנימיות של התוכנה שלו</p>
					<p className={homeStyles.paragraph}>כדי להעניק להן יתרון</p>
					<p className={homeStyles.paragraph}>בבחירת כתובות הזיכרון הראשונות בתוף.</p>
					<p className={homeStyles.paragraph}>האָסֶמְבְּלֶר המייעל לא היה מספיק מתוחכם כדי לעשות את זה.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>מל מעולם גם לא כתב לולאות השהיה,</p>
					<p className={homeStyles.paragraph}>אפילו כשהפְלֵקסוֹרַייטֵר העיקש</p>
					<p className={homeStyles.paragraph}>הזדקק להשהיה קלה בפלט האותיות כדי לעבוד כראוי.</p>
					<p className={homeStyles.paragraph}>הוא פשוט מיקם הוראות על התוף</p>
					<p className={homeStyles.paragraph}>כך שהבאה בתור היתה בדיוק מאחורי הראש הקורא</p>
					<p className={homeStyles.paragraph}>כשהגיע תורה;</p>
					<p className={homeStyles.paragraph}>נדרש התוף לסיבוב שלם</p>
					<p className={homeStyles.paragraph}>כדי להגיע אליה.</p>
					<p className={homeStyles.paragraph}>הוא טבע שם בלתי נשכח לתהליך הזה.</p>
					<p className={homeStyles.paragraph}>על אף ש"אופטימום" הוא מושג אבסולוטי,</p>
					<p className={homeStyles.paragraph}>כמו "ייחודי", הוא הפך למושג יחסי</p>
					<p className={homeStyles.paragraph}>שגור בדיבור:</p>
					<p className={homeStyles.paragraph}>"לא לגמרי אופטימום" או "פחות אופטימום"</p>
					<p className={homeStyles.paragraph}>או "לא ממש אופטימום".</p>
					<p className={homeStyles.paragraph}>מל כינה את אזורי ההשהיה המקסימלית</p>
					<p className={homeStyles.paragraph}>"פסימום קיצוני".</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>לאחר שסיים את תוכנת הבלאק ג'ק</p>
					<p className={homeStyles.paragraph}>בגרסה יציבה</p>
					<p className={homeStyles.paragraph}>("אפילו המאתחל אופטימלי",</p>
					<p className={homeStyles.paragraph}>אמר בגאווה)</p>
					<p className={homeStyles.paragraph}>קיבל דרישת תיקון ממחלקת המכירות.</p>
					<p className={homeStyles.paragraph}>התוכנה השתמשה במנגנון אלגנטי (אופטימלי)</p>
					<p className={homeStyles.paragraph}>להגרלת מספרים,</p>
					<p className={homeStyles.paragraph}>כדי לטרוף את "הקלפים" ולחלק את ה"חפיסה",</p>
					<p className={homeStyles.paragraph}>וכמה אנשי מכירות סברו כי המשחק הוגן מדי,</p>
					<p className={homeStyles.paragraph}>משום שמדי פעם הלקוחות הפסידו.</p>
					<p className={homeStyles.paragraph}>הם רצו שמל ישנה את התוכנה</p>
					<p className={homeStyles.paragraph}>כך שבאמצעות מתג במכונה</p>
					<p className={homeStyles.paragraph}>יוכלו להטות את המספרים לטובת הלקוח.</p>
					{/* <p className={homeStyles.paragraph}>they could change the odds and let the customer win.</p> */}
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>מל נרתע.</p>
					<p className={homeStyles.paragraph}>לתחושתו היה זה לא ישר בעליל</p>
					<p className={homeStyles.paragraph}>מה שנכון,</p>
					<p className={homeStyles.paragraph}>לכן סירב.</p>
					<p className={homeStyles.paragraph}>מנהל מחלקת המכירות דיבר עם מל,</p>
					<p className={homeStyles.paragraph}>כך גם הבוס הגדול, ואל הלחץ של הבוס</p>
					<p className={homeStyles.paragraph}>הצטרפו גם כמה מתכנתים.</p>
					<p className={homeStyles.paragraph}>לבסוף מל נכנע וכתב את הקוד,</p>
					<p className={homeStyles.paragraph}>אבל הוא הפך את התנאי,</p>
					<p className={homeStyles.paragraph}>וכשלחצו על המתג,</p>
					<p className={homeStyles.paragraph}>התוכנה רימתה, וניצחה בכל פעם.</p>
					<p className={homeStyles.paragraph}>מל היה מאושר</p>
					<p className={homeStyles.paragraph}>וטען שהוא אתי ברמת התת-מודע</p>
					<p className={homeStyles.paragraph}>ובשום אופן לא הסכים לתקן זאת.</p>
					{/* <p className={homeStyles.paragraph}>Mel balked.</p>
					<p className={homeStyles.paragraph}>He felt this was patently dishonest,</p>
					<p className={homeStyles.paragraph}>which it was,</p>
					<p className={homeStyles.paragraph}>and that it impinged on his personal integrity as a programmer,</p>
					<p className={homeStyles.paragraph}>which it did,</p>
					<p className={homeStyles.paragraph}>so he refused to do it.</p>
					<p className={homeStyles.paragraph}>The Head Salesman talked to Mel,</p>
					<p className={homeStyles.paragraph}>as did the Big Boss and, at the boss's urging,</p>
					<p className={homeStyles.paragraph}>a few Fellow Programmers.</p>
					<p className={homeStyles.paragraph}>Mel finally gave in and wrote the code,</p>
					<p className={homeStyles.paragraph}>but he got the test backwards,</p>
					<p className={homeStyles.paragraph}>and, when the sense switch was turned on,</p>
					<p className={homeStyles.paragraph}>the program would cheat, winning every time.</p>
					<p className={homeStyles.paragraph}>Mel was delighted with this,</p>
					<p className={homeStyles.paragraph}>claiming his subconscious was uncontrollably ethical,</p>
					<p className={homeStyles.paragraph}>and adamantly refused to fix it.</p> */}
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>לאחר שמל עזב את החברה למקום ע₪יר יותר</p>
					<p className={homeStyles.paragraph}>הבוס הגדול ביקש שאציץ בקוד</p>
					<p className={homeStyles.paragraph}>ואראה אם אוכל לתקן אותו.</p>
					<p className={homeStyles.paragraph}>בחוסר רצון נעתרתי לבקשתו.</p>
					<p className={homeStyles.paragraph}>לעקוב אחרי הקוד של מל היתה הרפתקה אמיתית.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>תמיד הרגשתי שתכנות הוא אמנות</p>
					<p className={homeStyles.paragraph}>שערכה האמיתי יכול להיבחן רק בידי</p>
					<p className={homeStyles.paragraph}>אמן הבָּקִי בצפונותיהַ;</p>
					<p className={homeStyles.paragraph}>אורים ותומים נפלאים</p>
					<p className={homeStyles.paragraph}>חבויים מן העין האנושית, לעיתים לעד,</p>
					<p className={homeStyles.paragraph}>בשל עצם טבעו של התהליך.</p>
					<p className={homeStyles.paragraph}>אפשר ללמוד הרבה על אישיותו של אדם</p>
					<p className={homeStyles.paragraph}>רק מדפדוף בקוד שכתב</p>
					<p className={homeStyles.paragraph}>אפילו במספרים הקסדצימליים.</p>
					<p className={homeStyles.paragraph}>מל היה, אני מאמין, גאון שהקדים את זמנו.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>ההלם הכי גדול שלי, כנראה, היה בגילוי</p>
					<p className={homeStyles.paragraph}>לולאה תמימה ללא תנאי עצירה.</p>
					<p className={homeStyles.paragraph}>שום תנאי. כלום.</p>
					<p className={homeStyles.paragraph}>על פי ההיגיון הבריא זוהי לולאה אינסופית</p>
					<p className={homeStyles.paragraph}>בה התוכנה תרוץ במעגל, לעד, ללא הרף.</p>
					<p className={homeStyles.paragraph}>התוכנה הזו, לעומת זאת, חלפה בתוכה</p>
					<p className={homeStyles.paragraph}>ויצאה מצדה השני בבטחה.</p>
					<p className={homeStyles.paragraph}>נדרשו לי שבועיים כדי להבין איך.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>מחשב ה-4000-RPC היה מצויד במתקן מאוד מודרני</p>
					<p className={homeStyles.paragraph}>בשם אוֹגֵר-מוֹנֶה</p>
					<p className={homeStyles.paragraph}>שאיפשר לתכנת לולאות</p>
					<p className={homeStyles.paragraph}>שעושות שימוש בהוראות עם היסט</p>
					<p className={homeStyles.paragraph}>בכל ריצה של הלולאה</p>
					<p className={homeStyles.paragraph}>המספר באוגר-מונה</p>
					<p className={homeStyles.paragraph}>התווסף לכתובת האופרנד בהוראה</p>
					<p className={homeStyles.paragraph}>כדי להצביע על</p>
					<p className={homeStyles.paragraph}>פיסת המידע הבאה בסדרה.</p>
					<p className={homeStyles.paragraph}>המתכנת היה צריך רק להוסיף 1 לערך השמור באוגר</p>
					<p className={homeStyles.paragraph}>בכל מעבר דרך הלולאה.</p>
					<p className={homeStyles.paragraph}>מל מעולם לא השתמש בו.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>תחת זאת, הוא העתיק את ההוראה אל אוגר אחר במכונה</p>
					<p className={homeStyles.paragraph}>הוסיף 1 לרכיב הכתובת</p>
					<p className={homeStyles.paragraph}>ושמר את התוצאה במקומה המקורי בזכרון.</p>
					<p className={homeStyles.paragraph}>אז הריץ את ההוראה העדכנית</p>
					<p className={homeStyles.paragraph}>ישר מן האוגר.</p>
					<p className={homeStyles.paragraph}>הלולאה נכתבה כך שזמן הריצה הנוסף</p>
					<p className={homeStyles.paragraph}>נלקח בחשבון –</p>
					<p className={homeStyles.paragraph}>מייד כשביצוע ההוראה הסתיים,</p>
					<p className={homeStyles.paragraph}>הבאה בתור הייתה כבר מונחת מתחת לראש הקריאה של התוף</p>
					<p className={homeStyles.paragraph}>מוכנה לריצה.</p>
					<p className={homeStyles.paragraph}>אבל בלולאה לא היה תנאי עצירה.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>הרמז החיוני הגיע כאשר שמתי לב</p>
					<p className={homeStyles.paragraph}>שהביט של האוגר-מונה,</p>
					<p className={homeStyles.paragraph}>הביט שבין הכתובת לבין קוד-הפעולה בהוראה,</p>
					<p className={homeStyles.paragraph}>היה דלוק –</p>
					<p className={homeStyles.paragraph}>אך מל לא השתמש באוגר-מונה,</p>
					<p className={homeStyles.paragraph}>והשאיר אותו מאופס תמיד.</p>
					<p className={homeStyles.paragraph}>כשראיתי את האור כמעט הסתנוורתי.</p>
					{/* <p className={homeStyles.paragraph}>When the light went on it nearly blinded me.</p> */}
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>הוא מיקם את המידע שעליו עבד</p>
					<p className={homeStyles.paragraph}>סמוך לראש הזיכרון –</p>
					<p className={homeStyles.paragraph}>בכתובות הגדולות ביותר אליהן יכלה הוראה לפנות -</p>
					<p className={homeStyles.paragraph}>כך שלאחר שפריט המידע האחרונה טופל,</p>
					<p className={homeStyles.paragraph}>פעולת חיבור על כתובת ההוראה</p>
					<p className={homeStyles.paragraph}>הייתה גורמת לגלישתה.</p>
					<p className={homeStyles.paragraph}>העברת השארית הוסיפה אחד</p>
					<p className={homeStyles.paragraph}>לקוד-הפעולה ושינתה אותו לקוד-הפעולה הבא ברשימת ההוראות:</p>
					<p className={homeStyles.paragraph}>הוראת דילוג.</p>
					<p className={homeStyles.paragraph}>מן הסתם, ההוראה הבאה כבר הייתה</p>
					<p className={homeStyles.paragraph}>בכתובת אפס,</p>
					<p className={homeStyles.paragraph}>והתוכנה המשיכה קדימה באושר בדרכה.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>לא שמרתי על קשר עם מל</p>
					<p className={homeStyles.paragraph}>אז איני יודע אם אי פעם נכנע ללחץ</p>
					<p className={homeStyles.paragraph}>השינויים ששטף את שיטות התכנות</p>
					<p className={homeStyles.paragraph}>מאז אותם ימים נשכחים.</p>
					<p className={homeStyles.paragraph}>אני מעדיף לחשוב שלא.</p>
					<p className={homeStyles.paragraph}>כך או כך,</p>
					<p className={homeStyles.paragraph}>התרשמתי מספיק כדי להפסיק לחפש</p>
					<p className={homeStyles.paragraph}>את הקוד הסורר,</p>
					<p className={homeStyles.paragraph}>ואמרתי לבוס שלא מצאתי כלום.</p>
					<p className={homeStyles.paragraph}>הוא לא היה מופתע.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>כשעזבתי את החברה,</p>
					<p className={homeStyles.paragraph}>תוכנת הבלאק ג'ק עדיין רימתה</p>
					<p className={homeStyles.paragraph}>אם הפעלת את המתג הנכון,</p>
					<p className={homeStyles.paragraph}>וטוב שכך.</p>
					<p className={homeStyles.paragraph}>לא הרגשתי בנוח</p>
					<p className={homeStyles.paragraph}>להתעס-האק בקוד של מתכנת אמיתי.</p>
				</section>				
			</article>

			<article className={homeStyles.ltr}>
				<section className={homeStyles.intro}>
					<p>This was posted to Usenet by its author, Ed Nather (&lt;nather@astro.as.utexas.edu&gt;, on May 21, 1983.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>A recent article devoted to the macho side of programming</p>
					<p className={homeStyles.paragraph}>made the bald and unvarnished statement:</p>
					<blockquote className={homeStyles.blockquote}>Real Programmers write in FORTRAN.</blockquote>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>Maybe they do now,</p>
					<p className={homeStyles.paragraph}>in this decadent era of</p>
					<p className={homeStyles.paragraph}>Lite beer, hand calculators, and "user-friendly" software</p>
					<p className={homeStyles.paragraph}>but back in the Good Old Days,</p>
					<p className={homeStyles.paragraph}>when the term "software" sounded funny</p>
					<p className={homeStyles.paragraph}>and Real Computers were made out of drums and vacuum tubes,</p>
					<p className={homeStyles.paragraph}>Real Programmers wrote in machine code.</p>
					<p className={homeStyles.paragraph}>Not FORTRAN.  Not RATFOR.  Not, even, assembly language.</p>
					<p className={homeStyles.paragraph}>Machine Code.</p>
					<p className={homeStyles.paragraph}>Raw, unadorned, inscrutable hexadecimal numbers.</p>
					<p className={homeStyles.paragraph}>Directly.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>Lest a whole new generation of programmers</p>
					<p className={homeStyles.paragraph}>grow up in ignorance of this glorious past,</p>
					<p className={homeStyles.paragraph}>I feel duty-bound to describe,</p>
					<p className={homeStyles.paragraph}>as best I can through the generation gap,</p>
					<p className={homeStyles.paragraph}>how a Real Programmer wrote code.</p>
					<p className={homeStyles.paragraph}>I'll call him Mel,</p>
					<p className={homeStyles.paragraph}>because that was his name.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>I first met Mel when I went to work for Royal McBee Computer Corp.,</p>
					<p className={homeStyles.paragraph}>a now-defunct subsidiary of the typewriter company.</p>
					<p className={homeStyles.paragraph}>The firm manufactured the LGP-30,</p>
					<p className={homeStyles.paragraph}>a small, cheap (by the standards of the day)</p>
					<p className={homeStyles.paragraph}>drum-memory computer,</p>
					<p className={homeStyles.paragraph}>and had just started to manufacture</p>
					<p className={homeStyles.paragraph}>the RPC-4000, a much-improved,</p>
					<p className={homeStyles.paragraph}>bigger, better, faster — drum-memory computer.</p>
					<p className={homeStyles.paragraph}>Cores cost too much,</p>
					<p className={homeStyles.paragraph}>and weren't here to stay, anyway.</p>
					<p className={homeStyles.paragraph}>(That's why you haven't heard of the company,</p>
					<p className={homeStyles.paragraph}>or the computer.)</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>I had been hired to write a FORTRAN compiler</p>
					<p className={homeStyles.paragraph}>for this new marvel and Mel was my guide to its wonders.</p>
					<p className={homeStyles.paragraph}>Mel didn't approve of compilers.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>"If a program can't rewrite its own code",</p>
					<p className={homeStyles.paragraph}>he asked, "what good is it?"</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>Mel had written,</p>
					<p className={homeStyles.paragraph}>in hexadecimal,</p>
					<p className={homeStyles.paragraph}>the most popular computer program the company owned.</p>
					<p className={homeStyles.paragraph}>It ran on the LGP-30</p>
					<p className={homeStyles.paragraph}>and played blackjack with potential customers</p>
					<p className={homeStyles.paragraph}>at computer shows.</p>
					<p className={homeStyles.paragraph}>Its effect was always dramatic.</p>
					<p className={homeStyles.paragraph}>The LGP-30 booth was packed at every show,</p>
					<p className={homeStyles.paragraph}>and the IBM salesmen stood around</p>
					<p className={homeStyles.paragraph}>talking to each other.</p>
					<p className={homeStyles.paragraph}>Whether or not this actually sold computers</p>
					<p className={homeStyles.paragraph}>was a question we never discussed.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>Mel's job was to re-write</p>
					<p className={homeStyles.paragraph}>the blackjack program for the RPC-4000.</p>
					<p className={homeStyles.paragraph}>(Port?  What does that mean?)</p>
					<p className={homeStyles.paragraph}>The new computer had a one-plus-one</p>
					<p className={homeStyles.paragraph}>addressing scheme,</p>
					<p className={homeStyles.paragraph}>in which each machine instruction,</p>
					<p className={homeStyles.paragraph}>in addition to the operation code</p>
					<p className={homeStyles.paragraph}>and the address of the needed operand,</p>
					<p className={homeStyles.paragraph}>had a second address that indicated where, on the revolving drum,</p>
					<p className={homeStyles.paragraph}>the next instruction was located.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>In modern parlance,</p>
					<p className={homeStyles.paragraph}>every single instruction was followed by a GO TO!</p>
					<p className={homeStyles.paragraph}>Put that in Pascal's pipe and smoke it.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>Mel loved the RPC-4000</p>
					<p className={homeStyles.paragraph}>because he could optimize his code:</p>
					<p className={homeStyles.paragraph}>that is, locate instructions on the drum</p>
					<p className={homeStyles.paragraph}>so that just as one finished its job,</p>
					<p className={homeStyles.paragraph}>the next would be just arriving at the "read head"</p>
					<p className={homeStyles.paragraph}>and available for immediate execution.</p>
					<p className={homeStyles.paragraph}>There was a program to do that job,</p>
					<p className={homeStyles.paragraph}>an "optimizing assembler",</p>
					<p className={homeStyles.paragraph}>but Mel refused to use it.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>"You never know where it's going to put things",</p>
					<p className={homeStyles.paragraph}>he explained, "so you'd have to use separate constants".</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>It was a long time before I understood that remark.</p>
					<p className={homeStyles.paragraph}>Since Mel knew the numerical value</p>
					<p className={homeStyles.paragraph}>of every operation code,</p>
					<p className={homeStyles.paragraph}>and assigned his own drum addresses,</p>
					<p className={homeStyles.paragraph}>every instruction he wrote could also be considered</p>
					<p className={homeStyles.paragraph}>a numerical constant.</p>
					<p className={homeStyles.paragraph}>He could pick up an earlier "add" instruction, say,</p>
					<p className={homeStyles.paragraph}>and multiply by it,</p>
					<p className={homeStyles.paragraph}>if it had the right numeric value.</p>
					<p className={homeStyles.paragraph}>His code was not easy for someone else to modify.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>I compared Mel's hand-optimized programs</p>
					<p className={homeStyles.paragraph}>with the same code massaged by the optimizing assembler program,</p>
					<p className={homeStyles.paragraph}>and Mel's always ran faster.</p>
					<p className={homeStyles.paragraph}>That was because the "top-down" method of program design</p>
					<p className={homeStyles.paragraph}>hadn't been invented yet,</p>
					<p className={homeStyles.paragraph}>and Mel wouldn't have used it anyway.</p>
					<p className={homeStyles.paragraph}>He wrote the innermost parts of his program loops first,</p>
					<p className={homeStyles.paragraph}>so they would get first choice</p>
					<p className={homeStyles.paragraph}>of the optimum address locations on the drum.</p>
					<p className={homeStyles.paragraph}>The optimizing assembler wasn't smart enough to do it that way.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>Mel never wrote time-delay loops, either,</p>
					<p className={homeStyles.paragraph}>even when the balky Flexowriter</p>
					<p className={homeStyles.paragraph}>required a delay between output characters to work right.</p>
					<p className={homeStyles.paragraph}>He just located instructions on the drum</p>
					<p className={homeStyles.paragraph}>so each successive one was just past the read head</p>
					<p className={homeStyles.paragraph}>when it was needed;</p>
					<p className={homeStyles.paragraph}>the drum had to execute another complete revolution</p>
					<p className={homeStyles.paragraph}>to find the next instruction.</p>
					<p className={homeStyles.paragraph}>He coined an unforgettable term for this procedure.</p>
					<p className={homeStyles.paragraph}>Although "optimum" is an absolute term,</p>
					<p className={homeStyles.paragraph}>like "unique", it became common verbal practice</p>
					<p className={homeStyles.paragraph}>to make it relative:</p>
					<p className={homeStyles.paragraph}>"not quite optimum" or "less optimum"</p>
					<p className={homeStyles.paragraph}>or "not very optimum".</p>
					<p className={homeStyles.paragraph}>Mel called the maximum time-delay locations</p>
					<p className={homeStyles.paragraph}>the "most pessimum".</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>After he finished the blackjack program</p>
					<p className={homeStyles.paragraph}>and got it to run</p>
					<p className={homeStyles.paragraph}>("Even the initializer is optimized",</p>
					<p className={homeStyles.paragraph}>he said proudly),</p>
					<p className={homeStyles.paragraph}>he got a Change Request from the sales department.</p>
					<p className={homeStyles.paragraph}>The program used an elegant (optimized)</p>
					<p className={homeStyles.paragraph}>random number generator</p>
					<p className={homeStyles.paragraph}>to shuffle the "cards" and deal from the "deck",</p>
					<p className={homeStyles.paragraph}>and some of the salesmen felt it was too fair,</p>
					<p className={homeStyles.paragraph}>since sometimes the customers lost.</p>
					<p className={homeStyles.paragraph}>They wanted Mel to modify the program</p>
					<p className={homeStyles.paragraph}>so, at the setting of a sense switch on the console,</p>
					<p className={homeStyles.paragraph}>they could change the odds and let the customer win.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>Mel balked.</p>
					<p className={homeStyles.paragraph}>He felt this was patently dishonest,</p>
					<p className={homeStyles.paragraph}>which it was,</p>
					<p className={homeStyles.paragraph}>and that it impinged on his personal integrity as a programmer,</p>
					<p className={homeStyles.paragraph}>which it did,</p>
					<p className={homeStyles.paragraph}>so he refused to do it.</p>
					<p className={homeStyles.paragraph}>The Head Salesman talked to Mel,</p>
					<p className={homeStyles.paragraph}>as did the Big Boss and, at the boss's urging,</p>
					<p className={homeStyles.paragraph}>a few Fellow Programmers.</p>
					<p className={homeStyles.paragraph}>Mel finally gave in and wrote the code,</p>
					<p className={homeStyles.paragraph}>but he got the test backwards,</p>
					<p className={homeStyles.paragraph}>and, when the sense switch was turned on,</p>
					<p className={homeStyles.paragraph}>the program would cheat, winning every time.</p>
					<p className={homeStyles.paragraph}>Mel was delighted with this,</p>
					<p className={homeStyles.paragraph}>claiming his subconscious was uncontrollably ethical,</p>
					<p className={homeStyles.paragraph}>and adamantly refused to fix it.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>After Mel had left the company for greener pa$ture$,</p>
					<p className={homeStyles.paragraph}>the Big Boss asked me to look at the code</p>
					<p className={homeStyles.paragraph}>and see if I could find the test and reverse it.</p>
					<p className={homeStyles.paragraph}>Somewhat reluctantly, I agreed to look.</p>
					<p className={homeStyles.paragraph}>Tracking Mel's code was a real adventure.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>I have often felt that programming is an art form,</p>
					<p className={homeStyles.paragraph}>whose real value can only be appreciated</p>
					<p className={homeStyles.paragraph}>by another versed in the same arcane art;</p>
					<p className={homeStyles.paragraph}>there are lovely gems and brilliant coups</p>
					<p className={homeStyles.paragraph}>hidden from human view and admiration, sometimes forever,</p>
					<p className={homeStyles.paragraph}>by the very nature of the process.</p>
					<p className={homeStyles.paragraph}>You can learn a lot about an individual</p>
					<p className={homeStyles.paragraph}>just by reading through his code,</p>
					<p className={homeStyles.paragraph}>even in hexadecimal.</p>
					<p className={homeStyles.paragraph}>Mel was, I think, an unsung genius.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>Perhaps my greatest shock came</p>
					<p className={homeStyles.paragraph}>when I found an innocent loop that had no test in it.</p>
					<p className={homeStyles.paragraph}>No test.  None.</p>
					<p className={homeStyles.paragraph}>Common sense said it had to be a closed loop,</p>
					<p className={homeStyles.paragraph}>where the program would circle, forever, endlessly.</p>
					<p className={homeStyles.paragraph}>Program control passed right through it, however,</p>
					<p className={homeStyles.paragraph}>and safely out the other side.</p>
					<p className={homeStyles.paragraph}>It took me two weeks to figure it out.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>The RPC-4000 computer had a really modern facility</p>
					<p className={homeStyles.paragraph}>called an index register.</p>
					<p className={homeStyles.paragraph}>It allowed the programmer to write a program loop</p>
					<p className={homeStyles.paragraph}>that used an indexed instruction inside;</p>
					<p className={homeStyles.paragraph}>each time through,</p>
					<p className={homeStyles.paragraph}>the number in the index register</p>
					<p className={homeStyles.paragraph}>was added to the address of that instruction,</p>
					<p className={homeStyles.paragraph}>so it would refer</p>
					<p className={homeStyles.paragraph}>to the next datum in a series.</p>
					<p className={homeStyles.paragraph}>He had only to increment the index register</p>
					<p className={homeStyles.paragraph}>each time through.</p>
					<p className={homeStyles.paragraph}>Mel never used it.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>Instead, he would pull the instruction into a machine register,</p>
					<p className={homeStyles.paragraph}>add one to its address,</p>
					<p className={homeStyles.paragraph}>and store it back.</p>
					<p className={homeStyles.paragraph}>He would then execute the modified instruction</p>
					<p className={homeStyles.paragraph}>right from the register.</p>
					<p className={homeStyles.paragraph}>The loop was written so this additional execution time</p>
					<p className={homeStyles.paragraph}>was taken into account —</p>
					<p className={homeStyles.paragraph}>just as this instruction finished,</p>
					<p className={homeStyles.paragraph}>the next one was right under the drum's read head,</p>
					<p className={homeStyles.paragraph}>ready to go.</p>
					<p className={homeStyles.paragraph}>But the loop had no test in it.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>The vital clue came when I noticed</p>
					<p className={homeStyles.paragraph}>the index register bit,</p>
					<p className={homeStyles.paragraph}>the bit that lay between the address</p>
					<p className={homeStyles.paragraph}>and the operation code in the instruction word,</p>
					<p className={homeStyles.paragraph}>was turned on —</p>
					<p className={homeStyles.paragraph}>yet Mel never used the index register,</p>
					<p className={homeStyles.paragraph}>leaving it zero all the time.</p>
					<p className={homeStyles.paragraph}>When the light went on it nearly blinded me.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>He had located the data he was working on</p>
					<p className={homeStyles.paragraph}>near the top of memory —</p>
					<p className={homeStyles.paragraph}>the largest locations the instructions could address —</p>
					<p className={homeStyles.paragraph}>so, after the last datum was handled,</p>
					<p className={homeStyles.paragraph}>incrementing the instruction address</p>
					<p className={homeStyles.paragraph}>would make it overflow.</p>
					<p className={homeStyles.paragraph}>The carry would add one to the</p>
					<p className={homeStyles.paragraph}>operation code, changing it to the next one in the instruction set:</p>
					<p className={homeStyles.paragraph}>a jump instruction.</p>
					<p className={homeStyles.paragraph}>Sure enough, the next program instruction was</p>
					<p className={homeStyles.paragraph}>in address location zero,</p>
					<p className={homeStyles.paragraph}>and the program went happily on its way.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>I haven't kept in touch with Mel,</p>
					<p className={homeStyles.paragraph}>so I don't know if he ever gave in to the flood of</p>
					<p className={homeStyles.paragraph}>change that has washed over programming techniques</p>
					<p className={homeStyles.paragraph}>since those long-gone days.</p>
					<p className={homeStyles.paragraph}>I like to think he didn't.</p>
					<p className={homeStyles.paragraph}>In any event,</p>
					<p className={homeStyles.paragraph}>I was impressed enough that I quit looking for the</p>
					<p className={homeStyles.paragraph}>offending test,</p>
					<p className={homeStyles.paragraph}>telling the Big Boss I couldn't find it.</p>
					<p className={homeStyles.paragraph}>He didn't seem surprised.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>When I left the company,</p>
					<p className={homeStyles.paragraph}>the blackjack program would still cheat</p>
					<p className={homeStyles.paragraph}>if you turned on the right sense switch,</p>
					<p className={homeStyles.paragraph}>and I think that's how it should be.</p>
					<p className={homeStyles.paragraph}>I didn't feel comfortable</p>
					<p className={homeStyles.paragraph}>hacking up the code of a Real Programmer.</p>
				</section>
			</article>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	// const allPostsData = getSortedPostsData(locale);
	// const allCodexData = getSortedCodexData(locale);
	return {
		props: {
			// allPostsData,
			// allCodexData
		},
	};
};
