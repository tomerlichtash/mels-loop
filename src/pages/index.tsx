import Head from 'next/head';
import type { NextPage } from 'next'
import { useRouter } from "next/router";
import Layout from '../components/layout/layout';
import { style, classes } from "./index.st.css";

const Home: NextPage = () => {
  const { locale } = useRouter();
  return (
    <Layout isHome>
			<Head>
				<title>Site Title</title>
			</Head>
      <div className={style(classes.root)}>
			<article className={style(classes.article, { locale })}>
				<section className={classes.intro}>
					<p>פורסם בידי מחברו, אד ניית׳ר &lt;nather@astro.as.utexas.edu&gt;, ברשת Usenet, ב-21 במאי 1983.</p>
				</section>
				<section className={classes.verse}>
					<p className={classes.paragraph}>מאמר מן הזמן האחרון על צד <em>מצ'ואיסטי</em> בתכנות</p>
					<p className={classes.paragraph}>יצא בהכרזה נועזת וחסרת בסיס:</p>
					<blockquote className={classes.blockquote}>מתכנתים אמיתיים כותבים בפוֹרְטְרַן.</blockquote>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>אולי כיום,</p>
					<p className={classes.paragraph}>בתקופה דקדנטית זו של</p>
					<p className={classes.paragraph}>בירה לייט, מחשבוני כיס, ותוכנה "ידידותית-למשתמש"</p>
					<p className={classes.paragraph}>אך בימים ההם,</p>
					<p className={classes.paragraph}>כשהמונח "תוכנה" עוד היה נשמע מצחיק,</p>
					<p className={classes.paragraph}>ומחשבים אמיתיים נבנו בתופים ובשפופרות,</p>
					<p className={classes.paragraph}>מתכנתים אמיתיים כתבו בשפת מכונה.</p>
					<p className={classes.paragraph}>לא פוֹרְטְרַן. לא ראטפוֹר. אפילו לא שפת סף.</p>
					<p className={classes.paragraph}>שפת מכונה.</p>
					<p className={classes.paragraph}>מספרים גולמיים ויפים בבסיס הקסדצימלי.</p>
					<p className={classes.paragraph}>ישירות.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>לבל יגדל דור מתכנתים חדש</p>
					<p className={classes.paragraph}>בּוּר במורשת מפוארת זו</p>
					<p className={classes.paragraph}>אני חש כי מחובתי לתאר</p>
					<p className={classes.paragraph}>כמיטב יכולתי מבעד לפער הדורות</p>
					<p className={classes.paragraph}>איך מתכנת אמיתי כתב קוד.</p>
					<p className={classes.paragraph}>אקרא לו מֵל,</p>
					<p className={classes.paragraph}>כי זה היה שמו.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>את מל פגשתי כשעבדתי בחברת המחשבים רוֹיאל-מֶק'בִּי,</p>
					<p className={classes.paragraph}>כיום ישות רפאים עסקית המייצרת מכונת כתיבה.</p>
					<p className={classes.paragraph}>החברה ייצרה אז את ה-LGP-30,</p>
					<p className={classes.paragraph}>מחשב קטן וזול (בסטנדרטים של היום)</p>
					<p className={classes.paragraph}>בעל זיכרון תוף,</p>
					<p className={classes.paragraph}>ובדיוק החלה בייצור</p>
					<p className={classes.paragraph}>ה-4000-RPC, מחשב מתקדם יותר,</p>
					<p className={classes.paragraph}>גדול יותר, טוב יותר, מהיר יותר – בעל זיכרון תוף.</p>
					<p className={classes.paragraph}>ליבּוֹת זיכרון היו יקרות מדי,</p>
					<p className={classes.paragraph}>ובכל אופן, עמדו להעלם.</p>
					<p className={classes.paragraph}>(זו הסיבה שלא שמעת על החברה,</p>
					<p className={classes.paragraph}>או על המחשב.)</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>נשׂכרתי לכתוב מְהַדֵּר פוֹרְטְרַן</p>
					<p className={classes.paragraph}>עבור הפֶּלא החדש הזה ומל היה המדריך שלי לכל נפלאותיו.</p>
					<p className={classes.paragraph}>מל תיעב מהדרים.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>"אם תוכנה לא יודעת לשכתב את הקוד של עצמה,"</p>
					<p className={classes.paragraph}>שאל, "למה היא טובה?"</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>מל כתב,</p>
					<p className={classes.paragraph}>במספרים הקסדצימליים,</p>
					<p className={classes.paragraph}>את תוכנת הדגל של החברה.</p>
					<p className={classes.paragraph}>היא רצה על ה-30-LGP</p>
					<p className={classes.paragraph}>ושיחקה בלאק ג'ק בתערוכות מחשבים</p>
					<p className={classes.paragraph}>עם לקוחות פוטנציאליים.</p>
					<p className={classes.paragraph}>התגובות שעוררה תמיד היו דרמטיות.</p>
					<p className={classes.paragraph}>בכל תערוכה היה ביתן ה-30-LGP עמוס,</p>
					<p className={classes.paragraph}>סביב התגודדו אנשי המכירות של IBM</p>
					<p className={classes.paragraph}>ודיברו ביניהם.</p>
					<p className={classes.paragraph}>אם כל זה מכר מחשבים או לא</p>
					<p className={classes.paragraph}>זו היתה שאלה שמעולם לא שאלנו.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>העבודה של מל היתה לשכתב</p>
					<p className={classes.paragraph}>את תוכנת הבלאק ג'ק עבור ה-4000-RPC.</p>
					<p className={classes.paragraph}>(מי בכלל ידע אז מה זה פּוֹרְט?)</p>
					<p className={classes.paragraph}>מִיעוּן הכְּתוֹבוֹת במחשב החדש</p>
					<p className={classes.paragraph}>היה מסוג אחד-ועוד-אחד</p>
					<p className={classes.paragraph}>כך שבכל הוראה למכונה,</p>
					<p className={classes.paragraph}>בנוסף לקוד-הפעולה</p>
					<p className={classes.paragraph}>ולכתובת האוֹפֵּרַנְדּ,</p>
					<p className={classes.paragraph}>היתה כתובת נוספת שציינה היכן, על התוף המסתובב,</p>
					<p className={classes.paragraph}>ממוקמת ההוראה הבאה.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>בהשאלה לימינו,</p>
					<p className={classes.paragraph}>כל פעולה הסתיימה בפקודה TO GO!</p>
					<p className={classes.paragraph}>פַּטְמוּ <em>בַּזֶּה</em> את מיקטרתו של פסקל ועשנו.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>מל אהב את ה-4000-RPC</p>
					<p className={classes.paragraph}>משום שידע לכתוב עבורו קוד אופטימלי:</p>
					<p className={classes.paragraph}>כלומר, למקם הוראות על התוף</p>
					<p className={classes.paragraph}>כך, כאשר הוראה נשלמה,</p>
					<p className={classes.paragraph}>הבאה כבר הגיעה אל "הראש הקורא"</p>
					<p className={classes.paragraph}>נגישה ליישום מיידי.</p>
					<p className={classes.paragraph}>הייתה תוכנה שנועדה לעשות את הדבר הזה בדיוק,</p>
					<p className={classes.paragraph}>"אָסֶמְבְּלֶר מייעל",</p>
					<p className={classes.paragraph}>אך מל סירב להשתמש בה.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>"לך תדע איפה זה יניח את הדברים",</p>
					<p className={classes.paragraph}>הסביר, "כך שתיאלץ להשתמש בקבועים נפרדים."</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>רק לאחר זמן רב הבנתי את ההערה הזו באמת.</p>
					<p className={classes.paragraph}>מאחר ומל הכיר את הערך המספרי</p>
					<p className={classes.paragraph}>של כל הוראה</p>
					<p className={classes.paragraph}>והִקצה בעצמו את הכתובות על התוף</p>
					<p className={classes.paragraph}>כל הוראה שכתב יכולה הייתה להחשב</p>
					<p className={classes.paragraph}>לקבוע מספרי.</p>
					<p className={classes.paragraph}>כך יכול היה לקחת הוראת "חיבור", למשל,</p>
					<p className={classes.paragraph}>ואם ערכה המספרי התאים,</p>
					<p className={classes.paragraph}>להשתמש בה כּכוֹפֵל.</p>
					<p className={classes.paragraph}>עריכת הקוד שלו הייתה מסובכת לכולם, זולתו.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>השוויתי את האופטימיזציה הידנית של מל</p>
					<p className={classes.paragraph}>עם קוד זהה שעבר עיסוי באָסֶמְבְּלֶר המייעל,</p>
					<p className={classes.paragraph}>הקוד של מל תמיד רץ מהר יותר.</p>
					<p className={classes.paragraph}>זה היה משום שעיצוב המעלה-מטה</p>
					<p className={classes.paragraph}>עוד לא הומצא אז</p>
					<p className={classes.paragraph}>ומל ממילא לא היה משתמש בזה.</p>
					<p className={classes.paragraph}>הדבר הראשון שכתב היו הלולאות הפנימיות של התוכנה שלו</p>
					<p className={classes.paragraph}>כדי להעניק להן יתרון</p>
					<p className={classes.paragraph}>בבחירת כתובות הזיכרון הראשונות בתוף.</p>
					<p className={classes.paragraph}>האָסֶמְבְּלֶר המייעל לא היה מספיק מתוחכם כדי לעשות את זה.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>מל מעולם גם לא כתב לולאות השהיה,</p>
					<p className={classes.paragraph}>אפילו כשהפְלֵקסוֹרַייטֵר העיקש</p>
					<p className={classes.paragraph}>הזדקק להשהיה קלה בפלט האותיות כדי לעבוד כראוי.</p>
					<p className={classes.paragraph}>הוא פשוט מיקם הוראות על התוף</p>
					<p className={classes.paragraph}>כך שהבאה בתור היתה <em>בדיוק מאחורי</em> הראש הקורא</p>
					<p className={classes.paragraph}>כשהגיע תורה;</p>
					<p className={classes.paragraph}>נדרש התוף לסיבוב שלם</p>
					<p className={classes.paragraph}>כדי להגיע אליה.</p>
					<p className={classes.paragraph}>הוא טבע שם בלתי נשכח לתהליך הזה.</p>
					<p className={classes.paragraph}>על אף ש"אופטימום" הוא מושג אבסולוטי,</p>
					<p className={classes.paragraph}>כמו "ייחודי", הוא הפך למושג יחסי</p>
					<p className={classes.paragraph}>שגור בדיבור:</p>
					<p className={classes.paragraph}>"לא לגמרי אופטימום" או "פחות אופטימום"</p>
					<p className={classes.paragraph}>או "לא ממש אופטימום".</p>
					<p className={classes.paragraph}>מל כינה את אזורי ההשהיה המקסימלית</p>
					<p className={classes.paragraph}>"פסימום קיצוני".</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>לאחר שסיים את תוכנת הבלאק ג'ק</p>
					<p className={classes.paragraph}>בגרסה יציבה</p>
					<p className={classes.paragraph}>("אפילו המאתחל אופטימלי",</p>
					<p className={classes.paragraph}>אמר בגאווה)</p>
					<p className={classes.paragraph}>קיבל דרישת תיקון ממחלקת המכירות.</p>
					<p className={classes.paragraph}>התוכנה השתמשה במנגנון אלגנטי (אופטימלי)</p>
					<p className={classes.paragraph}>להגרלת מספרים,</p>
					<p className={classes.paragraph}>כדי לטרוף את "הקלפים" ולחלק את ה"חפיסה",</p>
					<p className={classes.paragraph}>וכמה אנשי מכירות סברו כי המשחק הוגן מדי,</p>
					<p className={classes.paragraph}>משום שמדי פעם הלקוחות הפסידו.</p>
					<p className={classes.paragraph}>הם רצו שמל ישנה את התוכנה</p>
					<p className={classes.paragraph}>כך שבאמצעות מתג במכונה</p>
					<p className={classes.paragraph}>יוכלו להטות את המספרים לטובת הלקוח.</p>
					{/* <p className={classes.paragraph}>they could change the odds and let the customer win.</p> */}
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>מל נרתע.</p>
					<p className={classes.paragraph}>לתחושתו היה זה לא ישר בעליל</p>
					<p className={classes.paragraph}>מה שנכון,</p>
					<p className={classes.paragraph}>לכן סירב.</p>
					<p className={classes.paragraph}>מנהל מחלקת המכירות דיבר עם מל,</p>
					<p className={classes.paragraph}>כך גם הבוס הגדול, ואל הלחץ של הבוס</p>
					<p className={classes.paragraph}>הצטרפו גם כמה מתכנתים.</p>
					<p className={classes.paragraph}>לבסוף מל נכנע וכתב את הקוד,</p>
					<p className={classes.paragraph}>אבל הוא הפך את התנאי,</p>
					<p className={classes.paragraph}>וכשלחצו על המתג,</p>
					<p className={classes.paragraph}>התוכנה רימתה, וניצחה בכל פעם.</p>
					<p className={classes.paragraph}>מל היה מאושר</p>
					<p className={classes.paragraph}>וטען שהוא אתי ברמת התת-מודע</p>
					<p className={classes.paragraph}>ובשום אופן לא הסכים לתקן זאת.</p>
					{/* <p className={classes.paragraph}>Mel balked.</p>
					<p className={classes.paragraph}>He felt this was patently dishonest,</p>
					<p className={classes.paragraph}>which it was,</p>
					<p className={classes.paragraph}>and that it impinged on his personal integrity as a programmer,</p>
					<p className={classes.paragraph}>which it did,</p>
					<p className={classes.paragraph}>so he refused to do it.</p>
					<p className={classes.paragraph}>The Head Salesman talked to Mel,</p>
					<p className={classes.paragraph}>as did the Big Boss and, at the boss's urging,</p>
					<p className={classes.paragraph}>a few Fellow Programmers.</p>
					<p className={classes.paragraph}>Mel finally gave in and wrote the code,</p>
					<p className={classes.paragraph}>but he got the test backwards,</p>
					<p className={classes.paragraph}>and, when the sense switch was turned on,</p>
					<p className={classes.paragraph}>the program would cheat, winning every time.</p>
					<p className={classes.paragraph}>Mel was delighted with this,</p>
					<p className={classes.paragraph}>claiming his subconscious was uncontrollably ethical,</p>
					<p className={classes.paragraph}>and adamantly refused to fix it.</p> */}
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>לאחר שמל עזב את החברה למקום ע₪יר יותר</p>
					<p className={classes.paragraph}>הבוס הגדול ביקש שאציץ בקוד</p>
					<p className={classes.paragraph}>ואראה אם אוכל לתקן אותו.</p>
					<p className={classes.paragraph}>בחוסר רצון נעתרתי לבקשתו.</p>
					<p className={classes.paragraph}>לעקוב אחרי הקוד של מל היתה הרפתקה אמיתית.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>תמיד הרגשתי שתכנות הוא אמנות</p>
					<p className={classes.paragraph}>שערכה האמיתי יכול להיבחן רק בידי</p>
					<p className={classes.paragraph}>אמן הבָּקִי בצפונותיהַ;</p>
					<p className={classes.paragraph}>אורים ותומים נפלאים</p>
					<p className={classes.paragraph}>חבויים מן העין האנושית, לעיתים לעד,</p>
					<p className={classes.paragraph}>בשל עצם טבעו של התהליך.</p>
					<p className={classes.paragraph}>אפשר ללמוד הרבה על אישיותו של אדם</p>
					<p className={classes.paragraph}>רק מדפדוף בקוד שכתב</p>
					<p className={classes.paragraph}>אפילו במספרים הקסדצימליים.</p>
					<p className={classes.paragraph}>מל היה, אני מאמין, גאון שהקדים את זמנו.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>ההלם הכי גדול שלי, כנראה, היה בגילוי</p>
					<p className={classes.paragraph}>לולאה תמימה ללא תנאי עצירה.</p>
					<p className={classes.paragraph}>שום תנאי. <em>כלום</em>.</p>
					<p className={classes.paragraph}>על פי ההיגיון הבריא זוהי לולאה אינסופית</p>
					<p className={classes.paragraph}>בה התוכנה תרוץ במעגל, לעד, ללא הרף.</p>
					<p className={classes.paragraph}>התוכנה הזו, לעומת זאת, חלפה בתוכה</p>
					<p className={classes.paragraph}>ויצאה מצדה השני בבטחה.</p>
					<p className={classes.paragraph}>נדרשו לי שבועיים כדי להבין איך.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>מחשב ה-4000-RPC היה מצויד במתקן מאוד מודרני</p>
					<p className={classes.paragraph}>בשם אוֹגֵר-מוֹנֶה</p>
					<p className={classes.paragraph}>שאיפשר לתכנת לולאות</p>
					<p className={classes.paragraph}>שעושות שימוש בהוראות עם היסט</p>
					<p className={classes.paragraph}>בכל ריצה של הלולאה</p>
					<p className={classes.paragraph}>המספר באוגר-מונה</p>
					<p className={classes.paragraph}>התווסף לכתובת האופרנד בהוראה</p>
					<p className={classes.paragraph}>כדי להצביע על</p>
					<p className={classes.paragraph}>פיסת המידע הבאה בסדרה.</p>
					<p className={classes.paragraph}>המתכנת היה צריך רק להוסיף 1 לערך השמור באוגר</p>
					<p className={classes.paragraph}>בכל מעבר דרך הלולאה.</p>
					<p className={classes.paragraph}>מל מעולם לא השתמש בו.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>תחת זאת, הוא העתיק את ההוראה אל אוגר אחר במכונה</p>
					<p className={classes.paragraph}>הוסיף 1 לרכיב הכתובת</p>
					<p className={classes.paragraph}>ושמר את התוצאה במקומה המקורי בזכרון.</p>
					<p className={classes.paragraph}>אז הריץ את ההוראה העדכנית</p>
					<p className={classes.paragraph}>ישר מן האוגר.</p>
					<p className={classes.paragraph}>הלולאה נכתבה כך שזמן הריצה הנוסף</p>
					<p className={classes.paragraph}>נלקח בחשבון –</p>
					<p className={classes.paragraph}>מייד כשביצוע ההוראה הסתיים,</p>
					<p className={classes.paragraph}>הבאה בתור הייתה כבר מונחת מתחת לראש הקריאה של התוף</p>
					<p className={classes.paragraph}>מוכנה לריצה.</p>
					<p className={classes.paragraph}>אבל בלולאה לא היה תנאי עצירה.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>הרמז החיוני הגיע כאשר שמתי לב</p>
					<p className={classes.paragraph}>שהביט של האוגר-מונה,</p>
					<p className={classes.paragraph}>הביט שבין הכתובת לבין קוד-הפעולה בהוראה,</p>
					<p className={classes.paragraph}>היה דלוק –</p>
					<p className={classes.paragraph}>אך מל לא השתמש באוגר-מונה,</p>
					<p className={classes.paragraph}>והשאיר אותו מאופס תמיד.</p>
					<p className={classes.paragraph}>כשראיתי את האור כמעט הסתנוורתי.</p>
					{/* <p className={classes.paragraph}>When the light went on it nearly blinded me.</p> */}
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>הוא מיקם את המידע שעליו עבד</p>
					<p className={classes.paragraph}>סמוך לראש הזיכרון –</p>
					<p className={classes.paragraph}>בכתובות הגדולות ביותר אליהן יכלה הוראה לפנות -</p>
					<p className={classes.paragraph}>כך שלאחר שפריט המידע האחרונה טופל,</p>
					<p className={classes.paragraph}>פעולת חיבור על כתובת ההוראה</p>
					<p className={classes.paragraph}>הייתה גורמת לגלישתה.</p>
					<p className={classes.paragraph}>העברת השארית הוסיפה אחד</p>
					<p className={classes.paragraph}>לקוד-הפעולה ושינתה אותו לקוד-הפעולה הבא ברשימת ההוראות:</p>
					<p className={classes.paragraph}>הוראת דילוג.</p>
					<p className={classes.paragraph}>מן הסתם, ההוראה הבאה כבר הייתה</p>
					<p className={classes.paragraph}>בכתובת אפס,</p>
					<p className={classes.paragraph}>והתוכנה המשיכה קדימה באושר בדרכה.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>לא שמרתי על קשר עם מל</p>
					<p className={classes.paragraph}>אז איני יודע אם אי פעם נכנע ללחץ</p>
					<p className={classes.paragraph}>השינויים ששטף את שיטות התכנות</p>
					<p className={classes.paragraph}>מאז אותם ימים נשכחים.</p>
					<p className={classes.paragraph}>אני מעדיף לחשוב שלא.</p>
					<p className={classes.paragraph}>כך או כך,</p>
					<p className={classes.paragraph}>התרשמתי מספיק כדי להפסיק לחפש</p>
					<p className={classes.paragraph}>את הקוד הסורר,</p>
					<p className={classes.paragraph}>ואמרתי לבוס שלא מצאתי כלום.</p>
					<p className={classes.paragraph}>הוא לא היה מופתע.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>כשעזבתי את החברה,</p>
					<p className={classes.paragraph}>תוכנת הבלאק ג'ק עדיין רימתה</p>
					<p className={classes.paragraph}>אם הפעלת את המתג הנכון,</p>
					<p className={classes.paragraph}>וטוב שכך.</p>
					<p className={classes.paragraph}>לא הרגשתי בנוח</p>
					<p className={classes.paragraph}>להתעס-האק בקוד של מתכנת אמיתי.</p>
				</section>				
			</article>

			<article className={classes.ltr}>
				<section className={classes.intro}>
					<p>This was posted to Usenet by its author, Ed Nather (&lt;nather@astro.as.utexas.edu&gt;, on May 21, 1983.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>A recent article devoted to the <em>macho</em> side of programming</p>
					<p className={classes.paragraph}>made the bald and unvarnished statement:</p>
					<blockquote className={classes.blockquote}>Real Programmers write in FORTRAN.</blockquote>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>Maybe they do now,</p>
					<p className={classes.paragraph}>in this decadent era of</p>
					<p className={classes.paragraph}>Lite beer, hand calculators, and "user-friendly" software</p>
					<p className={classes.paragraph}>but back in the Good Old Days,</p>
					<p className={classes.paragraph}>when the term "software" sounded funny</p>
					<p className={classes.paragraph}>and Real Computers were made out of drums and vacuum tubes,</p>
					<p className={classes.paragraph}>Real Programmers wrote in machine code.</p>
					<p className={classes.paragraph}>Not FORTRAN. Not RATFOR. Not, even, assembly language.</p>
					<p className={classes.paragraph}>Machine Code.</p>
					<p className={classes.paragraph}>Raw, unadorned, inscrutable hexadecimal numbers.</p>
					<p className={classes.paragraph}>Directly.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>Lest a whole new generation of programmers</p>
					<p className={classes.paragraph}>grow up in ignorance of this glorious past,</p>
					<p className={classes.paragraph}>I feel duty-bound to describe,</p>
					<p className={classes.paragraph}>as best I can through the generation gap,</p>
					<p className={classes.paragraph}>how a Real Programmer wrote code.</p>
					<p className={classes.paragraph}>I'll call him Mel,</p>
					<p className={classes.paragraph}>because that was his name.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>I first met Mel when I went to work for Royal McBee Computer Corp.,</p>
					<p className={classes.paragraph}>a now-defunct subsidiary of the typewriter company.</p>
					<p className={classes.paragraph}>The firm manufactured the LGP-30,</p>
					<p className={classes.paragraph}>a small, cheap (by the standards of the day)</p>
					<p className={classes.paragraph}>drum-memory computer,</p>
					<p className={classes.paragraph}>and had just started to manufacture</p>
					<p className={classes.paragraph}>the RPC-4000, a much-improved,</p>
					<p className={classes.paragraph}>bigger, better, faster — drum-memory computer.</p>
					<p className={classes.paragraph}>Cores cost too much,</p>
					<p className={classes.paragraph}>and weren't here to stay, anyway.</p>
					<p className={classes.paragraph}>(That's why you haven't heard of the company,</p>
					<p className={classes.paragraph}>or the computer.)</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>I had been hired to write a FORTRAN compiler</p>
					<p className={classes.paragraph}>for this new marvel and Mel was my guide to its wonders.</p>
					<p className={classes.paragraph}>Mel didn't approve of compilers.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>"If a program can't rewrite its own code",</p>
					<p className={classes.paragraph}>he asked, "what good is it?"</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>Mel had written,</p>
					<p className={classes.paragraph}>in hexadecimal,</p>
					<p className={classes.paragraph}>the most popular computer program the company owned.</p>
					<p className={classes.paragraph}>It ran on the LGP-30</p>
					<p className={classes.paragraph}>and played blackjack with potential customers</p>
					<p className={classes.paragraph}>at computer shows.</p>
					<p className={classes.paragraph}>Its effect was always dramatic.</p>
					<p className={classes.paragraph}>The LGP-30 booth was packed at every show,</p>
					<p className={classes.paragraph}>and the IBM salesmen stood around</p>
					<p className={classes.paragraph}>talking to each other.</p>
					<p className={classes.paragraph}>Whether or not this actually sold computers</p>
					<p className={classes.paragraph}>was a question we never discussed.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>Mel's job was to re-write</p>
					<p className={classes.paragraph}>the blackjack program for the RPC-4000.</p>
					<p className={classes.paragraph}>(Port? What does that mean?)</p>
					<p className={classes.paragraph}>The new computer had a one-plus-one</p>
					<p className={classes.paragraph}>addressing scheme,</p>
					<p className={classes.paragraph}>in which each machine instruction,</p>
					<p className={classes.paragraph}>in addition to the operation code</p>
					<p className={classes.paragraph}>and the address of the needed operand,</p>
					<p className={classes.paragraph}>had a second address that indicated where, on the revolving drum,</p>
					<p className={classes.paragraph}>the next instruction was located.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>In modern parlance,</p>
					<p className={classes.paragraph}>every single instruction was followed by a GO TO!</p>
					<p className={classes.paragraph}>Put <em>that</em> in Pascal's pipe and smoke it.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>Mel loved the RPC-4000</p>
					<p className={classes.paragraph}>because he could optimize his code:</p>
					<p className={classes.paragraph}>that is, locate instructions on the drum</p>
					<p className={classes.paragraph}>so that just as one finished its job,</p>
					<p className={classes.paragraph}>the next would be just arriving at the "read head"</p>
					<p className={classes.paragraph}>and available for immediate execution.</p>
					<p className={classes.paragraph}>There was a program to do that job,</p>
					<p className={classes.paragraph}>an "optimizing assembler",</p>
					<p className={classes.paragraph}>but Mel refused to use it.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>"You never know where it's going to put things",</p>
					<p className={classes.paragraph}>he explained, "so you'd have to use separate constants".</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>It was a long time before I understood that remark.</p>
					<p className={classes.paragraph}>Since Mel knew the numerical value</p>
					<p className={classes.paragraph}>of every operation code,</p>
					<p className={classes.paragraph}>and assigned his own drum addresses,</p>
					<p className={classes.paragraph}>every instruction he wrote could also be considered</p>
					<p className={classes.paragraph}>a numerical constant.</p>
					<p className={classes.paragraph}>He could pick up an earlier "add" instruction, say,</p>
					<p className={classes.paragraph}>and multiply by it,</p>
					<p className={classes.paragraph}>if it had the right numeric value.</p>
					<p className={classes.paragraph}>His code was not easy for someone else to modify.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>I compared Mel's hand-optimized programs</p>
					<p className={classes.paragraph}>with the same code massaged by the optimizing assembler program,</p>
					<p className={classes.paragraph}>and Mel's always ran faster.</p>
					<p className={classes.paragraph}>That was because the "top-down" method of program design</p>
					<p className={classes.paragraph}>hadn't been invented yet,</p>
					<p className={classes.paragraph}>and Mel wouldn't have used it anyway.</p>
					<p className={classes.paragraph}>He wrote the innermost parts of his program loops first,</p>
					<p className={classes.paragraph}>so they would get first choice</p>
					<p className={classes.paragraph}>of the optimum address locations on the drum.</p>
					<p className={classes.paragraph}>The optimizing assembler wasn't smart enough to do it that way.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>Mel never wrote time-delay loops, either,</p>
					<p className={classes.paragraph}>even when the balky Flexowriter</p>
					<p className={classes.paragraph}>required a delay between output characters to work right.</p>
					<p className={classes.paragraph}>He just located instructions on the drum</p>
					<p className={classes.paragraph}>so each successive one was just <em>past</em> the read head</p>
					<p className={classes.paragraph}>when it was needed;</p>
					<p className={classes.paragraph}>the drum had to execute another complete revolution</p>
					<p className={classes.paragraph}>to find the next instruction.</p>
					<p className={classes.paragraph}>He coined an unforgettable term for this procedure.</p>
					<p className={classes.paragraph}>Although "optimum" is an absolute term,</p>
					<p className={classes.paragraph}>like "unique", it became common verbal practice</p>
					<p className={classes.paragraph}>to make it relative:</p>
					<p className={classes.paragraph}>"not quite optimum" or "less optimum"</p>
					<p className={classes.paragraph}>or "not very optimum".</p>
					<p className={classes.paragraph}>Mel called the maximum time-delay locations</p>
					<p className={classes.paragraph}>the "most pessimum".</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>After he finished the blackjack program</p>
					<p className={classes.paragraph}>and got it to run</p>
					<p className={classes.paragraph}>("Even the initializer is optimized",</p>
					<p className={classes.paragraph}>he said proudly),</p>
					<p className={classes.paragraph}>he got a Change Request from the sales department.</p>
					<p className={classes.paragraph}>The program used an elegant (optimized)</p>
					<p className={classes.paragraph}>random number generator</p>
					<p className={classes.paragraph}>to shuffle the "cards" and deal from the "deck",</p>
					<p className={classes.paragraph}>and some of the salesmen felt it was too fair,</p>
					<p className={classes.paragraph}>since sometimes the customers lost.</p>
					<p className={classes.paragraph}>They wanted Mel to modify the program</p>
					<p className={classes.paragraph}>so, at the setting of a sense switch on the console,</p>
					<p className={classes.paragraph}>they could change the odds and let the customer win.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>Mel balked.</p>
					<p className={classes.paragraph}>He felt this was patently dishonest,</p>
					<p className={classes.paragraph}>which it was,</p>
					<p className={classes.paragraph}>and that it impinged on his personal integrity as a programmer,</p>
					<p className={classes.paragraph}>which it did,</p>
					<p className={classes.paragraph}>so he refused to do it.</p>
					<p className={classes.paragraph}>The Head Salesman talked to Mel,</p>
					<p className={classes.paragraph}>as did the Big Boss and, at the boss's urging,</p>
					<p className={classes.paragraph}>a few Fellow Programmers.</p>
					<p className={classes.paragraph}>Mel finally gave in and wrote the code,</p>
					<p className={classes.paragraph}>but he got the test backwards,</p>
					<p className={classes.paragraph}>and, when the sense switch was turned on,</p>
					<p className={classes.paragraph}>the program would cheat, winning every time.</p>
					<p className={classes.paragraph}>Mel was delighted with this,</p>
					<p className={classes.paragraph}>claiming his subconscious was uncontrollably ethical,</p>
					<p className={classes.paragraph}>and adamantly refused to fix it.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>After Mel had left the company for greener pa$ture$,</p>
					<p className={classes.paragraph}>the Big Boss asked me to look at the code</p>
					<p className={classes.paragraph}>and see if I could find the test and reverse it.</p>
					<p className={classes.paragraph}>Somewhat reluctantly, I agreed to look.</p>
					<p className={classes.paragraph}>Tracking Mel's code was a real adventure.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>I have often felt that programming is an art form,</p>
					<p className={classes.paragraph}>whose real value can only be appreciated</p>
					<p className={classes.paragraph}>by another versed in the same arcane art;</p>
					<p className={classes.paragraph}>there are lovely gems and brilliant coups</p>
					<p className={classes.paragraph}>hidden from human view and admiration, sometimes forever,</p>
					<p className={classes.paragraph}>by the very nature of the process.</p>
					<p className={classes.paragraph}>You can learn a lot about an individual</p>
					<p className={classes.paragraph}>just by reading through his code,</p>
					<p className={classes.paragraph}>even in hexadecimal.</p>
					<p className={classes.paragraph}>Mel was, I think, an unsung genius.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>Perhaps my greatest shock came</p>
					<p className={classes.paragraph}>when I found an innocent loop that had no test in it.</p>
					<p className={classes.paragraph}>No test. <em>None</em>.</p>
					<p className={classes.paragraph}>Common sense said it had to be a closed loop,</p>
					<p className={classes.paragraph}>where the program would circle, forever, endlessly.</p>
					<p className={classes.paragraph}>Program control passed right through it, however,</p>
					<p className={classes.paragraph}>and safely out the other side.</p>
					<p className={classes.paragraph}>It took me two weeks to figure it out.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>The RPC-4000 computer had a really modern facility</p>
					<p className={classes.paragraph}>called an index register.</p>
					<p className={classes.paragraph}>It allowed the programmer to write a program loop</p>
					<p className={classes.paragraph}>that used an indexed instruction inside;</p>
					<p className={classes.paragraph}>each time through,</p>
					<p className={classes.paragraph}>the number in the index register</p>
					<p className={classes.paragraph}>was added to the address of that instruction,</p>
					<p className={classes.paragraph}>so it would refer</p>
					<p className={classes.paragraph}>to the next datum in a series.</p>
					<p className={classes.paragraph}>He had only to increment the index register</p>
					<p className={classes.paragraph}>each time through.</p>
					<p className={classes.paragraph}>Mel never used it.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>Instead, he would pull the instruction into a machine register,</p>
					<p className={classes.paragraph}>add one to its address,</p>
					<p className={classes.paragraph}>and store it back.</p>
					<p className={classes.paragraph}>He would then execute the modified instruction</p>
					<p className={classes.paragraph}>right from the register.</p>
					<p className={classes.paragraph}>The loop was written so this additional execution time</p>
					<p className={classes.paragraph}>was taken into account —</p>
					<p className={classes.paragraph}>just as this instruction finished,</p>
					<p className={classes.paragraph}>the next one was right under the drum's read head,</p>
					<p className={classes.paragraph}>ready to go.</p>
					<p className={classes.paragraph}>But the loop had no test in it.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>The vital clue came when I noticed</p>
					<p className={classes.paragraph}>the index register bit,</p>
					<p className={classes.paragraph}>the bit that lay between the address</p>
					<p className={classes.paragraph}>and the operation code in the instruction word,</p>
					<p className={classes.paragraph}>was turned on —</p>
					<p className={classes.paragraph}>yet Mel never used the index register,</p>
					<p className={classes.paragraph}>leaving it zero all the time.</p>
					<p className={classes.paragraph}>When the light went on it nearly blinded me.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>He had located the data he was working on</p>
					<p className={classes.paragraph}>near the top of memory —</p>
					<p className={classes.paragraph}>the largest locations the instructions could address —</p>
					<p className={classes.paragraph}>so, after the last datum was handled,</p>
					<p className={classes.paragraph}>incrementing the instruction address</p>
					<p className={classes.paragraph}>would make it overflow.</p>
					<p className={classes.paragraph}>The carry would add one to the</p>
					<p className={classes.paragraph}>operation code, changing it to the next one in the instruction set:</p>
					<p className={classes.paragraph}>a jump instruction.</p>
					<p className={classes.paragraph}>Sure enough, the next program instruction was</p>
					<p className={classes.paragraph}>in address location zero,</p>
					<p className={classes.paragraph}>and the program went happily on its way.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>I haven't kept in touch with Mel,</p>
					<p className={classes.paragraph}>so I don't know if he ever gave in to the flood of</p>
					<p className={classes.paragraph}>change that has washed over programming techniques</p>
					<p className={classes.paragraph}>since those long-gone days.</p>
					<p className={classes.paragraph}>I like to think he didn't.</p>
					<p className={classes.paragraph}>In any event,</p>
					<p className={classes.paragraph}>I was impressed enough that I quit looking for the</p>
					<p className={classes.paragraph}>offending test,</p>
					<p className={classes.paragraph}>telling the Big Boss I couldn't find it.</p>
					<p className={classes.paragraph}>He didn't seem surprised.</p>
				</section>

				<section className={classes.verse}>
					<p className={classes.paragraph}>When I left the company,</p>
					<p className={classes.paragraph}>the blackjack program would still cheat</p>
					<p className={classes.paragraph}>if you turned on the right sense switch,</p>
					<p className={classes.paragraph}>and I think that's how it should be.</p>
					<p className={classes.paragraph}>I didn't feel comfortable</p>
					<p className={classes.paragraph}>hacking up the code of a Real Programmer.</p>
				</section>
			</article>
    </div>
    </Layout>
  )
};

export default Home
