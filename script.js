document.getElementById("yr").textContent = new Date().getFullYear();

const art = document.getElementById("art");
const finalArt = art.textContent;
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const glyphs = "!<>-_\\/[]{}=+*^?#";
const cols = Math.max(...finalArt.split("\n").map((l) => l.length));
// Full effect: reveal one column every 75ms (~3s). With reduced motion: a short ~0.5s version.
const frames = calm ? 8 : cols;
const step = calm ? 60 : 75;
let frame = 0;
const tick = setInterval(() => {
    const reveal = (frame / frames) * cols;
    art.textContent = finalArt
        .split("\n")
        .map((line) =>
            [...line].map((ch, i) => (ch === " " || i < reveal ? ch : glyphs[Math.floor(Math.random() * glyphs.length)])).join("")
        )
        .join("\n");
    if (++frame > frames) {
        clearInterval(tick);
        art.textContent = finalArt;
    }
}, step);
