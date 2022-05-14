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

We start with a partial layout of the machine instruction, with

Also, where did the JUMP instruction take its operand from? 



when the light went on, it tore my eyes open. I could see that I never really understood the hack. My grasp of the flow was like that of a math student who "proves" an equation by developing both sides and sticking an equal sign in the middle.
At first, the problem seemd to reside in my understanding of Ed Nather's text. However, it didn't take long for us to realize that the data flow, as described in tsom, was either impossible or highly unlikely. The bits didn't add up and the overflow mechanism would have to be rather awkward, to support that single index bit in the middle of the instruction.
Searching the web, we found two posts that addressed
