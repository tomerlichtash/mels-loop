---
title: "Preface to The Story of Mel"
author: "(David *)Frenkiel"
date: Wed Apr 7 2022 13:45 GMT+0300
---


"When the light went on it nearly blinded me". This line, in The Story of Mel, precedes the author's description of Mel's hack, the almost criminally resourceful implementation of a finite loop with no exit condition. These words never fails to give me goose bumps. They constitute a rare account of a real "Ah!" moment, where a seemingly random collection of facts suddenly fall into a coherent logical structure.

Intellectual satisfaction notwithstanding, I suspect that a considerable part of my pleasure has been derived from the sense of belonging to an elite handful that *really* got it. Sure, many developers loved the story and cherished it as part of their digital heritage, but I could go into detail and describe the hack without a refresher. I knew about index register bit did, the trick of storing the modified instruction in its original location and the magical appearance of a JUMP instruction in the right place, at the right time.

It was only while proofing Tomer's annotations to the story, that I started getting annoying vibes, around that self-image of a *real* computer guy, who knows all about registers, addressing modes and overflows. Those vibes soon evolved into my own inverse Mel moment. Instead of a light shining suddenly and brightly, I experienced a slow dimming of the clear picture that I had of Mel's hack. Rather than being blinded, the darkness allowed me to see just how sloppy my reading had been.


Let's briefly go over Ed Nather's now-mythological description of the overflow that modified the code, created a JUMP instruction and allowed the program to magically leap out of an endless loop. 


    The vital clue came when I noticed
    the index register bit,
    the bit that lay between the address
    and the operation code in the instruction word,
    was turned on

We start with a partial layout of the machine instruction, with a span of bits that represents the data address (A), an index register bit (X) and a span that represents the operation code (C). Something like
         AAAXCCC
    MSB <--------> LSB

The number of bits in each span does not matter. The diagrams here use 1 bit for the index register flag and 3 bits for other components.)

This layout is missing a part described earlier in the story:

    The new computer had a one-plus-one
    addressing scheme
    in which each machine instruction,
    in addition to the operation code
    and the address of the needed operand,
    had a second address that indicated where, on the revolving drum,
    the next instruction was located.

Thus, the bit layout of the instruction needs an additional component for the next address (N). Its location doesn't affect the hack, as described in the story, but let's place it on the least significant bits, to be on the safe side:

         AAAXCCCNNN
    MSB <----------> LSB
   
    
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

All this is possible, but we still don't know where the JUMP instruction takes its operand from. We know that this operand's value must be 0 and it should be ready , according to the instruction's protocol. It seemed that the number would have to come either from a register - but then Nather would have spotted the code that set up this register - or from the instruction itself. It couldn't take its operand from _address_ 0, because by Nather's own account, the program _jumped_ to address 0, which had to contain valid code. 



Or would it?




Somewhat ironically, it was during the proofing of Tomer's annotations for this part of the story, that I had an inverse "Mel moment" of my own. The light didn't go on abruptly, but rather dimmed slowly for several hours, at the end of which , alas in a less gratifying way. When the light went on, I could see how sloppy my reading had been all these years. The hack, as described in The Story of Mel, was either impossible or very unlikely.


ever since tsom apppeared on my vt100 terminal, it became part of my social arsenal. In each new project or company, sharing the story with the developers that loved computers and computer culture guaranteed a warm welcome. When the story was met with indifference or a blank stare, I dialed down my expectations.

Naturally, I counted myself among the privileged minority that really "got it". Not only did I understand the story, I could describe Mel's hack in detail, with no need for a refresher, using 'computer guy' words like register, bit and overflow.

When Tomer began his monumental translation and documentation project, I was proud to support him in the role of that 'computer guy'. Ironically enough, it was only during my work on this project, some 30 years after my first reading of the story, that I came to realize I had never really understood it.

In "The Story of Mel", the author describes the moment in which he figured out Mel's hack: "When the light went on it nearly blinded me.". He follows with the now-mythological description of the overflow that modified the code, created a JUMP instruction and allowed the program to magically leap out of an endless loop. Somewhat ironically, it was during the proofing of Tomer's annotations for this part of the story, that I had an inverse "Mel moment" of my own. The light didn't go on abruptly, but rather dimmed slowly for several hours, at the end of which , alas in a less gratifying way. When the light went on, I could see how sloppy my reading had been all these years. The hack, as described in The Story of Mel, was either impossible or very unlikely.

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
