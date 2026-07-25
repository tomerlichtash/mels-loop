# Documentation

**Everything in `architecture/` is living.** If a statement here contradicts the
code, the code wins and the document is a bug — fix it in the same commit as the
change that outdated it.

These chapters deliberately **point at code rather than restate it**. That is the
lesson from `design-log/`, the previous set of planning documents: they described
the design in enough detail to drift from it, and by early 2026 they were
confidently instructing readers to install a UI library the project had never
used. Anything you can read from the source belongs in the source. What belongs
here is the part the code cannot tell you — why a thing is shaped the way it is,
and what breaks if you change it.

Start with [`architecture/00-index.md`](./architecture/00-index.md), which maps
what you are doing to the chapter worth reading first.
