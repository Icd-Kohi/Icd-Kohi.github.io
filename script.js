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
<i> Expected graduation: July 2028
Technical Degree in Electronics
<i> FAETEC

#### LANGUAGES
Portuguese: Native
English: C1 - Advanced (Speaking, Reading, Writing)`;

const englishWebResume = `LUAN SILVA AGUIAR
Software Developer | Java Backend | Spring Boot | Angular
Email: kohee.swe@gmail.com
GitHub: https://github.com/Icd-Kohi

#### PROFESSIONAL SUMMARY

Computer Science student with hands-on experience in backend system development using Java (Spring Boot) and web applications with Angular.
Worked on the creation of real-world solutions with direct impact on business operations, including order automation and API integration. 
Strong knowledge of Linux, relational databases, and scalable application development. 
Seeking an opportunity to apply and expand my skills in software engineering.

#### TECHNICAL SKILLS
Languages:
Java, C, C++, C#, Rust, Python, JavaScript, TypeScript
Backend & Frameworks:
Spring Boot, Quarkus, JavaFX, JUnit, Node.js, REST APIs
Frontend:
Angular, HTML5, CSS3, Sass
Databases:
MySQL, PostgreSQL
Tools & Platforms:
Git, GitHub Actions, Postman, Linux, Docker, AWS, Office 365
Other:
Automation scripts, CLI applications, data structures

#### PROJECTS

Dynamic Price Monitor
• CLI application using asynchronous JavaScript.
• Implemented periodic requests to monitor product prices via API.

Other Projects:
• Windows window-pinning tool (Java).
• CLI tools for file manipulation and I/O (Java).
• Multi-threaded HTTP server (Rust).
• Interpreter for a simple programming language (Java).

#### EDUCATION

Bachelor’s Degree in Computer Science
<i> State University of Rio de Janeiro (UERJ)
<i> Expected graduation: July 2028

Technical Degree in Electronics
<i> FAETEC

#### LANGUAGES

Portuguese: Native
English: C1 – Advanced (Speaking, Reading, Writing)`;

const cv = document.querySelector('#cv');
const langButton = document.querySelector('#lang');

let portugueseResume = '';
let currentLanguage = 'pt';

// text to link 
const linkify = (text) => {
    const fragment = document.createDocumentFragment();
    const matcher = /(https?:\/\/\S+)|([\w.+-]+@[\w.-]+\.\w+)/g;
    let lastIndex = 0;
    let match;

    while ((match = matcher.exec(text)) !== null) {
        fragment.append(document.createTextNode(text.slice(lastIndex, match.index)));

        const value = match[0];
        const link = document.createElement('a');
        link.href = value.includes('@') ? `mailto:${value}` : value;
        link.textContent = value;
        fragment.append(link);

        lastIndex = matcher.lastIndex;
    }

    fragment.append(document.createTextNode(text.slice(lastIndex)));
    return fragment;
};

const appendText = (parent, tag, text, className = '') => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.append(linkify(text));
    parent.append(element);
    return element;
};

const normalizeHeading = (line) => line.replace(/^#+\s*/, '').trim();

const renderLines = (parent, lines) => {
    let list = null;

    lines.forEach((line) => {
        const text = line.trim();
        if (!text) return;

        const italic = text.match(/^<i>\s+/);
        if (italic) {
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

const renderResume = (source) => {
    const lines = source.split(/\r?\n/);
    const headerLines = [];
    const sections = [];
    let section = null;

    lines.forEach((line) => {
        if (/^#{4,6}\s+/.test(line)) {
            section = { title: normalizeHeading(line), lines: [] };
            sections.push(section);
            return;
        }
        if (section) {
            section.lines.push(line);
        } else {
            headerLines.push(line);
        }
    });

    cv.textContent = '';
    appendText(cv, 'h1', headerLines[0] || '');
    appendText(cv, 'p', headerLines[1] || '', 'subtitle');

    const contact = document.createElement('div');
    contact.className = 'contact';
    headerLines.slice(2).filter(Boolean).forEach((line) => appendText(contact, 'p', line));
    cv.append(contact);

    sections.forEach(({ title, lines: sectionLines }) => {
        const element = document.createElement('section');
        appendText(element, 'h2', title);
        renderLines(element, sectionLines);
        cv.append(element);
    });
};

const showCurrentResume = () => {

    renderResume(currentLanguage === 'pt' ? portugueseResume : englishResume);

    langButton.textContent = currentLanguage === 'pt' ? '[ english ]' : '[ pt-BR ]';
    document.documentElement.lang = currentLanguage === 'pt' ? 'pt-BR' : 'en';
};

fetch('curriculo-web.md')
    .then((response) => {
        if (!response.ok) throw new Error('Could not load curriculo.md');
        return response.text();
    })
    .then((text) => {
        portugueseResume = text;
        showCurrentResume();
    })
    .catch(() => {
        cv.textContent = 'could not load curriculo.md';
    });

langButton.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    showCurrentResume();
});
