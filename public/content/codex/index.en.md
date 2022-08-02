---
title: "The Story of Mel"
moto: "This was posted to Usenet by its author, Ed Nather <nather@astro.as.utexas.edu>, on May 21, 1983:"
credits: "Annotations written and curated by Tomer Lichtash and David Frankiel"
---

A recent article devoted to the _macho_ side of programming[^](annotations/recent-article)
made the bold and unvarnished statement:

> _[Real Programmers](glossary/real-programmer) write in [FORTRAN](glossary/fortran)._

Maybe they do now,
in this decadent era of
Lite beer, hand calculators[^](annotations/calculators), and "user-friendly" software[^](annotations/user-friendly-quatations)
but back in the Good Old Days,[^](annotations/story-timeline-estimation)
when the term "software" sounded funny
and Real Computers[^](annotations/real-computers) were made out of [drums](glossary/drum-memory) and [vacuum tubes](glossary/vacuum-tube),
[Real Programmers](glossary/real-programmer) wrote in [machine code](glossary/machine-code).
Not [FORTRAN](glossary/fortran). Not [RATFOR](glossary/ratfor). Not, even, [assembly language](glossary/assembly-language).
[Machine Code](glossary/machine-code).
Raw, unadorned, inscrutable [hexadecimal](glossary/hexadecimal) numbers.
Directly.

Lest a whole new generation of programmers
grow up in ignorance of this glorious past,
I feel duty-bound to describe,
as best I can through the generation gap,
how a [Real Programmer](glossary/real-programmer) wrote code.
I'll call him Mel,
because that was his name.[^](annotations/mel-kaye-bio)

I first met Mel when I went to work for Royal McBee Computer Corp.,[^](annotations/the-timeline-of-royal-mcbee)
a now-defunct subsidiary of the typewriter company.[^](annotations/now-defunct-subsidiary)
The firm manufactured the [LGP-30](glossary/lgp-30),
a small, cheap (by the standards of the day)
[drum-memory](glossary/drum-memory) computer,
and had just started to manufacture
the [RPC-4000](glossary/rpc-4000), a much-improved,
bigger, better, faster — [drum-memory](glossary/drum-memory) computer.
[Cores](glossary/magnetic-core-memory) cost too much,
and weren't here to stay, anyway.
(That's why you haven't heard of the company,
or the computer.)

I had been hired to write a [FORTRAN](glossary/fortran) [compiler](glossary/compiler)
for this new marvel[^](annotations/librazette-marvel) and Mel was my guide to its wonders.
Mel didn't approve of [compilers](glossary/compiler).

"If a program can't rewrite its own code",
he asked, "what good is it?"

Mel had written,[^](annotations/handwritten-code)
in [hexadecimal](glossary/hexadecimal),
the most popular computer program the company owned.
It ran on the [LGP-30](glossary/lgp-30)
and played blackjack[^](annotations/mels-blackjack-game) with potential customers[^](annotations/librazette-chicago-automation-show)
at computer shows.
Its effect was always dramatic.[^](annotations/librazette-quote-1)
The [LGP-30](glossary/lgp-30) booth was packed at every show,[^](annotations/librazette-quote-2)
and the IBM salesmen stood around
talking to each other.[^](annotations/librazette-quote-3)
Whether or not this actually sold computers
was a question we never discussed.

Mel's job was to re-write
the blackjack program for the [RPC-4000](glossary/rpc-4000)
([Port](glossary/port)? What does that mean?)
The new computer had a one-plus-one
[addressing scheme](glossary/addressing-scheme),[^](annotations/instruction1)
in which each machine instruction,
in addition to the [operation code](glossary/operation-code)
and the address of the needed [operand](glossary/operand),
had a second address that indicated where, on the revolving drum,
the next instruction was located.

In modern parlance,
every single instruction was followed by a [GO TO](glossary/goto)!
Put that in [Pascal](glossary/pascal)'s pipe and smoke it.

Mel loved the [RPC-4000](glossary/rpc-4000)
because he could optimize his code:
that is, locate instructions on the drum
so that just as one finished its job,
the next would be just arriving at the "read head"
and available for immediate execution.
There was a program to do that job,
an "optimizing assembler",[^](annotations/ref1) <!-- consider removal -->
but Mel refused to use it.

"You never know where it's going to put things",
he explained, "so you'd have to use separate constants".

It was a long time before I understood that remark.
Since Mel knew the numerical value
of every operation code,
and assigned his own drum addresses,
every instruction he wrote could also be considered
a numerical constant.
He could pick up an earlier "add" instruction, say,
and multiply by it,
if it had the right numeric value.
His code was not easy for someone else to modify.

I compared Mel's hand-optimized programs
with the same code massaged by the optimizing assembler program,
and Mel's always ran faster.
That was because the "[top-down](glossary/top-down-design)" method of program design
hadn't been invented yet,
and Mel wouldn't have used it anyway.
He wrote the innermost parts of his program [loops](glossary/loop) first,
so they would get first choice
of the [optimum](glossary/optimum) address locations on the drum.
The optimizing assembler wasn't smart enough to do it that way.

Mel never wrote [time-delay loops](glossary/time-delay-loop), either,
even when the balky [Flexowriter](glossary/friden-flexowriter)
required a delay between output characters to work right.[^](annotations/flexowriter-cps)
He just located instructions on the drum
so each successive one was just past the read head
when it was needed;
the drum had to execute another complete revolution
to find the next instruction.[^](annotations/mechanical-structure-vs-original-design)
He coined an unforgettable term for this procedure.
Although "[optimum](glossary/optimum)" is an absolute term,
like "unique", it became common verbal practice
to make it relative:
"not quite [optimum](glossary/optimum)" or "less [optimum](glossary/optimum)"
or "not very [optimum](glossary/optimum)".
Mel called the maximum time-delay locations
the "most [pessimum](glossary/pessimum)".

After he finished the blackjack program
and got it to run
("Even the initializer is optimized",
he said proudly),[^](annotations/mels-note-location-00000)
he got a Change Request from the sales department.
The program used an elegant (optimized)
random number generator
to shuffle the "cards" and deal from the "deck",
and some of the salesmen felt it was too fair,
since sometimes the customers lost.
They wanted Mel to modify the program
so, at the setting of a sense switch on the console,
they could change the odds and let the customer win.

Mel balked.
He felt this was patently dishonest,
which it was,
and that it impinged on his personal integrity as a programmer,
which it did,
so he refused to do it.
The Head Salesman talked to Mel,
as did the Big Boss and, at the boss's urging,
a few Fellow Programmers.
Mel finally gave in and wrote the code,
but he got the [test](glossary/test-terminating-condition) backwards,
and, when the sense switch was turned on,
the program would cheat, winning every time.
Mel was delighted with this,
claiming his subconscious was uncontrollably ethical,
and adamantly refused to fix it.

After Mel had left the company for greener pa$ture$,
the Big Boss asked me to look at the code
and see if I could find the [test](glossary/test-terminating-condition) and reverse it.
Somewhat reluctantly, I agreed to look.
Tracking Mel's code was a real adventure.

I have often felt that programming is an art form,
whose real value can only be appreciated
by another versed in the same arcane art;
there are lovely gems and brilliant coups
hidden from human view and admiration, sometimes forever,
by the very nature of the process.
You can learn a lot about an individual
just by reading through his code,
even in [hexadecimal](glossary/hexadecimal).
Mel was, I think, an unsung genius.

Perhaps my greatest shock came
when I found an innocent [loop](glossary/loop) that had no [test](glossary/test-terminating-condition) in it.
No [test](glossary/test-terminating-condition). None.
Common sense said it had to be a closed [loop](glossary/loop),
where the program would circle, forever, endlessly.
Program control passed right through it, however,
and safely out the other side.
It took me two weeks to figure it out.

The [RPC-4000](glossary/rpc-4000) computer had a really modern facility
called an index [register](glossary/register).
It allowed the programmer to write a program [loop](glossary/loop)
that used an indexed instruction inside;
each time through,
the number in the index [register](glossary/register)
was added to the address of that instruction,
so it would refer
to the next datum in a series.
He had only to increment the index [register](glossary/register)
each time through.
Mel never used it.

Instead, he would pull the instruction into a machine [register](glossary/register),
add one to its address,[^](annotations/index-register-1)
and store it back.[^](annotations/index-register-2)
He would then execute the modified instruction
right from the [register](glossary/register).
the [loop](glossary/loop) was written so this additional execution time
was taken into account —
just as this instruction finished,
the next one was right under the drum's read head,
ready to go.
But the [loop](glossary/loop) had no test in it.

The vital clue came when I noticed
the index [register](glossary/register) [bit](glossary/bit),
the [bit](glossary/bit) that lay between the address
and the [operation code](glossary/operation-code) in the instruction word,
was turned on[^](annotations/bit-binary-note) —
yet Mel never used the index [register](glossary/register),
leaving it zero all the time.
When the light went on it nearly blinded me.

He had located the data he was working on
near the top of memory —
the largest locations the instructions could address[^](annotations/rpc-4000-operand-address) —
so, after the last datum was handled,
incrementing the instruction address
would make it overflow.[^](annotations/numeric-overflow)
The carry would add one[^](annotations/how-instructions-are-composed) to the
operation code, changing it to the next one in the instruction set:
a [jump instruction](glossary/jump-instruction).
Sure enough, the next program instruction was
in address location zero,[^](annotations/rpc-4000-drum-memory-lowest-address)
and the program went happily on its way.

I haven't kept in touch with Mel,
so I don't know if he ever gave in to the flood of
change that has washed over programming techniques
since those long-gone days.
I like to think he didn't.
In any event,
I was impressed enough that I quit looking for the
offending test,
telling the Big Boss I couldn't find it.
He didn't seem surprised.

When I left the company,
the blackjack program would still cheat
if you turned on the right sense switch,
and I think that's how it should be.
I didn't feel comfortable
hacking up the code of a [Real Programmer](glossary/real-programmer).
