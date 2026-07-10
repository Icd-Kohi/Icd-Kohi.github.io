const englishResume = `LUAN SILVA AGUIAR
Computer Science Student | C, C++, Java
Email: kohee.swe@gmail.com
GitHub: https://github.com/Icd-Kohi

#### PROFESSIONAL SUMMARY
Computer Science student with technical training in Electronics, experienced in automation development and systems integration.
Knowledge of programming (C, C++, Java), performatic low level systems and interest in industrial automation. Practical experience with embedded systems. Worked on systems that automate operational processes, producing significant efficiency gains.
Seeking an opportunity to apply and develop technology solutions for industry and innovation.

#### TECHNICAL SKILLS
Programming:
C, C++, Java, JavaScript, Python
Automation & Systems:
Process automation, API integration, automated scripts
Engineering Fundamentals:
Digital logic, basic electronics, computer systems
Backend:
Spring Boot, Node.js, REST APIs
Tools:
Linux, Git, GitHub Actions, Postman, Docker, AWS
Databases:
MySQL, PostgreSQL

#### PROJECTS

###### Technical Projects
Proximity detection with sound alert
• Developed a system using a proximity sensor integrated with Arduino Uno for real-time object detection.
• Applied embedded electronics, signal processing, and basic control concepts.
Technologies: C, Arduino Uno, proximity sensor, actuators (buzzer)
• Multi-threaded HTTP server (Rust)
- Implemented concurrency and process control.
• CLI tools and data handling
- Scripts for automating repetitive tasks.

#### EDUCATION
Bachelor's Degree in Computer Science
<i> Rio de Janeiro State University (UERJ)
<i> Expected graduation: Dec 2028
Technical Degree in Electronics

#### LANGUAGES
Portuguese: Native
English: C1 - Advanced (Speaking, Reading, Writing)`;

const englishWebResume = `LUAN SILVA AGUIAR
Computer Science Student | Full-stack Developer | Spring Boot | Angular
Email: kohee.swe@gmail.com
GitHub: https://github.com/Icd-Kohi

#### PROFESSIONAL SUMMARY

Computer Science student with hands-on experience in full-stack development using Java and Angular.
Worked on the creation of real-world solutions with direct impact on business operations, including process automation and API development and integration. 
Knowledge in Linux, relational databases, REST APIs, Docker and Backend development. 

#### TECHNICAL SKILLS
Languages:
Java, C, C++, C#, Rust, Python, JavaScript, TypeScript
Backend & Frameworks:
Spring Boot, JUnit, Node.js
Frontend:
Angular, HTML5, CSS3, Sass
Databases:
MySQL, PostgreSQL
Tools & Platforms:
Git, GitHub Actions, Postman, Linux, Docker, AWS
Other:
Automation scripts, CLI applications, data structures, AGILE, REST APIs

#### PROJECTS
Budget Generator:
<i> https://github.com/Icd-Kohi/service-budget
• Developed a full-stack application for creating, editing, and downloading budget estimates as PDFs, using Java/Spring Boot backend, Angular frontend, JWT authentication, PostgreSQL, and HTTPS integration with Caddy server. REST APIs implementation, relational persistence, authenticatoin, frontend and backend integration.
<i> Techs: Java, Spring Boot, Angular, PostgreSQL, JWT, REST APIs, Caddy, Git.

Dynamic Price Monitor:
• CLI application using asynchronous JavaScript.
• Implemented periodic requests to monitor product prices via API.
<i> Techs: JavaScript, APIs, Async programming, CLI.

Complementary Projects:
• Multi-thread HTTP server (Rust), Interpreter for a custom programming language (Java), CLI tools and automations.

#### EDUCATION

Bachelor’s Degree in Computer Science
<i> State University of Rio de Janeiro (UERJ)
<i> Expected graduation: Dec 2028

Technical Degree in Electronics
<i> Completed.

#### LANGUAGES

Portuguese: Native
English: C1 – Advanced (Speaking, Reading, Writing)`;

const cv = document.querySelector('#cv');
const langButton = document.querySelector('#lang');

let portugueseResume = '';
let currentLanguage = '';

const treatHeaders = (line) => line.replace(/^#+\s*/, '').trim();

// text to link 

function linkify(text) {
    const fragment = document.createDocumentFragment();
    const regex = /https?:\/\/\S+|[\w.+-]+@[\w.-]+\.\w+/g;

    let last = 0;

    for (const match of text.matchAll(regex)) {
        const value = match[0];

        fragment.append(text.slice(last, match.index));

        const link = document.createElement("a");
        link.href = value.startsWith("http") ? value : `mailto:${value}`;
        link.textContent = value;

        fragment.append(link);

        last = match.index + value.length;
    }

    fragment.append(text.slice(last));
    return fragment;
};


function appendText(parent, tag, text, className = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.append(linkify(text));
    parent.append(element);
    return element;
};


function renderLines (parent, lines){
    let list = null;

    lines.forEach((line) => {
        const text = line.trim();
        if (!text) return;

        if (/^<i>\s+/.test(text)) {
            const italicEl= document.createElement('i');

            italicEl.className = 'italic-size';
            italicEl.style = 'font-size:12px';

            appendText(italicEl, null, text.replace(/^<i>\s+/, ''));

            parent.append(italicEl);
            parent.append(document.createElement('br'));
            return;
        }

        if (/^[•-]\s+/.test(text)) {
            if (!list) {
                list = document.createElement('ul');
                parent.append(list);
            }
            appendText(list, 'li', text.replace(/^[•-]\s+/, ''));
            return;
        }

        list = null;
        const labelMatch = text.match(/^([^:]+):\s*(.+)?$/);
        if (labelMatch) {
            const paragraph = document.createElement('p');
            const label = document.createElement('span');
            label.className = 'label';
            label.textContent = `${labelMatch[1]}: `;
            paragraph.append(label, linkify(labelMatch[2] || ''));
            parent.append(paragraph);
            return;
        }


        appendText(parent, 'p', text);
    });
};

function renderResume (source) {
    const [headerBlock, ...sectionBlocks] = source.split(/\r?\n(?=#{4,6}\s+)/);
    const [name = "", subtitle = "", ...contacts] = headerBlock.split(/\r?\n/);

    cv.replaceChildren();

    appendText(cv, "h1", name);
    appendText(cv, "p", subtitle, "subtitle");

    const contact = document.createElement("div");
    contact.className = "contact";

    contacts
        .filter(Boolean)
        .forEach((line) => appendText(contact, "p", line));

    cv.append(contact);

    sectionBlocks.forEach((block) => {
        const [header, ...lines] = block.split(/\r?\n/);

        const section = document.createElement("section");
        appendText(section, "h2", treatHeaders(header));
        renderLines(section, lines);

        cv.append(section);
    });
};


function showCurrentResume(){
    // ------------------------------------------v`englishResume` when Electronics, or `englishWebResume` when Web.
    renderResume(currentLanguage === 'pt' ? portugueseResume : englishWebResume);
    langButton.textContent = currentLanguage === 'pt' ? '[ english ]' : '[ pt-BR ]';
    document.documentElement.lang = currentLanguage === 'pt' ? 'pt-BR' : 'en';
};

// 'curriculo.md' when Electronics, 'curriculo-web.md' when web
fetch('curriculo-web.md')
    .then((response) => {
        if (!response.ok) throw new Error('Could not load curriculo.md');
        return response.text();
    })
    .then((text) => {
        portugueseResume = text;
        showCurrentResume();
    })

langButton.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    showCurrentResume();
});
