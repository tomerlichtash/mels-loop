---
title: "The Missing Bits"
abstract: "How Did Mel's Hack Actually Came to Be"
author: "(David *)Frenkiel"
date: Tue Jul 23 2022 01:14:31 GMT+0300
---

> When the light went on it nearly blinded me.
> (Line 193)

This line in The Story of Mel precedes the author's description of Mel's hack, the almost criminally resourceful implementation of a finite loop with no exit condition. These words never fail to give me goosebumps. They reflect a rare "Ah!" moment, where a seemingly random collection of facts suddenly falls into a coherent logical structure.

Intellectual satisfaction notwithstanding, I suspect that a considerable part of my pleasure has been derived from a sense of belonging to an elite handful of people that really got it. Sure, many developers loved the story and cherished it as part of their digital sphere, but I could go into detail and describe the hack without a refresher. I knew about the index register bit, the trick of storing the modified instruction in its original location and the magical appearance of a `JUMP` instruction in the right place, at the right time.

It was only while proofing this project’s annotations to the story, that a certain unease started forming around that self-image of a real computer guy, who knows all about registers, addressing modes and overflows. This vague sensation soon evolved into my own "Mel moment", an almost perfect inverse of the original one. Unlike **Ed Nather**'s revelation, which was sudden and gratifying, mine was tedious and annoying. Instead of a light shining suddenly and brightly, I experienced a slow dimming of the mental picture that I had of Mel's hack. Rather than being blinded, the darkness allowed me to see clearly just how sloppy my reading had been. I was so enamoured with the story, that it never occurred to me to cast any doubt on its feasibility.

## Ed Nather's version

Let's briefly go over **Ed Nather**'s now-mythological description of the overflow that modified the code, created a `JUMP` instruction and allowed the program to magically leap out of an endless loop, as described in the story text:

      The vital clue came when I noticed
      the index register bit,
      the bit that lay between the address
      and the operation code in the instruction word,
      was turned on
      (Lines 185-190)

For brevity and clarity, we will use a mock instruction layout in which each component (except for single bit fields) includes 3 bits. We'll start with an instruction that includes three parts:

- `(A)` – Data Address
- (X) – Index register
- (C) – Operation code

Something like:

```
        AAAXCCC
MSB <--------> LSB
```

This layout is missing a part described earlier in the story:

      The new computer had a one-plus-one
      addressing scheme
      in which each machine instruction,
      in addition to the operation code
      and the address of the needed operand,
      had a second address that indicated where, on the revolving drum,
      the next instruction was located.
      (Lines 54-60)

Thus, the bit layout of the instruction needs an additional component for the next address `(N)`. Its location doesn't affect the hack, as described in the story, but let's place it on the least significant bits, to be on the safe side:

```
     AAAXCCCNNN
MSB <----------> LSB
```

We know that the `(A)` bits are lower than the `(C)` bits, because **Ed Nather** later describes the overflow that Mel hijacked:

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
      (Lines 175-177, 194-201)

If incrementing the address span overflows into the opcode span, then the bit order between them is established:

```
     CCCXAAANNN
MSB <----------> LSB
```

If the index register bit `(X)` is indeed between the two and turned on, then overflowing the `(A)` span will carry through `(X)` into the `(C)` span, incrementing it by one. The result:

```
a jump instruction.
Sure enough, the next program instruction was
in address location zero,
and the program went happily on its way.
(Lines 202-205)
```

## The Unpleasant Truth

All this is possible in theory, but we still don't know where the `JUMP` instruction takes its operand from. We know that the operand's value must be 0 and it should be ready. The address span (A) indeed contains 0, but nowhere in the description of RPC-4000's architecture does Nather mention an option of the data address field doubling as an instruction address. The `JUMP` instruction could take its value from some register, but that `0` would have to be stored there beforehand, providing a screaming clue that some operation was being set up.

Not only did I gloss over this crucial step for 30 years – I also ignored the absence from this part of the story, of the unique addressing mode described above. The one that included the next instruction address in every instruction. Was that part affected by the overflow? Was there any relationship between the `JUMP` opcode and the `(A)` or `(N)` fields? And what about that `(X)` bit? Its alleged location, between two bitfields, just seemed... wrong.

After recovering from this blow to my computer ego, I took the basic step required to understand Mel's hack: looking up the RPC-4000 manual. It didn't take much browsing to hit a figure that dispelled all my doubts.

![RPC 4000 Instruction format](https://res.cloudinary.com/dcajl1s6a/image/upload/v1654892829/mels-hack/RPC_4000_Instruction_ypjaii.png)

Quite simply, the hack, as described in **Ed Nather**'s account, is impossible on the RPC-4000. The opcode `(C)` field, supposedly modified by the overflow, is in the least significant bits of the instruction. In the terms used above:

            XNNNAAACCC
      MSB <----------> LSB

Thus, any overflow (which progresses toward the MSB) in the bits above the opcode, would not affect the latter. Furthermore, opcode `0` was not "A Jump instruction", but a different operation altogether, the specifics of which are beyond the scope of this analysis. Thus, even a different bit arrangement would not have redeemed the described hack.

## Reconstructing the Hack

Obviously, once we rule out **Ed Nather**'s code flow, all options are on the table, including the possibility that the whole thing is made up. However, it's interesting to speculate about scenarios that resemble the one described in The Story of Mel. Further browsing through this project’s resources page revealed that the discrepancy between the story and the machine specs did not escape other Mel enthusiasts. David Nugent's [Excellent Writeup](https://www.freecodecamp.org/news/macho-programmers-drum-memory-and-a-forensic-analysis-of-1960s-machine-code-6c5da6a40244/) discusses the problem, but still suggests a flow with the impossible opcode overflow. [The discussion](https://news.ycombinator.com/item?id=20489273) at Hacker News contains an excellent analysis of the problem by [Stassa Patsantzis](https://github.com/stassa) ("YeGoblynQueenne"), including a brief outline of a mechanism described below.

## A Pure Overflow Scenario

It turns out that the architecture of the RPC-4000 does provide for a code layout which would accomplish the feat by using an overflow. Using our simplified bit layout, let's assume that the instruction, at some point, reaches the value:

            0111111CCC
      MSB <----------> LSB

In this diagram, the opcode doesn't matter, it can be any part of the program logic. The address of the next instruction is `111`, so that's where the next step of the loop is located. The data address is also `111`, which doesn't pose a problem: The instruction may not even need an operand, or the value in the `111` address may be commensurate with the program logic. Normally, the program would proceed to the instruction in location 111. Now, when we try to increment the data address by `1` (adding `1000`), the "overflow" of the field zeroes out the `(A)` and `(N)` fields, yielding this instruction:

            1000000CCC
      MSB <----------> LSB

Which would execute opcode CCC and then jump to address 0, just as **Ed Nather** wrote. In the above diagram, the index register bit is set to 0, so that it would toggle to 1 following the address overflow. This toggle may be the origin of Nather's recollection of seeing the bit turned on for no apparent reason.

## A Less Romantic Alternative

There's another possible scenario, even more compatible with the story and in line with the RPC-4000 specs. This flow is mentioned in [Stassa Patsantzis](https://news.ycombinator.com/item?id=20489273)'s post. It requires us to assert that **Ed Nather** misremembered or misunderstood two properties of the RPC-4000:

- Opcode `23 (10111)` was the machine's _conditional_ `JUMP` instruction, called `TBC` (**T**ransfer on **B**ranch **C**ontrol). This opcode transferred control to the address in the `(A)` field, _If_ an internal switch called the `Branch Control Unit (BCU)` was on. If it was off, the next instruction address would default to the `(N)` field.

![RPC-4000 TBC instruction](https://res.cloudinary.com/dcajl1s6a/image/upload/v1654922031/mels-hack/transfer-branch-control_gc2xg2.png)

- What could switch the `BCU` on? According to the manual - either when a successful comparison had just been made, or - more relevant to our story - following _an overflow_.

![](https://res.cloudinary.com/dcajl1s6a/image/upload/v1655241687/mels-hack/branch-control_xd0vqd.png)

Simply put, conditional branching (e.g. if..else or looping until an index reaches a limit) on the RPC-4000 was implemented with two steps:

1. A test, like comparing two numbers, followed immediately by -
2. The `TBC` instruction, which would transfer control to the instruction in address `(A)` if the test was successful

If the test failed (`else`), the program would proceed as usual to the next address in field `(N)`.

It's reasonable to assume that standard training on the RPC-4000 included only this variant of the `TBC` usage, being an essential part of computer programming. Thus, it's also reasonable to assume that **Ed Nather** was surprised to find a `TBC` instruction without the necessary preceding test.

Instead of running a test, Mel kept incrementing the value of the `(A)` field, as described in the story. This eventually led to an overflow of the entire register, provided the index register bit (X) was on – exactly as Nather remembered. Using 101 as the `TBC` opcode yields the following sequence:

            1111111101
      MSB <----------> LSB

      +    0000001000
      ====================
            0000000101
      MSB <----------> LSB

      +     OVERFLOW

The overflow would toggle the `BCU` on, causing the heretofore ineffective `TBC` to transfer control to the address in the `(A)` field, which was 0. If Ed Nather was not familiar with the overflow aspect of the `BCU`, then his reading of the code would indeed lead to the diagnosis of a loop without a test. A standard conditional jump consisted of some test, followed by a `TBC` instruction, which would `JUMP` out of the loop only if the test had succeeded. It was quite natural, then, for a RPC-4000 programmer to come across a "free floating" `TBC` instruction, with no preceding test and conclude:

> But the loop had no test in it.

This scenario seems closer to the original story: The `JUMP` is there, as well as the overflow and the seemingly unnecessary `1` in the index register bit. There are only two deviations from the original account:

1. The opcode is never modified.
2. The magical nature of the hack is due not only to Mel's prowess, but also – perhaps mostly – to \* Ed Nather\*\*'s incomplete understanding of the machine. Had he known that the `TBC` instruction was influenced by an overflow, he would have cracked the problem right away, leaving no story for posterity.

Anyone who likes coding can imagine **Mel Kaye**'s reaction, when he read about the path of an overflow triggering a jump. The challenge was immediately obvious. Having run a trivial POC, he naturally proceeded to the next level, causing the overflow at the end of an iterative process, after the data had been drained. This way, he could avoid the standard test at the end of the loop. The stroke of genius was completed when he managed to usefully incorporate this structure into a real-world program.

## So What You're Saying is

Whichever version you prefer – the number juggling trick or the deviously elegant `TBC` manipulation – it’s clear that **Ed Nather**'s account was rooted in faulty memory (and probably a faulty understanding of RPC-4000). This finding does not diminish the story's charm. Most developers can identify with the laborious excavation through another programmer's "impossible" code. The charm of a self-modifying program is still there and the hack, in both implementations, is impressive.

If this analysis can cast a shadow on the myth of **Mel Kaye**, it is not related to **Ed Nather**'s credibility, nor to Mel's undeniable skill. Rather, it stems from the obvious lack of real value that the hack added to the program. It's very unlikely that a standard loop would have degraded the program's performance in any noticeable way. Mel's testless loop was clearly a vain addition of complexity, in an environment that was very complex on its own.

This approach to coding is far from extinct. One often finds it in software teams, among some highly regarded – though less valued – members. If you've spent several years in the industry or in Computer Science academia, you surely know this subspecies: the developer that replaces a straightforward loop with a series of auto-resolving promises, capped by a cryptic reducer, then revels in their teammates' bewilderment at the sight of the new code. Hardly the personality that you'd select for a coding legend.

However, there is one distinction that can make all the difference – Mel's hack was performed in the dark. It was meant to run silently until the machine was retired, visible only to mute tape readers. **Ed Nather'**s encounter with the code was incidental; his struggle with the logic indicates that Mel never bragged about his coup to anyone in the company. His duel with the machine required no audience. The sparks of beauty and brilliance that it generated needed no applause. An epitome of a _real programmer_, Mel Kaye was perfectly content watching his code run and feeling very, very clever.

---

# Markdown: Syntax

- [Overview](#overview)
- [Philosophy](#philosophy)
- [Inline HTML](#html)
- [Automatic Escaping for Special Characters](#autoescape)
- [Block Elements](#block)
- [Paragraphs and Line Breaks](#p)
- [Headers](#header)
- [Blockquotes](#blockquote)
- [Lists](#list)
- [Code Blocks](#precode)
- [Horizontal Rules](#hr)
- [Span Elements](#span)
- [Links](#link)
- [Emphasis](#em)
- [Code](#code)
- [Images](#img)
- [Miscellaneous](#misc)
- [Backslash Escapes](#backslash)
- [Automatic Links](#autolink)

**Note:** This document is itself written using Markdown; you
can [see the source for it by adding '.text' to the URL](/projects/markdown/syntax.text).

---

## Overview

### Philosophy

Markdown is intended to be as easy-to-read and easy-to-write as is feasible.

Readability, however, is emphasized above all else. A Markdown-formatted
document should be publishable as-is, as plain text, without looking
like it's been marked up with tags or formatting instructions. While
Markdown's syntax has been influenced by several existing text-to-HTML
filters -- including [Setext](http://docutils.sourceforge.net/mirror/setext.html), [atx](http://www.aaronsw.com/2002/atx/), [Textile](http://textism.com/tools/textile/), [reStructuredText](http://docutils.sourceforge.net/rst.html),
[Grutatext](http://www.triptico.com/software/grutatxt.html), and [EtText](http://ettext.taint.org/doc/) -- the single biggest source of
inspiration for Markdown's syntax is the format of plain text email.

## Block Elements

### Paragraphs and Line Breaks

A paragraph is simply one or more consecutive lines of text, separated
by one or more blank lines. (A blank line is any line that looks like a
blank line -- a line containing nothing but spaces or tabs is considered
blank.) Normal paragraphs should not be indented with spaces or tabs.

The implication of the "one or more consecutive lines of text" rule is
that Markdown supports "hard-wrapped" text paragraphs. This differs
significantly from most other text-to-HTML formatters (including Movable
Type's "Convert Line Breaks" option) which translate every line break
character in a paragraph into a `<br />` tag.

When you _do_ want to insert a `<br />` break tag using Markdown, you
end a line with two or more spaces, then type return.

### Headers

Markdown supports two styles of headers, [Setext] [1] and [atx] [2].

Optionally, you may "close" atx-style headers. This is purely
cosmetic -- you can use this if you think it looks better. The
closing hashes don't even need to match the number of hashes
used to open the header. (The number of opening hashes
determines the header level.)

### Blockquotes

<!-- > Single line blockquote: Markdown uses email-style `>` characters for blockquoting. If you're familiar with quoting passages of text in an email message, then you know how to create a blockquote in Markdown. It looks best if you hard wrap the text and put a `>` before every line: -->

Markdown uses email-style `>` characters for blockquoting. If you're
familiar with quoting passages of text in an email message, then you
know how to create a blockquote in Markdown. It looks best if you hard
wrap the text and put a `>` before every line:

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

Markdown allows you to be lazy and only put the `>` before the first
line of a hard-wrapped paragraph:

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

Blockquotes can be nested (i.e. a blockquote-in-a-blockquote) by
adding additional levels of `>`:

> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

Blockquotes can contain other Markdown elements, including headers, lists,
and code blocks:

> ## This is a header.
>
> 1.  This is the first list item.
> 2.  This is the second list item.
>
> Here's some example code:
>
>     return shell_exec("echo $input | $markdown_script");

Any decent text editor should make email-style quoting easy. For
example, with BBEdit, you can make a selection and choose Increase
Quote Level from the Text menu.

### Lists

Markdown supports ordered (numbered) and unordered (bulleted) lists.

Unordered lists use asterisks, pluses, and hyphens -- interchangably
-- as list markers:

- Red
- Green
- Blue

is equivalent to:

- Red
- Green
- Blue

and:

- Red
- Green
- Blue

Ordered lists use numbers followed by periods:

1.  Bird
2.  McHale
3.  Parish

It's important to note that the actual numbers you use to mark the
list have no effect on the HTML output Markdown produces. The HTML
Markdown produces from the above list is:

If you instead wrote the list in Markdown like this:

1.  Bird
1.  McHale
1.  Parish

or even:

3. Bird
1. McHale
1. Parish

you'd get the exact same HTML output. The point is, if you want to,
you can use ordinal numbers in your ordered Markdown lists, so that
the numbers in your source match the numbers in your published HTML.
But if you want to be lazy, you don't have to.

To make lists look nice, you can wrap items with hanging indents:

- Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
  Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
  viverra nec, fringilla in, laoreet vitae, risus.
- Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
  Suspendisse id sem consectetuer libero luctus adipiscing.

But if you want to be lazy, you don't have to:

- Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
  Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
  viverra nec, fringilla in, laoreet vitae, risus.
- Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
  Suspendisse id sem consectetuer libero luctus adipiscing.

List items may consist of multiple paragraphs. Each subsequent
paragraph in a list item must be indented by either 4 spaces
or one tab:

1.  This is a list item with two paragraphs. Lorem ipsum dolor
    sit amet, consectetuer adipiscing elit. Aliquam hendrerit
    mi posuere lectus.

Vestibulum enim wisi, viverra nec, fringilla in, laoreet
vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
sit amet velit.

2.  Suspendisse id sem consectetuer libero luctus adipiscing.

It looks nice if you indent every line of the subsequent
paragraphs, but here again, Markdown will allow you to be
lazy:

- This is a list item with two paragraphs.

This is the second paragraph in the list item. You're

only required to indent the first line. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit.

- Another item in the same list.

To put a blockquote within a list item, the blockquote's `>`
delimiters need to be indented:

- A list item with a blockquote:

> This is a blockquote
> inside a list item.

To put a code block within a list item, the code block needs
to be indented _twice_ -- 8 spaces or two tabs:

- A list item with a code block:

    <code goes here>

### Code Blocks

Pre-formatted code blocks are used for writing about programming or
markup source code. Rather than forming normal paragraphs, the lines
of a code block are interpreted literally. Markdown wraps a code block
in both `<pre>` and `<code>` tags.

To produce a code block in Markdown, simply indent every line of the
block by at least 4 spaces or 1 tab.

This is a normal paragraph:

This is a code block.

Here is an example of AppleScript:

tell application "Foo"
beep
end tell

A code block continues until it reaches a line that is not indented
(or the end of the article).

Within a code block, ampersands (`&`) and angle brackets (`<` and `>`)
are automatically converted into HTML entities. This makes it very
easy to include example HTML source code using Markdown -- just paste
it and indent it, and Markdown will handle the hassle of encoding the
ampersands and angle brackets. For example, this:

  <div class="footer">
      &copy; 2004 Foo Corporation
  </div>

Regular Markdown syntax is not processed within code blocks. E.g.,
asterisks are just literal asterisks within a code block. This means
it's also easy to use Markdown to write about Markdown's own syntax.

```
tell application "Foo"
  beep
end tell
```

## Span Elements

### Links

Markdown supports two style of links: _inline_ and _reference_.

In both styles, the link text is delimited by [square brackets].

To create an inline link, use a set of regular parentheses immediately
after the link text's closing square bracket. Inside the parentheses,
put the URL where you want the link to point, along with an _optional_
title for the link, surrounded in quotes. For example:

This is [an example](http://example.com/) inline link.

[This link](http://example.net/) has no title attribute.

### Emphasis

Markdown treats asterisks (`*`) and underscores (`_`) as indicators of
emphasis. Text wrapped with one `*` or `_` will be wrapped with an
HTML `<em>` tag; double `*`'s or `_`'s will be wrapped with an HTML
`<strong>` tag. E.g., this input:

_single asterisks_

_single underscores_

**double asterisks**

**double underscores**

### Code

To indicate a span of code, wrap it with backtick quotes (`` ` ``).
Unlike a pre-formatted code block, a code span indicates code within a
normal paragraph. For example:

Use the `printf()` function.
