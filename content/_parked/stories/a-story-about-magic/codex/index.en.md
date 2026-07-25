---
title: "A Story About 'Magic'"
---

Some years ago, I (GLS)[^](annotations/gls) was snooping around in the cabinets that housed the MIT AI Lab's PDP-10, and noticed a little switch glued to the frame of one cabinet. It was obviously a homebrew job, added by one of the lab's hardware hackers (no one knows who).

You don't touch an unknown switch on a computer without knowing what it does, because you might crash the computer. The switch was labeled in a most unhelpful way. It had two positions, and scrawled in pencil on the metal switch body were the words 'magic' and 'more magic'. The switch was in the 'more magic' position.

I called another hacker over to look at it. He had never seen the switch before either. Closer examination revealed that the switch had only one wire running to it! The other end of the wire did disappear into the maze of wires inside the computer, but it's a basic fact of electricity that a switch can't do anything unless there are two wires connected to it. This switch had a wire connected on one side and no wire on its other side.

It was clear that this switch was someone's idea of a silly joke. Convinced by our reasoning that the switch was inoperative, we flipped it. The computer instantly crashed.

Imagine our utter astonishment. We wrote it off as coincidence, but nevertheless restored the switch to the 'more magic' position before reviving the computer.

A year later, I told this story to yet another hacker, David Moon as I recall. He clearly doubted my sanity, or suspected me of a supernatural belief in the power of this switch, or perhaps thought I was fooling him with a bogus saga. To prove it to him, I showed him the very switch, still glued to the cabinet frame with only one wire connected to it, still in the 'more magic' position. We scrutinized the switch and its lone connection, and found that the other end of the wire, though connected to the computer wiring, was connected to a ground pin. That clearly made the switch doubly useless: not only was it electrically nonoperative, but it was connected to a place that couldn't affect anything anyway. So we flipped the switch.

The computer promptly crashed.

This time we ran for Richard Greenblatt, a long-time MIT hacker, who was close at hand. He had never noticed the switch before, either. He inspected it, concluded it was useless, got some diagonal cutters and [_dike_](https://www.catb.org/jargon/html/D/dike.html)d it out. We then revived the computer and it has run fine ever since.

We still don't know how the switch crashed the machine. There is a theory that some circuit near the ground pin was marginal, and flipping the switch changed the electrical capacitance enough to upset the circuit as millionth-of-a-second pulses went through it. But we'll never know for sure; all we can really say is that the switch was [_magic_](https://www.catb.org/jargon/html/M/magic.html).

I still have that switch in my basement. Maybe I'm silly, but I usually keep it set on 'more magic'.

---

1994: Another explanation of this story has since been offered. Note that the switch body was metal. Suppose that the non-connected side of the switch was connected to the switch body (usually the body is connected to a separate earth lug, but there are exceptions). The body is connected to the computer case, which is, presumably, grounded. Now the circuit ground within the machine isn't necessarily at the same potential as the case ground, so flipping the switch connected the circuit ground to the case ground, causing a voltage drop/jump which reset the machine. This was probably discovered by someone who found out the hard way that there was a potential difference between the two, and who then wired in the switch as a joke.
