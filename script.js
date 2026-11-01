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
    clear: () => { out.innerHTML = ""; },
};

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

form.addEventListener("submit", (e) => {
    e.preventDefault();
    run(input.value);
    input.value = "";
});

document.getElementById("yr").textContent = new Date().getFullYear();
print(`<span class="dim">Welcome. Type</span> <span class="k">help</span> <span class="dim">to get started.</span>`);
commands.help();
