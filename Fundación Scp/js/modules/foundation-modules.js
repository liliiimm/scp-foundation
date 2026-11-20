
/* =====================================================
   SCP FOUNDATION — MODULE DATABASE
   Central controller for all secondary modules
===================================================== */

/* ---------- STORAGE ---------- */

function foundationGetData(key, initialData = []) {
    try {
        const saved = localStorage.getItem("scp_" + key);

        if (saved) {
            return JSON.parse(saved);
        }

        localStorage.setItem("scp_" + key, JSON.stringify(initialData));
        return initialData;

    } catch (error) {
        console.error("Database loading error:", error);
        return initialData;
    }
}

function foundationSaveData(key, data) {
    localStorage.setItem("scp_" + key, JSON.stringify(data));
}

/* ---------- SECURITY / HTML ---------- */

function foundationEscape(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];
    });
}

function foundationDate() {
    return new Date().toISOString().slice(0, 10);
}

function foundationId(prefix) {
    return prefix + "-" + Date.now().toString().slice(-8);
}

/* ---------- MODULE CONFIGURATION ---------- */

const foundationModules = {

    "Research Archives": {
        key: "research",
        code: "RA",
        heading: "RESEARCH ARCHIVES",
        description: "Scientific studies, anomalous observations and classified research documentation.",
        fields: [
            ["code", "RESEARCH ID"],
            ["title", "RESEARCH TITLE"],
            ["classification", "CLASSIFICATION"],
            ["author", "LEAD RESEARCHER"],
            ["date", "DATE"],
            ["summary", "RESEARCH SUMMARY"],
            ["findings", "FINDINGS AND OBSERVATIONS"]
        ],
        initial: [
            {
                code: "RA-001",
                title: "Initial Research Archive",
                classification: "Pending Review",
                author: "Unassigned",
                date: foundationDate(),
                summary: "Initial archive entry. Replace this sample with an actual research record.",
                findings: "No findings have been entered."
            }
        ]
    },

    "Experiment Records": {
        key: "experiments",
        code: "EXP",
        heading: "EXPERIMENT RECORDS",
        description: "Experimental procedures, assigned personnel, results and research conclusions.",
        fields: [
            ["code", "EXPERIMENT ID"],
            ["subject", "TEST SUBJECT"],
            ["title", "EXPERIMENT TITLE"],
            ["lead", "LEAD RESEARCHER"],
            ["date", "DATE"],
            ["status", "EXPERIMENT STATUS"],
            ["objective", "OBJECTIVE"],
            ["procedure", "PROCEDURE"],
            ["results", "RESULTS"]
        ],
        initial: [
            {
                code: "EXP-001",
                subject: "Unassigned",
                title: "Initial Experiment Record",
                lead: "Unassigned",
                date: foundationDate(),
                status: "Pending Approval",
                objective: "No objective has been entered.",
                procedure: "No procedure has been entered.",
                results: "No results have been entered."
            }
        ]
    },

    "Incident Reports": {
        key: "incidents",
        code: "INC",
        heading: "INCIDENT REPORTS",
        description: "Reports of containment breaches, personnel injuries, security events and anomalous activity.",
        fields: [
            ["code", "INCIDENT ID"],
            ["title", "INCIDENT TITLE"],
            ["location", "LOCATION"],
            ["date", "DATE"],
            ["severity", "SEVERITY"],
            ["status", "CURRENT STATUS"],
            ["personnel", "PERSONNEL INVOLVED"],
            ["summary", "INCIDENT DESCRIPTION"],
            ["response", "RESPONSE AND FOLLOW-UP"]
        ],
        initial: [
            {
                code: "INC-001",
                title: "Initial Incident Report",
                location: "Unspecified",
                date: foundationDate(),
                severity: "Unclassified",
                status: "Awaiting Review",
                personnel: "Not specified",
                summary: "Sample report. Replace with an actual incident record.",
                response: "No response details have been entered."
            }
        ]
    },

    "Document Archive": {
        key: "documents",
        code: "DOC",
        heading: "DOCUMENT ARCHIVE",
        description: "Internal memoranda, personnel documentation, administrative files and Foundation records.",
        fields: [
            ["code", "DOCUMENT ID"],
            ["title", "DOCUMENT TITLE"],
            ["category", "DOCUMENT CATEGORY"],
            ["author", "AUTHOR"],
            ["date", "DATE"],
            ["clearance", "REQUIRED CLEARANCE"],
            ["summary", "DOCUMENT CONTENT / SUMMARY"]
        ],
        initial: [
            {
                code: "DOC-001",
                title: "Foundation Internal Memorandum",
                category: "Memorandum",
                author: "Administration",
                date: foundationDate(),
                clearance: "Level 1",
                summary: "Sample document entry. Replace with the actual document content."
            }
        ]
    },

    "Restricted Research Archives": {
        key: "restricted-research",
        code: "RRA",
        heading: "RESTRICTED RESEARCH ARCHIVES",
        description: "Highly restricted scientific records. Access is limited to authorized personnel.",
        fields: [
            ["code", "ARCHIVE ID"],
            ["title", "FILE TITLE"],
            ["author", "LEAD RESEARCHER"],
            ["date", "DATE"],
            ["clearance", "CLEARANCE REQUIRED"],
            ["status", "FILE STATUS"],
            ["summary", "CLASSIFIED SUMMARY"],
            ["notes", "ADDITIONAL NOTES"]
        ],
        initial: [
            {
                code: "RRA-001",
                title: "Restricted Archive Initialization",
                author: "Unassigned",
                date: foundationDate(),
                clearance: "Level 3",
                status: "Restricted",
                summary: "Sample restricted record. Replace with authorized content.",
                notes: "Access subject to Foundation authorization."
            }
        ]
    },

    "Containment Records": {
        key: "containment",
        code: "CON",
        heading: "CONTAINMENT RECORDS",
        description: "Containment procedures, cell assignments, security measures and status reviews.",
        fields: [
            ["code", "CONTAINMENT RECORD ID"],
            ["subject", "ANOMALOUS SUBJECT"],
            ["location", "CONTAINMENT LOCATION"],
            ["status", "CONTAINMENT STATUS"],
            ["risk", "RISK LEVEL"],
            ["review", "LAST REVIEW"],
            ["procedure", "CONTAINMENT PROCEDURE"],
            ["notes", "ADDITIONAL NOTES"]
        ],
        initial: [
            {
                code: "CON-001",
                subject: "Unassigned",
                location: "Unassigned",
                status: "Pending Assignment",
                risk: "Unclassified",
                review: foundationDate(),
                procedure: "No containment procedure has been entered.",
                notes: "Initial sample record."
            }
        ]
    },

    "Security Records": {
        key: "security",
        code: "SEC",
        heading: "SECURITY RECORDS",
        description: "Personnel security files, patrol records, access logs and security observations.",
        fields: [
            ["code", "SECURITY RECORD ID"],
            ["title", "RECORD TITLE"],
            ["officer", "RESPONSIBLE OFFICER"],
            ["date", "DATE"],
            ["location", "LOCATION"],
            ["status", "STATUS"],
            ["summary", "REPORT"],
            ["notes", "ADDITIONAL NOTES"]
        ],
        initial: [
            {
                code: "SEC-001",
                title: "Initial Security Record",
                officer: "Unassigned",
                date: foundationDate(),
                location: "Unspecified",
                status: "Pending Review",
                summary: "Sample security record.",
                notes: "No additional notes."
            }
        ]
    },

    "Security Operations": {
        key: "operations",
        code: "OPS",
        heading: "SECURITY OPERATIONS",
        description: "Operational assignments, security procedures and active Foundation directives.",
        fields: [
            ["code", "OPERATION ID"],
            ["title", "OPERATION NAME"],
            ["sector", "ASSIGNED SECTOR"],
            ["lead", "OPERATION LEADER"],
            ["priority", "PRIORITY"],
            ["status", "OPERATION STATUS"],
            ["objective", "OBJECTIVE"],
            ["instructions", "OPERATIONAL INSTRUCTIONS"]
        ],
        initial: [
            {
                code: "OPS-001",
                title: "Initial Security Directive",
                sector: "Unassigned",
                lead: "Unassigned",
                priority: "Normal",
                status: "Pending",
                objective: "No objective has been entered.",
                instructions: "No instructions have been entered."
            }
        ]
    },

    "Forensic Archives": {
        key: "forensics",
        code: "FOR",
        heading: "FORENSIC ARCHIVES",
        description: "Forensic examinations, case documentation, analysis and investigative findings.",
        fields: [
            ["code", "CASE ID"],
            ["title", "CASE TITLE"],
            ["examiner", "FORENSIC EXAMINER"],
            ["date", "DATE"],
            ["status", "CASE STATUS"],
            ["evidence", "RELATED EVIDENCE"],
            ["findings", "FORENSIC FINDINGS"],
            ["notes", "ADDITIONAL NOTES"]
        ],
        initial: [
            {
                code: "FOR-001",
                title: "Initial Forensic Case",
                examiner: "Unassigned",
                date: foundationDate(),
                status: "Awaiting Examination",
                evidence: "No evidence registered.",
                findings: "No findings entered.",
                notes: "Initial sample record."
            }
        ]
    },

    "Evidence Records": {
        key: "evidence",
        code: "EVD",
        heading: "EVIDENCE RECORDS",
        description: "Evidence registration, chain of custody, storage and examination records.",
        fields: [
            ["code", "EVIDENCE ID"],
            ["title", "EVIDENCE DESCRIPTION"],
            ["case", "RELATED CASE"],
            ["collectedBy", "COLLECTED BY"],
            ["date", "COLLECTION DATE"],
            ["condition", "CURRENT CONDITION"],
            ["location", "STORAGE LOCATION"],
            ["notes", "EVIDENCE NOTES"]
        ],
        initial: [
            {
                code: "EVD-001",
                title: "Initial Evidence Entry",
                case: "Unassigned",
                collectedBy: "Unassigned",
                date: foundationDate(),
                condition: "Unclassified",
                location: "Unassigned",
                notes: "Sample evidence record."
            }
        ]
    }

};

/* ---------- COMMON MODULE RENDERER ---------- */

window.renderFoundationModule = function(moduleName, character, content) {

    const config = foundationModules[moduleName];

    if (!config) {
        content.innerHTML = `
            <div class="foundation-empty">
                <h2>MODULE NOT FOUND</h2>
                <p>The requested database module is unavailable.</p>
            </div>
        `;
        return;
    }

    let records = foundationGetData(config.key, config.initial);

    content.innerHTML = `
        <section class="foundation-module">

            <div class="foundation-module-header">
                <div>
                    <p class="foundation-classification">
                        SCP FOUNDATION // INTERNAL DATABASE
                    </p>

                    <h2>${foundationEscape(config.heading)}</h2>

                    <p>${foundationEscape(config.description)}</p>
                </div>

                <div class="foundation-module-stamp">
                    CLASSIFIED
                </div>
            </div>

            <div class="foundation-module-toolbar">

                <input
                    type="search"
                    id="foundationSearch"
                    placeholder="SEARCH DATABASE..."
                >

                <button type="button" id="foundationAddButton">
                    + NEW RECORD
                </button>

            </div>

            <div class="foundation-module-stats">
                <div>
                    <span>REGISTERED RECORDS</span>
                    <strong id="foundationRecordCount">${records.length}</strong>
                </div>

                <div>
                    <span>DATABASE STATUS</span>
                    <strong>OPERATIONAL</strong>
                </div>

                <div>
                    <span>SESSION USER</span>
                    <strong>${foundationEscape(character.name)}</strong>
                </div>
            </div>

            <div id="foundationRecordForm" class="foundation-form-panel" hidden>
                <h3>NEW DATABASE ENTRY</h3>

                <form id="foundationForm">

                    <div class="foundation-form-grid">

                        ${config.fields.map(field => `
                            <label class="foundation-field">
                                <span>${foundationEscape(field[1])}</span>

                                ${field[0] === "summary" ||
    field[0] === "findings" ||
    field[0] === "procedure" ||
    field[0] === "results" ||
    field[0] === "response" ||
    field[0] === "notes" ||
    field[0] === "instructions" ||
    field[0] === "objective" ||
    field[0] === "instructions"
        ? `<textarea name="${foundationEscape(field[0])}" rows="3" required></textarea>`
        : `<input name="${foundationEscape(field[0])}" type="${field[0] === "date" || field[0] === "review" ? "date" : "text"}" ${field[0] === "date" || field[0] === "review" ? `value="${foundationDate()}"` : ""} required>`
    }
                            </label>
                        `).join("")}

                    </div>

                    <div class="foundation-form-actions">
                        <button type="submit">SAVE RECORD</button>
                        <button type="button" class="foundation-secondary" id="foundationCancel">
                            CANCEL
                        </button>
                    </div>

                </form>
            </div>

            <div id="foundationRecordDetail" class="foundation-detail-panel" hidden></div>

            <div class="foundation-record-list" id="foundationRecordList"></div>

            <footer class="foundation-module-footer">
                SCP FOUNDATION // AUTHORIZED PERSONNEL ONLY
            </footer>

        </section>
    `;

    const list = content.querySelector("#foundationRecordList");
    const search = content.querySelector("#foundationSearch");
    const formPanel = content.querySelector("#foundationRecordForm");
    const detailPanel = content.querySelector("#foundationRecordDetail");
    const addButton = content.querySelector("#foundationAddButton");
    const form = content.querySelector("#foundationForm");
    const cancelButton = content.querySelector("#foundationCancel");

    /* DRAW RECORDS */

    function drawRecords(searchTerm = "") {

        const filtered = records.filter(record => {
            return Object.values(record).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        content.querySelector("#foundationRecordCount").textContent = records.length;

        if (filtered.length === 0) {
            list.innerHTML = `
                <div class="foundation-empty">
                    <h3>NO RECORDS FOUND</h3>
                    <p>No database entries match your search.</p>
                </div>
            `;
            return;
        }

        list.innerHTML = filtered.map((record, index) => `
            <article class="foundation-record-card">

                <div class="foundation-record-top">
                    <span>${foundationEscape(record.code || "UNASSIGNED")}</span>
                    <span class="foundation-record-status">
                        ${foundationEscape(record.status || record.classification || "REGISTERED")}
                    </span>
                </div>

                <h3>
                    ${foundationEscape(record.title || record.subject || "Untitled Record")}
                </h3>

                <p>
                    ${foundationEscape(record.summary || record.objective || record.notes || record.description || "No summary available.")}
                </p>

                <div class="foundation-record-bottom">
                    <span>${foundationEscape(record.date || record.review || "DATE UNAVAILABLE")}</span>

                    <button
                        type="button"
                        class="foundation-open-record"
                        data-record-id="${foundationEscape(record.code || index)}"
                    >
                        OPEN FILE →
                    </button>
                </div>

            </article>
        `).join("");

        list.querySelectorAll(".foundation-open-record").forEach(button => {

            button.addEventListener("click", () => {

                const selected = records.find(record =>
                    (record.code || "") === button.dataset.recordId
                ) || records[Number(button.dataset.recordId)];

                if (!selected) return;

                openRecord(selected);

            });

        });

    }

    /* OPEN RECORD */

    function openRecord(record) {

        formPanel.hidden = true;
        list.hidden = true;
        detailPanel.hidden = false;

        detailPanel.innerHTML = `
            <div class="foundation-detail-heading">
                <div>
                    <p class="foundation-classification">
                        FOUNDATION DATABASE // RECORD VIEW
                    </p>

                    <h3>${foundationEscape(record.title || record.subject || record.code)}</h3>

                    <p>${foundationEscape(record.code || "UNASSIGNED")}</p>
                </div>

                <span class="foundation-record-status">
                    ${foundationEscape(record.status || record.classification || "REGISTERED")}
                </span>
            </div>

            <div class="foundation-detail-grid">

                ${Object.entries(record).map(([key, value]) => `
                    <div class="foundation-detail-item">
                        <span>${foundationEscape(key.replace(/([A-Z])/g, " $1").toUpperCase())}</span>
                        <p>${foundationEscape(value)}</p>
                    </div>
                `).join("")}

            </div>

            <button type="button" id="foundationBackButton">
                ← BACK TO DATABASE
            </button>
        `;

        detailPanel.querySelector("#foundationBackButton")
            .addEventListener("click", () => {
                detailPanel.hidden = true;
                list.hidden = false;
            });

    }

    /* ADD RECORD */

    addButton.addEventListener("click", () => {
        detailPanel.hidden = true;
        list.hidden = true;
        formPanel.hidden = false;
    });

    cancelButton.addEventListener("click", () => {
        formPanel.hidden = true;
        list.hidden = false;
    });

    form.addEventListener("submit", event => {

        event.preventDefault();

        const formData = new FormData(form);
        const newRecord = {};

        config.fields.forEach(field => {
            newRecord[field[0]] = String(formData.get(field[0]) || "").trim();
        });

        if (!newRecord.code) {
            newRecord.code = foundationId(config.code);
        }

        records.unshift(newRecord);

        foundationSaveData(config.key, records);

        form.reset();

        formPanel.hidden = true;
        list.hidden = false;

        drawRecords();

    });

    /* SEARCH */

    search.addEventListener("input", () => {
        detailPanel.hidden = true;
        list.hidden = false;
        drawRecords(search.value);
    });

    drawRecords();

};


/* =====================================================
   COMMUNICATIONS MODULE
   Local prototype — backend synchronization comes later
===================================================== */


/* =====================================================
   COMMUNICATIONS MODULE
   SCP FOUNDATION // INTERNAL NETWORK
===================================================== */


/* =====================================================
   COMMUNICATIONS MODULE
   CHANNELS // DIRECT MESSAGES // NOTIFICATIONS
===================================================== */

window.renderFoundationCommunications = async function(content, character) {

    const supabase = window.supabaseClient;

    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
        console.error("COMMUNICATIONS: No active session.", sessionError);
        content.innerHTML = "<p>COMMUNICATION ERROR — NO ACTIVE SESSION.</p>";
        return;
    }

    const currentUserId = sessionData.session.user.id;

    const storageKey = "scp_communications";
    const currentName = character.name || character.fullName || character.username || "Unknown";
    const currentId = currentUserId;

    let messages = [];

    const { data: savedMessages, error: messagesError } =
        await supabase
            .from("chat_messages")
            .select("*")
            .order("created_at", { ascending: true });

    if (messagesError) {
        console.error("COMMUNICATIONS LOAD ERROR:", messagesError);
    } else {
        messages = (savedMessages || []).map(message => ({
            author: message.sender_name || "UNKNOWN PERSONNEL",
            authorId: message.sender_id,
            role: message.sender_role || "FOUNDATION PERSONNEL",
            text: message.content,
            time: new Date(message.created_at).toLocaleString(),
            channel: message.channel,
            recipientId: message.recipient_id,
            conversationKey: message.recipient_id
                ? getConversationKey(message.sender_id, message.recipient_id)
                : null,
            readBy: []
        }));
    }



    const { data: activeSessions, error: personnelError } =
        await supabase
            .from("character_sessions")
            .select("character_key, character_name, user_id");

    if (personnelError) {
        console.error("PERSONNEL DIRECTORY ERROR:", personnelError);
    }

    const personnel = (typeof characters !== "undefined" ? characters : [])
        .filter(person => person.type !== "subject")
        .map(person => {
            const key = person.name
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "_");

            const session = (activeSessions || []).find(
                item => item.character_key === key
            );

            return session
                ? { ...person, onlineUserId: session.user_id }
                : null;
        })
        .filter(Boolean);


    const currentRole = String(character.type || character.role || "").toLowerCase();

    let currentTitle = "FOUNDATION PERSONNEL";

    if (currentRole.includes("security") || currentRole.includes("captain")) {
        currentTitle = "SECURITY PERSONNEL";
    } else if (currentRole.includes("elite")) {
        currentTitle = "ELITE RESEARCHER";
    } else if (currentRole.includes("scientist") || currentRole.includes("forensic")) {
        currentTitle = "DR.";
    }

    const currentIdentity = `${currentTitle} ${currentName}`;

    let activeView = "channel";
    let activeChannel = "general";
    let activeContact = null;

    function personId(person) {
        return String(person.onlineUserId || person.id || person.username || person.name);
    }

    function personTitle(person) {
        const type = String(person.type || person.role || "").toLowerCase();

        if (type.includes("security") || type.includes("captain")) {
            return "SECURITY PERSONNEL";
        }

        if (type.includes("elite")) return "ELITE RESEARCHER";

        if (type.includes("scientist") || type.includes("forensic")) {
            return "DR.";
        }

        return String(person.role || person.type || "FOUNDATION PERSONNEL");
    }

    function getConversationKey(first, second) {
        return "dm:" + [String(first), String(second)].sort().join(":");
    }

    function saveMessages() {
        foundationSaveData(storageKey, messages);
    }

    function unreadCount(conversationKey) {
        return messages.filter(message =>
            message.conversationKey === conversationKey &&
            message.authorId !== currentId &&
            message.recipientId === currentId &&
            !(message.readBy || []).includes(currentId)
        ).length;
    }

    function unreadChannelCount(channel) {
        return messages.filter(message =>
            (message.channel || "general") === channel &&
            message.authorId !== currentId &&
            !(message.readBy || []).includes(currentId)
        ).length;
    }

    function markConversationRead(key) {
        messages.forEach(message => {
            if (
                message.conversationKey === key &&
                message.recipientId === currentId
            ) {
                message.readBy = message.readBy || [];

                if (!message.readBy.includes(currentId)) {
                    message.readBy.push(currentId);
                }
            }
        });

        saveMessages();
    }

    function markChannelRead(channel) {
        messages.forEach(message => {
            if ((message.channel || "general") === channel) {
                message.readBy = message.readBy || [];

                if (!message.readBy.includes(currentId)) {
                    message.readBy.push(currentId);
                }
            }
        });

        saveMessages();
    }

    content.innerHTML = `
        <section class="foundation-module foundation-communications">

            <div class="foundation-module-header">
                <div>
                    <p class="foundation-classification">
                        SCP FOUNDATION // INTERNAL NETWORK
                    </p>
                    <h2>COMMUNICATIONS</h2>
                    <p>Secure personnel communication terminal.</p>
                </div>
                <div class="foundation-module-stamp">INTERNAL</div>
            </div>

            <div class="foundation-chat-layout">

                <aside class="foundation-chat-sidebar">

                    <div class="foundation-chat-user">
                        <span class="foundation-online-indicator"></span>
                        <div>
                            <strong>${foundationEscape(currentName)}</strong>
                            <small>${foundationEscape(currentTitle)}</small>
                        </div>
                    </div>

                    <div class="foundation-chat-clearance">
                        CLEARANCE LEVEL ${foundationEscape(character.clearance || "UNKNOWN")}
                    </div>

                    <div class="foundation-chat-channel-title">CHANNELS</div>

                    <button type="button" class="foundation-channel active" data-channel="general">
                        <span># GENERAL</span>
                        <span class="foundation-unread" id="unread-general"></span>
                    </button>

                    <button type="button" class="foundation-channel" data-channel="research">
                        <span># RESEARCH</span>
                        <span class="foundation-unread" id="unread-research"></span>
                    </button>

                    <button type="button" class="foundation-channel" data-channel="security">
                        <span># SECURITY</span>
                        <span class="foundation-unread" id="unread-security"></span>
                    </button>

                    <button type="button" class="foundation-channel" data-channel="classified">
                        <span># CLASSIFIED</span>
                        <span class="foundation-unread" id="unread-classified"></span>
                    </button>

                    <div class="foundation-chat-channel-title foundation-people-title">
                        PERSONNEL DIRECTORY
                    </div>

                    <div id="foundationChatPeople" class="foundation-chat-people"></div>

                    <div class="foundation-chat-sidebar-footer">
                        FOUNDATION NETWORK<br>
                        LOCAL SESSION ACTIVE
                    </div>

                </aside>

                <div class="foundation-chat-main">

                    <div class="foundation-chat-header">
                        <div>
                            <strong id="foundationChatTitle"># GENERAL</strong>
                            <small id="foundationChatDescription">General personnel communications.</small>
                        </div>

                        <span class="foundation-chat-status">● LOCAL SESSION</span>
                    </div>

                    <div id="foundationChatMessages" class="foundation-chat-messages"></div>

                    <form id="foundationChatForm" class="foundation-chat-form">
                        <textarea
                            id="foundationChatInput"
                            placeholder="Transmit a message..."
                            rows="2"
                            maxlength="2000"
                            required
                        ></textarea>

                        <button type="submit">TRANSMIT MESSAGE</button>
                    </form>

                    <p class="foundation-chat-warning">
                        LOCAL PROTOTYPE — messages are stored only in this browser.
                    </p>

                </div>
            </div>
        </section>
    `;

    const messageArea = content.querySelector("#foundationChatMessages");
    const chatForm = content.querySelector("#foundationChatForm");
    const chatInput = content.querySelector("#foundationChatInput");
    const chatTitle = content.querySelector("#foundationChatTitle");
    const chatDescription = content.querySelector("#foundationChatDescription");
    const peopleArea = content.querySelector("#foundationChatPeople");

    const descriptions = {
        general: "General personnel communications.",
        research: "Scientific research and laboratory communications.",
        security: "Security department communications.",
        classified: "Restricted internal communications."
    };

    function drawNotifications() {
        ["general", "research", "security", "classified"].forEach(channel => {
            const badge = content.querySelector("#unread-" + channel);
            const amount = unreadChannelCount(channel);

            badge.textContent = amount > 0 ? amount : "";
            badge.classList.toggle("has-unread", amount > 0);
        });

        drawPeople();
    }

    function drawPeople() {
        peopleArea.innerHTML = personnel
            .filter(person => personId(person) !== currentId)
            .map(person => {
                const id = personId(person);
                const key = getConversationKey(currentId, id);
                const unread = unreadCount(key);

                return `
                    <button
                        type="button"
                        class="foundation-person-contact ${activeView === "dm" && activeContact && personId(activeContact) === id ? "active" : ""}"
                        data-person-id="${foundationEscape(id)}"
                    >
                        <span class="foundation-contact-indicator"></span>

                        <span class="foundation-contact-info">
                            <strong>${foundationEscape(person.name)}</strong>
                            <small>${foundationEscape(personTitle(person))}</small>
                        </span>

                        ${unread > 0 ? `<span class="foundation-unread has-unread">${unread}</span>` : ""}
                    </button>
                `;
            }).join("");

        peopleArea.querySelectorAll(".foundation-person-contact").forEach(button => {
            button.addEventListener("click", () => {
                const selected = personnel.find(person =>
                    personId(person) === button.dataset.personId
                );

                if (selected) openDirectMessage(selected);
            });
        });
    }

    function drawMessages() {
        let visibleMessages = [];

        if (activeView === "channel") {
            visibleMessages = messages.filter(message =>
                (message.channel || "general") === activeChannel
            );
        } else if (activeView === "dm" && activeContact) {
            const key = getConversationKey(currentId, personId(activeContact));

            visibleMessages = messages.filter(message =>
                message.conversationKey === key
            );
        }

        if (visibleMessages.length === 0) {
            messageArea.innerHTML = `
                <div class="foundation-empty">
                    <p>NO TRANSMISSIONS RECORDED.</p>
                    <p>Begin a new communication below.</p>
                </div>
            `;
            return;
        }

        messageArea.innerHTML = visibleMessages.map(message => {
            const own = message.authorId === currentId;

            return `
                <article class="foundation-chat-message ${own ? "own-message" : "other-message"}">

                    <div class="foundation-chat-meta">
                        <div class="foundation-chat-author">
                            <strong>${foundationEscape(message.author)}</strong>
                            <span>${foundationEscape(message.role || "FOUNDATION PERSONNEL")}</span>
                        </div>

                        <time>${foundationEscape(message.time)}</time>
                    </div>

                    <p>${foundationEscape(message.text)}</p>

                </article>
            `;
        }).join("");

        messageArea.scrollTop = messageArea.scrollHeight;
    }

    function openChannel(channel) {
        activeView = "channel";
        activeChannel = channel;
        activeContact = null;

        markChannelRead(channel);

        content.querySelectorAll(".foundation-channel").forEach(button => {
            button.classList.toggle("active", button.dataset.channel === channel);
        });

        chatTitle.textContent = "# " + channel.toUpperCase();
        chatDescription.textContent = descriptions[channel];

        drawMessages();
        drawNotifications();
    }

    function openDirectMessage(person) {
        activeView = "dm";
        activeContact = person;

        const key = getConversationKey(currentId, personId(person));

        markConversationRead(key);

        content.querySelectorAll(".foundation-channel").forEach(button => {
            button.classList.remove("active");
        });

        chatTitle.textContent = "DIRECT MESSAGE // " + person.name.toUpperCase();
        chatDescription.textContent = personTitle(person) + " // PRIVATE CHANNEL";

        drawMessages();
        drawNotifications();
    }

    content.querySelectorAll(".foundation-channel").forEach(button => {
        button.addEventListener("click", () => {
            openChannel(button.dataset.channel);
        });
    });


    chatForm.addEventListener("submit", async event => {
        event.preventDefault();

        const text = chatInput.value.trim();
        if (!text) return;

        let recipientId = null;
        let channel = activeChannel;

        if (activeView === "dm" && activeContact) {
            const characterKey = activeContact.name
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "_");

            const { data: contact, error: contactError } =
                await supabase
                    .from("character_sessions")
                    .select("user_id")
                    .eq("character_key", characterKey)
                    .maybeSingle();

            if (contactError || !contact) {
                console.error("RECIPIENT NOT FOUND:", contactError);
                alert("PERSONNEL NOT AVAILABLE.");
                return;
            }

            recipientId = contact.user_id;
            channel = null;
        }

        const newMessage = {
            sender_id: currentUserId,
            sender_name: currentIdentity,
            sender_role: currentTitle,
            recipient_id: recipientId,
            recipient_name: activeContact?.name || null,
            channel: channel,
            content: text
        };

        const { data: savedMessage, error: sendError } =
            await supabase
                .from("chat_messages")
                .insert(newMessage)
                .select()
                .single();

        if (sendError) {
            console.error("MESSAGE TRANSMISSION ERROR:", sendError);
            alert("TRANSMISSION FAILED.");
            return;
        }

        messages.push({
            author: savedMessage.sender_name,
            authorId: savedMessage.sender_id,
            role: savedMessage.sender_role,
            text: savedMessage.content,
            time: new Date(savedMessage.created_at).toLocaleString(),
            channel: savedMessage.channel,
            recipientId: savedMessage.recipient_id,
            conversationKey: savedMessage.recipient_id
                ? getConversationKey(savedMessage.sender_id, savedMessage.recipient_id)
                : null,
            readBy: []
        });

        chatInput.value = "";
        drawMessages();
        drawNotifications();
    });

    /* Refresh when another profile or browser tab updates local storage */


    // SCP FOUNDATION // REALTIME COMMUNICATIONS

    const communicationsSubscription = supabase
        .channel("scp-communications-" + currentUserId)
        .on(
            "postgres_changes",
            {
                event: "INSERT",
                schema: "public",
                table: "chat_messages"
            },
            payload => {
                const incoming = payload.new;

                // Avoid duplicating messages sent by this session
                if (incoming.sender_id === currentUserId) return;

                const newMessage = {
                    author: incoming.sender_name || "UNKNOWN PERSONNEL",
                    authorId: incoming.sender_id,
                    role: incoming.sender_role || "FOUNDATION PERSONNEL",
                    text: incoming.content,
                    time: new Date(incoming.created_at).toLocaleString(),
                    channel: incoming.channel,
                    recipientId: incoming.recipient_id,
                    conversationKey: incoming.recipient_id
                        ? getConversationKey(incoming.sender_id, incoming.recipient_id)
                        : null,
                    readBy: []
                };

                messages.push(newMessage);

                drawMessages();
                drawNotifications();
            }
        )
        .subscribe(status => {
            console.log("SCP REALTIME STATUS:", status);
        });
    openChannel("general");
    drawNotifications();

};
