document.getElementById("yr").textContent = new Date().getFullYear();

const nameEl = document.getElementById("name");
const finalName = nameEl.textContent;
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const glyphs = "!<>-_\\/[]{}=+*^?#";
    let frame = 0;
    const tick = setInterval(() => {
        nameEl.textContent = [...finalName]
            .map((ch, i) => (i < frame / 3 ? ch : glyphs[Math.floor(Math.random() * glyphs.length)]))
            .join("");
        if (++frame > finalName.length * 3) {
            clearInterval(tick);
            nameEl.textContent = finalName;
        }
    }, 75);
}
