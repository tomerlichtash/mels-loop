---
source_name: מדריך תוכנה לבלאקג׳ק
source_url: /he/docs/blackjack-writeup
source_author: מל קיי
---

תוכנת הבלאק ג׳ק של מל היתה תוכנה שיווקית להדגמת יכולותיו של ה-30-LGP והפכה לתוכנת הדגל של החברה. לאחר שיכתוב התוכנה ל-4000-RPC כתב מל מבוא קצר, בו הוא מתאר את אופן פעולתה: האינטראקציה בין השחקן (מפעיל המחשב) לתוכנה נעשית באמצעות מכונת הכתיבה. הפלט (שאלות הדילר, רשימת הקלפים וכו׳) מודפס, והקלט (בחירות השחקן) מוזן באמצעות המקלדת במכונה. ראשית הודפסה השאלה: "?How much do you bet"; השחקן הקליד את הסכום ואחריו כוכבית (המשמשת כסימן העצירה): למשל – הפקודה 150 שאחריה כוכבית תהמר על 150 דולר. הפלקסורייטר ידפיס "Shuffling" והמחשב יערבב את החפיסה. כדי להמשיך יש לעצור את פעולת הערבוב (באמצעות הרמת מתג 1). אז, התוכנה מדפיסה את המילה "Cut" וחותכת את החפיסה עד שהשחקן עוצר את הפעולה (באמצעות הורדת מתג 1). לאחר מכן התוכנה מחלקת את הקלפים והמשחק נמשך. על כל שאלות התוכנה להיענות באמצעות מקלדת מכונת הכתיבה; התוכנה ידעה לעבד תשובה חיובית בכמה שפות (yes, ok, si, ja, oui).

לפני הפעלת התוכנה היה על השחקן לבצע שתי פעולות: ראשית, הוא נדרש להכין דף משחק ייעודי עבור פלט המשחק ולהזין אותו למכונת הכתיבה. טבלה מייצגת את תוכני המשחק: במרחק 15 רווחים עמודת שאלות ותשובות, במרחק 12 רווחים עמודת קלפים, 12 רווחים נוספים – עמודה לקלפים של הדילר, ו-12 רווחים משם עמודת ניקוד לכל משחק. שנית, על המפעיל היה לאתחל את התוכנה בעשרה צעדים: יש למקם את הסרט בקורא, לבחור קלט קורא, להוריד מתג ONE OPERATION, להוריד מתג EXECUTE LOWER, להוריד מתג SET INPUT, להוריד מתג START READ בפלקסורייטר, להרים מתג EXECUTE LOWER, להוריד מתג SET INPUT, להרים מתג ONE OPERATION ולהוריד מתג START READ בפלקסורייטר.