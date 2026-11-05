document.getElementById("yr").textContent = new Date().getFullYear();

// Always plays, for everyone: one column revealed every 75ms (~3s). Ignores reduced-motion on purpose.
const art = document.getElementById("art");
const finalArt = art.textContent;
const glyphs = "!<>-_\\/[]{}=+*^?#";
const cols = Math.max(...finalArt.split("\n").map((l) => l.length));
let frame = 0;
const tick = setInterval(() => {
    const reveal = frame;
    art.textContent = finalArt
        .split("\n")
        .map((line) =>
            [...line].map((ch, i) => (ch === " " || i < reveal ? ch : glyphs[Math.floor(Math.random() * glyphs.length)])).join("")
        )
        .join("\n");
    if (++frame > cols) {
        clearInterval(tick);
        art.textContent = finalArt;
    }
}, 75);
