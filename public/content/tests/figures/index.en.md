---
title: "Test page tst2"
author: "Bot"
date: Sat Jun 25 2022 21:07:06 GMT+0300 (Israel Daylight Time)

figures: 
   base: -2
   auto: true
   template1: "Look! Fig. %index%"

---

<!-- Begin figure -->
<figure id="quote1">
<blockQuote data-parse-mode="verse" onclick="alert('click')" data-rabak="not">
This is what verse mode looks like:
The fool on the hill
ringing the bell
and sitting still
</blockQuote>
<caption>Caption Element for figure %index%</caption>
</figure>

<figure caption="table %index%">
<table data-type="bit-layout">
<tr>
<td>MSB<</td>
<th>X</th>
<th>N</th>
<th>N</th>
<th>N</th>
<th>A</th>
<th>A</th>
<th>A</th>
<th>C</th>
<th>C</th>
<th>C</th>
<td>>LSB</td>
</tr>
<tr>
<td></td>
<td>Index</td>
<td colSpan="3">Next</td>
<td colSpan="3">Data</td>
<td colSpan="3">Opcode</td>
<td></td>
</tr>
</table>
</figure>

<figure>

>BlockQuote in MD

<caption>
<strong>Bold fig %index%</strong>
<code>Pre fig %index%</code>
<sup>Sup fig %index%</sup>
</caption>
</figure>

<figure>

![RPC 4000 Instruction format](https://res.cloudinary.com/dcajl1s6a/image/upload/v1654892829/mels-hack/RPC_4000_Instruction_ypjaii.png)

</figure>
