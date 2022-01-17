import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
// import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
// import homeStyles from '../styles/home.module.scss';
//import { getSortedPostsData } from '../lib/content-drivers/posts';
import { getSortedCodexData } from '../lib/content-drivers/codex';
import { IContentComponentData, IMLParsedNode, IParsedPageData } from '../interfaces/models';
import ContentComponent from '../components/content/contentComponent';
//import { useState } from 'react';

const FULL_PAGE_RE = /full.*text/i

export default function Home(data: IContentComponentData) {
	// const { locale } = useRouter();
	//const [sortedContent, setSortedContent] = useState<IParsedPageData[]>(getSortedCodexData("he"))
	const { content, locale } = data;
	const pageData: IParsedPageData[] = JSON.parse(content)

	// find full content page
	let pageIndex = pageData.findIndex(pdata => FULL_PAGE_RE.test(pdata.id));
	if (pageIndex < 0) {
		pageIndex = 0;
	}
	const page = pageData[pageIndex] || {} as IParsedPageData;
	const elements: IMLParsedNode[] = page.parsed || [];
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>

			{/* <article className={homeStyles.ltr}>
				<section className={homeStyles.intro}>
					<p>This was posted to Usenet by its author, Ed Nather (&lt;nather@astro.as.utexas.edu&gt;, on May 21, 1983.</p>
				</section>

				<section className={homeStyles.verse}>
					<p className={homeStyles.paragraph}>A recent article devoted to the <em>macho</em> side of programming</p>
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
					<p className={homeStyles.paragraph}>Not FORTRAN. Not RATFOR. Not, even, assembly language.</p>
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
					<p className={homeStyles.paragraph}>(Port? What does that mean?)</p>
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
					<p className={homeStyles.paragraph}>Put <em>that</em> in Pascal's pipe and smoke it.</p>
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
					<p className={homeStyles.paragraph}>so each successive one was just <em>past</em> the read head</p>
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
					<p className={homeStyles.paragraph}>No test. <em>None</em>.</p>
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
			</article> */}
			<article className={'rtl'}>
				{
					elements.map((node, index) => {
						return <ContentComponent key={`top-${index}`} data={(
							{
								data: node,
								locale
							}
						)}/>
					})
				}		
			</article>
		</Layout>
	);
}

 export const getStaticProps: GetStaticProps = async ({ locale }) => {
 	const data = getSortedCodexData(locale);
 	return {
 		props: {
 			content: JSON.stringify(data),
 			locale
 		},
 	};
 };
