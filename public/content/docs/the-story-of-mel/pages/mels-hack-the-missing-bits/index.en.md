---
title: "Mel's Hack – The Missing Bits"
author: '(David *)Frenkiel'
date: Tue Jul 23 2022 01:14:31 GMT+0300
---

<blockQuote data-parse-mode="verse" data-type="quote">
	When the light went on it nearly blinded me.
	<cite>(Line 193)</cite>
</blockQuote>

This line in The Story of Mel precedes the author's description of Mel's hack, the almost criminally resourceful implementation of a finite loop with no exit condition. These words never fail to give me goosebumps. They reflect a rare "Ah!" moment, where a seemingly random collection of facts suddenly falls into a coherent logical structure.

Intellectual satisfaction notwithstanding, I suspect that a considerable part of my pleasure has been derived from a sense of belonging to an elite handful of people that really got it. Sure, many developers loved the story and cherished it as part of their digital sphere, but I could go into detail and describe the hack without a refresher. I knew about the index register bit, the trick of storing the modified instruction in its original location and the magical appearance of a `JUMP` instruction in the right place, at the right time.

It was only while proofing this project’s annotations to the story, that a certain unease started forming around that self-image of a real computer guy, who knows all about registers, addressing modes and overflows. This vague sensation soon evolved into my own "Mel moment", an almost perfect inverse of the original one. Unlike **Ed Nather**'s revelation, which was sudden and gratifying, mine was tedious and annoying. Instead of a light shining suddenly and brightly, I experienced a slow dimming of the mental picture that I had of Mel's hack. Rather than being blinded, the darkness allowed me to see clearly just how sloppy my reading had been. I was so enamoured with the story, that it never occurred to me to cast any doubt on its feasibility.

## Ed Nather's version

Let's briefly go over **Ed Nather**'s now-mythological description of the overflow that modified the code, created a `JUMP` instruction and allowed the program to magically leap out of an endless loop, as described in the story text:

<blockQuote data-parse-mode="verse" data-type="quote">
	The vital clue came when I noticed
	the index register bit,
	the bit that lay between the address
	and the operation code in the instruction word,
	was turned on
	<cite>(Lines 185-190)</cite>
</blockQuote>

For brevity and clarity, we will use a mock instruction layout in which each component (except for single bit fields) includes 3 bits. We'll start with an instruction that includes three parts:

- `(A)` – Data Address
- `(X)` – Index register
- `(C)` – Operation code

Something like:

<figure data-type="no-border">
<table data-type="bit-layout">
<tr>
<td>MSB<</td>
<th>AAA</th>
<th>X</th>
<th>CCC</th>
<td>>LSB</td>
</tr>
<tr>
<td></td>
<td>Data</td>
<td>Index</td>
<td>Opcode</td>
<td></td>
</tr>
</table>
</figure>

This layout is missing a part described earlier in the story:

<blockQuote data-parse-mode="verse" data-type="quote">
	The new computer had a one-plus-one
	addressing scheme
	in which each machine instruction,
	in addition to the operation code
	and the address of the needed operand,
	had a second address that indicated where, on the revolving drum,
	the next instruction was located.
	<cite>(Lines 54-60)</cite>
</blockQuote>

Thus, the bit layout of the instruction needs an additional component for the next address `(N)`. Its location doesn't affect the hack, as described in the story, but let's place it on the least significant bits, to be on the safe side:

<figure data-type="no-border">
<table data-type="bit-layout">
<tr>
<td>MSB<</td>
<th>AAA</th>
<th>X</th>
<th>CCC</th>
<th>NNN</th>
<td>>LSB</td>
</tr>
<tr>
<td></td>
<td>Data</td>
<td>Index</td>
<td>Opcode</td>
<td>Next</td>
<td></td>
</tr>
</table>
</figure>

We know that the `(A)` bits are lower than the `(C)` bits, because **Ed Nather** later describes the overflow that Mel hijacked:

<blockQuote data-parse-mode="verse" data-type="quote">
	Instead, he would pull the instruction into a machine register,
	add one to its address,
	and store it back
	[...]
	He had located the data he was working on
	near the top of memory —
	the largest locations the instructions could address —
	so, after the last datum was handled,
	incrementing the instruction address
	would make it overflow.
	The carry would add one to the
	operation code, changing it to the next one in the instruction set:
	<cite>(Lines 175-177, 194-201)</cite>
</blockQuote>

If incrementing the address span overflows into the opcode span, then the bit order between them is established:

<figure data-type="no-border">
<table data-type="bit-layout">
<tr>
<td>MSB<</td>
<th>CCC</th>
<th>X</th>
<th>AAA</th>
<th>NNN</th>
<td>>LSB</td>
</tr>
<tr>
<td></td>
<td>Opcode</td>
<td>Index</td>
<td>Data</td>
<td>Next</td>
<td></td>
</tr>
</table>
</figure>

If the index register bit `(X)` is indeed between the two and turned on, then overflowing the `(A)` span will carry through `(X)` into the `(C)` span, incrementing it by one. The result:

<blockQuote data-parse-mode="verse" data-type="quote">
	a jump instruction.
	Sure enough, the next program instruction was
	in address location zero,
	and the program went happily on its way.
	<cite>(Lines 202-205)</cite>
</blockQuote>

## The Unpleasant Truth

All this is possible in theory, but we still don't know where the `JUMP` instruction takes its operand from. We know that the operand's value must be 0 and it should be ready. The address span (A) indeed contains 0, but nowhere in the description of RPC-4000's architecture does Nather mention an option of the data address field doubling as an instruction address. The `JUMP` instruction could take its value from some register, but that `0` would have to be stored there beforehand, providing a screaming clue that some operation was being set up.

Not only did I gloss over this crucial step for 30 years – I also ignored the absence from this part of the story, of the unique addressing mode described above. The one that included the next instruction address in every instruction. Was that part affected by the overflow? Was there any relationship between the `JUMP` opcode and the `(A)` or `(N)` fields? And what about that `(X)` bit? Its alleged location, between two bitfields, just seemed... wrong.

After recovering from this blow to my computer ego, I took the basic step required to understand Mel's hack: looking up the RPC-4000 manual. It didn't take much browsing to hit a figure that dispelled all my doubts.

<figure>
![RPC 4000 Instruction format](https://mels-loop-media.s3.eu-north-1.amazonaws.com/RPC_4000_Instruction_ypjaii.png)

</figure>

Quite simply, the hack, as described in **Ed Nather**'s account, is impossible on the RPC-4000. The opcode `(C)` field, supposedly modified by the overflow, is in the least significant bits of the instruction. In the terms used above:

<figure data-type="no-border">
<table data-type="bit-layout">
<tr>
<td>MSB<</td>
<th>X</th>
<th>NNN</th>
<th>AAA</th>
<th>CCC</th>
<td>>LSB</td>
</tr>
<tr>
<td></td>
<td>Index</td>
<td>Next</td>
<td>Data</td>
<td>Opcode</td>
<td></td>
</tr>
</table>
</figure>

Thus, any overflow (which progresses toward the MSB) in the bits above the opcode, would not affect the latter. Furthermore, opcode `0` was not "A Jump instruction", but a different operation altogether, the specifics of which are beyond the scope of this analysis. Thus, even a different bit arrangement would not have redeemed the described hack.

## Reconstructing the Hack

Obviously, once we rule out **Ed Nather**'s code flow, all options are on the table, including the possibility that the whole thing is made up. However, it's interesting to speculate about scenarios that resemble the one described in The Story of Mel. Further browsing through this project’s resources page revealed that the discrepancy between the story and the machine specs did not escape other Mel enthusiasts. David Nugent's [Excellent Writeup](https://www.freecodecamp.org/news/macho-programmers-drum-memory-and-a-forensic-analysis-of-1960s-machine-code-6c5da6a40244/) discusses the problem, but still suggests a flow with the impossible opcode overflow. [The discussion](https://news.ycombinator.com/item?id=20489273) at Hacker News contains an excellent analysis of the problem by [Stassa Patsantzis](https://github.com/stassa) ("YeGoblynQueenne"), including a brief outline of a mechanism described below.

## A Pure Overflow Scenario

It turns out that the architecture of the RPC-4000 does provide for a code layout which would accomplish the feat by using an overflow. Using our simplified bit layout, let's assume that the instruction, at some point, reaches the value:

<figure data-type="no-border">
<table data-type="bit-layout">
<tr>
<td>MSB<</td>
<th>0</th>
<th>111</th>
<th>111</th>
<th>CCC</th>
<td>>LSB</td>
</tr>
<tr>
<td></td>
<td>Index</td>
<td>Next</td>
<td>Data</td>
<td>Opcode</td>
<td></td>
</tr>
</table>
</figure>

In this diagram, the opcode doesn't matter, it can be any part of the program logic. The address of the next instruction is `111`, so that's where the next step of the loop is located. The data address is also `111`, which doesn't pose a problem: The instruction may not even need an operand, or the value in the `111` address may be commensurate with the program logic. Normally, the program would proceed to the instruction in location 111. Now, when we try to increment the data address by `1` (adding `1000`), the "overflow" of the field zeroes out the `(A)` and `(N)` fields, yielding this instruction:

<figure data-type="no-border">
<table data-type="bit-layout">
<tr>
<td>MSB<</td>
<th>1</th>
<th>000</th>
<th>000</th>
<th>CCC</th>
<td>>LSB</td>
</tr>
<tr>
<td></td>
<td>Index</td>
<td>Next</td>
<td>Data</td>
<td>Opcode</td>
<td></td>
</tr>
</table>
</figure>

Which would execute opcode `CCC` and then jump to address `0`, just as **Ed Nather** wrote. In the above diagram, the index register bit is set to 0, so that it would toggle to 1 following the address overflow. This toggle may be the origin of Nather's recollection of seeing the bit turned on for no apparent reason.

## A Less Romantic Alternative

There's another possible scenario, even more compatible with the story and in line with the RPC-4000 specs. This flow is mentioned in [Stassa Patsantzis](https://news.ycombinator.com/item?id=20489273)'s post. It requires us to assert that **Ed Nather** misremembered or misunderstood two properties of the RPC-4000:

- Opcode `23 (10111)` was the machine's _conditional_ `JUMP` instruction, called `TBC` (**T**ransfer on **B**ranch **C**ontrol). This opcode transferred control to the address in the `(A)` field, _If_ an internal switch called the `Branch Control Unit (BCU)` was on. If it was off, the next instruction address would default to the `(N)` field.

<figure>
![RPC-4000 TBC instruction](https://mels-loop-media.s3.eu-north-1.amazonaws.com/transfer-branch-control_gc2xg2.png)

</figure>

- What could switch the `BCU` on? According to the manual - either when a successful comparison had just been made, or - more relevant to our story - following _an overflow_.

<figure>
![](https://mels-loop-media.s3.eu-north-1.amazonaws.com/branch-control_xd0vqd.png)

<figcaption>Fig. %index%. Source: RPC-4000 manual</figcaption>
</figure>

Simply put, conditional branching (e.g. `if..else` or looping until an index reaches a limit) on the RPC-4000 was implemented with two steps:

1. A test, like comparing two numbers, followed immediately by -
2. The `TBC` instruction, which would transfer control to the instruction in address `(A)` if the test was successful

If the test failed (`else`), the program would proceed as usual to the next address in field `(N)`.

It's reasonable to assume that standard training on the RPC-4000 included only this variant of the `TBC` usage, being an essential part of computer programming. Thus, it's also reasonable to assume that **Ed Nather** was surprised to find a `TBC` instruction without the necessary preceding test.

Instead of running a test, Mel kept incrementing the value of the `(A)` field, as described in the story. This eventually led to an overflow of the entire register, provided the index register bit `(X)` was on – exactly as Nather remembered. Using 101 as the `TBC` opcode yields the following sequence:

<figure data-type="codeblock">
             1111111101
        MSB <----------> LSB

        +    0000001000
        ====================
             0000000101
        MSB <----------> LSB

        +     OVERFLOW

</figure>

The overflow would toggle the `BCU` on, causing the heretofore ineffective `TBC` to transfer control to the address in the `(A)` field, which was 0. If Ed Nather was not familiar with the overflow aspect of the `BCU`, then his reading of the code would indeed lead to the diagnosis of a loop without a test. A standard conditional jump consisted of some test, followed by a `TBC` instruction, which would `JUMP` out of the loop only if the test had succeeded. It was quite natural, then, for a RPC-4000 programmer to come across a "free floating" `TBC` instruction, with no preceding test and conclude:

> But the loop had no test in it.

This scenario seems closer to the original story: The `JUMP` is there, as well as the overflow and the seemingly unnecessary `1` in the index register bit. There are only two deviations from the original account:

1. The opcode is never modified.
2. The magical nature of the hack is due not only to Mel's prowess, but also – perhaps mostly – to **Ed Nather**'s incomplete understanding of the machine. Had he known that the `TBC` instruction was influenced by an overflow, he would have cracked the problem right away, leaving no story for posterity.

Anyone who likes coding can imagine **Mel Kaye**'s reaction, when he discovered the path of an overflow triggering a jump. The challenge was immediately obvious. Having run a trivial POC, he naturally proceeded to the next level, causing the overflow at the end of an iterative process, after the data had been drained. This way, he could avoid the standard test at the end of the loop. The stroke of genius was completed when he managed to usefully incorporate this structure into a real-world program.

## So What You're Saying is

Whichever version you prefer – the number juggling trick or the deviously elegant `TBC` manipulation – it’s clear that **Ed Nather**'s account was rooted in faulty memory (and probably a faulty understanding of RPC-4000). This finding does not diminish the story's charm. Most developers can identify with the laborious excavation through another programmer's "impossible" code. The charm of a self-modifying program is still there and the hack, in both implementations, is impressive.

If this analysis can cast a shadow on the myth of **Mel Kaye**, it is not related to **Ed Nather**'s credibility, nor to Mel's undeniable skill. Rather, it stems from the obvious lack of real value that the hack added to the program. It's very unlikely that a standard loop would have degraded the program's performance in any noticeable way. Mel's testless loop was clearly a vain addition of complexity.

This approach to coding is far from extinct. One often finds it in software teams, among some highly regarded – though less valued – members. If you've spent several years in the industry or in Computer Science academia, you surely know this subspecies: the developer that replaces a straightforward loop with a series of auto-resolving promises, capped by a cryptic reducer, then revels in their teammates' bewilderment at the sight of the new code. Hardly the personality that you'd select for a coding legend.

However, there is one distinction that can make all the difference – Mel's hack was performed in the dark. It was meant to run silently until the machine was retired, visible only to mute tape readers. **Ed Nather'**s encounter with the code was incidental; his struggle with the logic indicates that Mel never bragged about his coup to anyone in the company. His duel with the machine required no audience. The sparks of beauty and brilliance that it generated needed no applause. An epitome of a _real programmer_, Mel Kaye was perfectly content watching his code run and feeling very, very clever.
