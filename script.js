const DATA = {
    name: "Gopikrishna",
    about: "Cybersecurity student exploring systems, security & development.\nBuilding things. Learning deeply.",
    skills: ["Systems", "Security", "Development"], // TODO: add concrete skills
    projects: [
        // TODO: replace with real projects
        { name: "coming-soon", desc: "Projects will be listed here.", url: "https://github.com/go3-14" },
    ],
    links: {
        github: "https://github.com/go3-14",
        linkedin: "https://www.linkedin.com/in/gopikrishna-gopakumaran-558706375/",
    },
};

const out = document.getElementById("out");
const form = document.getElementById("form");
const input = document.getElementById("cmd");

function esc(s) {
    return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

function print(html) {
    const d = document.createElement("div");
    d.className = "res";
    d.innerHTML = html;
    out.appendChild(d);
}

function link(url, label) {
    return `<a href="${url}" target="_blank" rel="noopener">${esc(label || url)}</a>`;
}

const commands = {
    help: () => print(
        Object.keys(commands).map((c) => `<span class="k">${c.padEnd(9)}</span>${commands[c].desc}`).join("\n")
    ),
    about: () => print(esc(DATA.about)),
    whoami: () => print(esc(DATA.name.toLowerCase())),
    skills: () => print(DATA.skills.map((s) => "- " + esc(s)).join("\n")),
    projects: () => print(
        DATA.projects.map((p) => `<span class="k">${esc(p.name)}</span> ${esc(p.desc)}\n  ${link(p.url)}`).join("\n")
    ),
    links: () => print(Object.entries(DATA.links).map(([k, v]) => `<span class="k">${k.padEnd(9)}</span>${link(v)}`).join("\n")),
    contact: () => commands.links(),
    theme: () => {
        const root = document.documentElement;
        const dark = root.dataset.theme
            ? root.dataset.theme === "dark"
            : !matchMedia("(prefers-color-scheme: light)").matches;
        const next = dark ? "light" : "dark";
        root.dataset.theme = next;
        try { localStorage.setItem("theme", next); } catch (_) {}
        print(`<span class="dim">theme: ${next}</span>`);
    },
    clear: () => { out.innerHTML = ""; },
};

commands.theme.desc = "toggle dark/light";

commands.help.desc = "list commands";
commands.about.desc = "who I am";
commands.whoami.desc = "print user";
commands.skills.desc = "what I work with";
commands.projects.desc = "things I've built";
commands.links.desc = "find me elsewhere";
commands.contact.desc = "alias for links";
commands.clear.desc = "clear the screen";

function run(raw) {
    const line = raw.trim();
    const echo = document.createElement("div");
    echo.className = "cmd-line";
    echo.innerHTML = `<b>$</b> ${esc(line)}`;
    out.appendChild(echo);
    if (line) {
        const name = line.split(/\s+/)[0].toLowerCase();
        if (Object.prototype.hasOwnProperty.call(commands, name)) commands[name]();
        else print(`<span class="dim">command not found: ${esc(name)}. try</span> <span class="k">help</span>`);
    }
    out.parentElement.scrollTop = out.parentElement.scrollHeight;
}

const history = [];
let hpos = 0;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (v && history[history.length - 1] !== v) history.push(v);
    hpos = history.length;
    run(input.value);
    input.value = "";
});

input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && history.length) {
        e.preventDefault();
        hpos = Math.max(0, hpos - 1);
        input.value = history[hpos];
    } else if (e.key === "ArrowDown") {
        e.preventDefault();
        hpos = Math.min(history.length, hpos + 1);
        input.value = history[hpos] || "";
    } else if (e.key === "Tab") {
        e.preventDefault();
        const hits = Object.keys(commands).filter((c) => c.startsWith(input.value.trim().toLowerCase()));
        if (hits.length === 1) input.value = hits[0];
    } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        commands.clear();
    }
});

const chips = document.getElementById("chips");
["help", "about", "skills", "projects", "links", "theme", "clear"].forEach((c) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = c;
    b.addEventListener("click", () => { run(c); input.focus({ preventScroll: true }); });
    chips.appendChild(b);
});

try {
    const saved = localStorage.getItem("theme");
    if (saved) document.documentElement.dataset.theme = saved;
} catch (_) {}

document.getElementById("term").hidden = false;
document.getElementById("term").addEventListener("click", () => {
    if (!getSelection().toString()) input.focus({ preventScroll: true });
});
document.getElementById("yr").textContent = new Date().getFullYear();
print(`<span class="dim">Welcome. Type</span> <span class="k">help</span> <span class="dim">to get started.</span>`);
commands.help();
