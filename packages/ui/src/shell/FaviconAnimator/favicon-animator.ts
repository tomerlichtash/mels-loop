const TOTAL_FRAMES = 36;

export interface FaviconAnimatorOptions {
  durationSeconds: number;
  width: number;
  height: number;
  image: string;
}

export function animateFavicon(opts: FaviconAnimatorOptions): () => void {
  let aborted = false;

  const isDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

  const animLink = document.createElement("link");
  animLink.rel = "icon";
  animLink.setAttribute("data-animator", "");
  document.head.appendChild(animLink);

  const img = new Image();
  img.onload = () => {
    if (aborted) {
      animLink.remove();
      return;
    }

    // Pre-render all frames upfront so playback is just swapping cached data URLs.
    const frames: string[] = [];
    const canvas = document.createElement("canvas");
    canvas.width = opts.width;
    canvas.height = opts.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      animLink.remove();
      return;
    }

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      ctx.clearRect(0, 0, opts.width, opts.height);
      ctx.save();

      if (isDark) {
        ctx.filter = "invert(100%)";
      }

      const angle = ((2 * Math.PI) / TOTAL_FRAMES) * i;
      ctx.translate(opts.width * 0.5, opts.height * 0.5);
      ctx.rotate(angle);
      ctx.translate(opts.width * -0.5, opts.height * -0.5);
      ctx.drawImage(img, 0, 0, opts.width, opts.height);
      ctx.restore();

      frames.push(canvas.toDataURL("image/png"));
    }

    // Play back using requestAnimationFrame for smooth timing.
    const duration = opts.durationSeconds * 1000;
    const startTime = performance.now();

    function tick(now: number) {
      if (aborted) {
        animLink.remove();
        return;
      }

      const elapsed = now - startTime;
      if (elapsed >= duration) {
        // Animation complete — remove overlay so static favicon resumes.
        animLink.remove();
        return;
      }

      const progress = elapsed / duration;
      const frameIndex = Math.floor(progress * TOTAL_FRAMES) % TOTAL_FRAMES;
      animLink.href = frames[frameIndex];
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  };

  img.onerror = () => {
    animLink.remove();
  };
  img.src = opts.image;

  return () => {
    aborted = true;
    animLink.remove();
  };
}
