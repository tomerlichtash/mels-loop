---
title: "Preface to The Story of Mel"
author: "(David *)Frenkiel"
date: Wed Apr 7 2022 13:45 GMT+0300
---



ever since tsom apppeared on my vt100 terminal, it became part oe my social arsenal. In each new project or company, sharing the story with the developers that loved computers and computer culture guaranteed a warm welcome. When the story was met with indiefference or a blank stare, I dialed down my expectations.

Naturally, I counted mysele among the privileged minority that really "got it". Not only did I understand the story, I could describe Mel's hack in detail, with no need for a refresher, using 'computer guy' words like register, bit and overflow.

When Tomer began his monumental translation and documentation project, I was proud to support him in the role of that 'computer guy'. Ironically enough, it was only during my work on this project, some 30 years after my first reading of the story, that I came to realize I had never really understood it.

In "The Story of Mel", the author describes the moment in which he figured out Mel's hack: "When the light went on it nearly blinded me.". He follows with the now-mythological description of the overflow that modified the code, created a JUMP instruction and allowed the program to magically leap out of an endless loop.
While proofing Tomer's annotations for this part of the story, I had my own "Mel moment", alas in a less gratifying way. When the light went on, I could see how sloppy my reading had been all these years. The hack, as described in The Story of Mel, was either impossible or very unlikely.

The vital clue came when I noticed
the index register bit,
the bit that lay between the address
and the operation code in the instruction word,
was turned on

We start with a partial layout of the machine instruction, with a span of bits that represents the data address (A), an index register bit (X) and a span that represents the operation code (O). Something like
    OOOXAAA

(the number of bits in each span does not matter)
We know that the A span is in the lower bits, because Nather later describes the overflow that Mel hijacked:

Instead, he would pull the instruction into a machine register,
add one to its address,
and store it back
...
He had located the data he was working on
near the top of memory —
the largest locations the instructions could address —
so, after the last datum was handled,
incrementing the instruction address
would make it overflow.
The carry would add one to the
operation code, changing it to the next one in the instruction set:

If incrementing the address span overflowed into the opcode span, then the bit order between them is established.
If the index register bit (X) is indeed between the two and turned on, then overflowing the (A) span will carry through X into the (O) span, incrementing it by one. The result:

a jump instruction.
Sure enough, the next program instruction was
in address location zero,
and the program went happily on its way.

All this is possible, but we still need to understand where the JUMP instruction takes its operand from. The numbers have to be set up so that address 0 will be ready, according to the instruction's protocol. It seemed that the number would have to come either from a register - but then Nather would have spotted the code that set up this register - or from the instruction itself. It couldn't take its operand from _address_ 0, because by Nather's own account, the program _jumped_ to address 0, which had to contain valid code. 



Or would it?


when the light went on, it tore my eyes open. I could see that I never really understood the hack. My grasp of the flow was like that of a math student who "proves" an equation by developing both sides and sticking an equal sign in the middle.
At first, the problem seemd to reside in my understanding of Ed Nather's text. However, it didn't take long for us to realize that the data flow, as described in tsom, was either impossible or highly unlikely. The bits didn't add up and the overflow mechanism would have to be rather awkward, to support that single index bit in the middle of the instruction.
Searching the web, we found two posts that addressed
