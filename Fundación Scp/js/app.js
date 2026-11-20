
/* ==================================================
   SCP FOUNDATION
   OFFICIAL CHARACTER REGISTRY
================================================== */


/* =========================================
   1. REGISTERED CHARACTERS
========================================= */

const characters = [

    // SCIENTIFIC DEPARTMENT

    {
        name: "Riku Heikkinen",
        aliases: ["Riku"],
        role: "Research Scientist",
        type: "scientist",
        clearance: 3,
        department: "Scientific Department",
        designation: "PERSONNEL",
        classification: "Foundation Personnel",
        photo: "assets/personnel/riku-heikkinen.jpg"
    },

    {
        name: "Christopher Theodoru",
        aliases: ["Chris"],
        role: "Research Scientist",
        type: "scientist",
        clearance: 3,
        department: "Scientific Department",
        designation: "PERSONNEL",
        classification: "Foundation Personnel",
        photo: "assets/personnel/christopher-theodoru.jpg"
    },

    {
        name: "Crin Anghelescu",
        aliases: ["Crin"],
        role: "Research Scientist",
        type: "scientist",
        clearance: 3,
        department: "Scientific Department",
        designation: "PERSONNEL",
        classification: "Foundation Personnel",
        photo: "assets/personnel/crin-anghelescu.jpg"
    },

    {
        name: "Suma",
        aliases: [],
        role: "Elite Research Scientist",
        type: "eliteScientist",
        clearance: 3,
        department: "Elite Scientific Department",
        designation: "PERSONNEL",
        classification: "Foundation Personnel",
        photo: "assets/personnel/suma.jpg"
    },

    {
        name: "Jesús Rivero Gato",
        aliases: ["Chuy"],
        role: "Research Scientist",
        type: "scientist",
        clearance: 3,
        department: "Scientific Department",
        designation: "PERSONNEL",
        classification: "Foundation Personnel",
        photo: "assets/personnel/jesus-miller-gato.jpg"
    },


    // SECURITY AND CONTAINMENT

    {
        name: "Matthew Collins",
        aliases: ["Matty"],
        role: "Security Captain",
        type: "captain",
        clearance: 3,
        department: "Security and Containment",
        designation: "PERSONNEL",
        classification: "Foundation Personnel",
        photo: "assets/personnel/matthew-collins.jpg"
    },

    {
        name: "Ivan R. Schneider",
        aliases: ["Ivan"],
        role: "Security Officer",
        type: "security",
        clearance: 2,
        department: "Security and Containment",
        designation: "PERSONNEL",
        classification: "Foundation Personnel",
        photo: "assets/personnel/ivan-schneider.jpg"
    },


    // FORENSIC DEPARTMENT

    {
        name: "Mikko Heikkinen",
        aliases: ["Mikko"],
        role: "Forensic Scientist",
        type: "forensic",
        clearance: 2,
        department: "Forensic Team",
        designation: "PERSONNEL",
        classification: "Foundation Personnel",
        photo: "assets/personnel/mikko-heikkinen.jpg"
    },


    // ANOMALOUS SUBJECTS

    {
        name: "Haziel Mirren",
        aliases: ["Haziel"],
        role: "Anomalous Subject",
        type: "subject",
        clearance: 1,
        department: "Anomalous Containment",
        designation: "SCP-007",
        classification: "Euclid / Thaumiel",
        photo: "assets/subjects/haziel-mirren.jpg"
    },

    {
        name: "Luciel Mirren",
        aliases: ["Luciel"],
        role: "Anomalous Subject",
        type: "subject",
        clearance: 1,
        department: "Anomalous Containment",
        designation: "SCP-007-1",
        classification: "Euclid",
        photo: "assets/subjects/luciel-mirren.jpg"
    },

    {
        name: "Gabriel",
        aliases: [],
        role: "Anomalous Subject",
        type: "subject",
        clearance: 1,
        department: "Anomalous Containment",
        designation: "SCP-7777",
        classification: "Safe",
        photo: "assets/subjects/gabriel.jpg"
    },

    {
        name: "Nathan",
        aliases: [],
        role: "Anomalous Subject",
        type: "subject",
        clearance: 1,
        department: "Anomalous Containment",
        designation: "SCP-3610",
        classification: "Keter",
        photo: "assets/subjects/nathan.jpg"
    },

    {
        name: "Stefan Dumitrescu",
        aliases: ["Stefan"],
        role: "Anomalous Subject",
        type: "subject",
        clearance: 1,
        department: "Anomalous Containment",
        designation: "SCP-137",
        classification: "Keter",
        photo: "assets/subjects/stefan-dumitrescu.jpg"
    },

    {
        name: "Nereus Aegeon",
        aliases: ["Nereus"],
        role: "Anomalous Subject",
        type: "subject",
        clearance: 1,
        department: "Anomalous Containment",
        designation: "SCP-087",
        classification: "Safe",
        photo: "assets/subjects/nereus-aegeon.jpg"
    }

];


/* =========================================
   2. PERMISSIONS BY ROLE
========================================= */

const permissions = {

    scientist: [
        "Anomaly Database",
        "Personnel Directory",
        "Research Archives",
        "Experiment Records",
        "Incident Reports",
        "Communications",
        "Document Archive"
    ],

    eliteScientist: [
        "Anomaly Database",
        "Personnel Directory",
        "Research Archives",
        "Experiment Records",
        "Incident Reports",
        "Communications",
        "Document Archive",
        "Restricted Research Archives"
    ],

    captain: [
        "Anomaly Database",
        "Personnel Directory",
        "Containment Records",
        "Incident Reports",
        "Security Records",
        "Communications",
        "Security Operations"
    ],

    security: [
        "Anomaly Database",
        "Containment Records",
        "Incident Reports",
        "Security Records",
        "Communications"
    ],

    forensic: [
        "Anomaly Database",
        "Personnel Directory",
        "Forensic Archives",
        "Incident Reports",
        "Evidence Records",
        "Communications"
    ],

    subject: [
        "Personal File",
        "Communications"
    ]

};




/* =========================================
   3. PAGE ELEMENTS
========================================= */

const accessForm = document.getElementById("accessForm");
const characterInput = document.getElementById("characterName");
const accessPanel = document.querySelector(".access-panel");


/* =========================================
   4. FIND REGISTERED CHARACTER
========================================= */

function findCharacter(inputName) {

    const searchName = inputName.trim().toLowerCase();

    return characters.find(character => {

        const possibleNames = [
            character.name,
            ...character.aliases
        ];

        return possibleNames.some(name =>
            name.toLowerCase() === searchName
        );

    });

}


/* =========================================
   5. IDENTIFICATION SYSTEM
========================================= */

accessForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const enteredName = characterInput.value.trim();
    const character = findCharacter(enteredName);

    if (!character) {

        const message = document.getElementById("accessMessage");

        message.textContent =
            "ACCESS DENIED — IDENTITY NOT FOUND.";

        message.className = "message denied";

        accessPanel.classList.remove("granted-animation");
        accessPanel.classList.remove("denied-animation");

        void accessPanel.offsetWidth;

        accessPanel.classList.add("denied-animation");

        return;
    }

    accessPanel.classList.remove("denied-animation");
    accessPanel.classList.remove("granted-animation");

    void accessPanel.offsetWidth;

    accessPanel.classList.add("granted-animation");

    setTimeout(async () => {

        const { data: sessionData } =
            await window.supabaseClient.auth.getSession();

        if (!sessionData.session) {
            const { error } =
                await window.supabaseClient.auth.signInAnonymously();

            if (error) {
                console.error("AUTHENTICATION ERROR:", error);

                const message = document.getElementById("accessMessage");
                message.textContent = "CONNECTION ERROR — PLEASE TRY AGAIN.";
                message.className = "message denied";
                return;
            }
        }

        console.log("SCP FOUNDATION // PERSONNEL SESSION ACTIVE");

        grantAccess(character);

    }, 700);
});


/* =========================================
   6. HTML SECURITY HELPER
========================================= */

function safeText(value) {

    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);

}


/* =========================================
   7. GRANT ACCESS
========================================= */

async function grantAccess(character) {
    // SCP FOUNDATION // REGISTER PERSONNEL SESSION

    const supabase = window.supabaseClient;

    let { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) {
        console.error("SESSION ERROR:", sessionError);
        alert("SESSION INITIALIZATION FAILED.");
        return;
    }

    if (!sessionData.session) {
        const { data, error } = await supabase.auth.signInAnonymously();

        if (error || !data.session) {
            console.error("ANONYMOUS LOGIN ERROR:", error);
            alert("ANONYMOUS LOGIN FAILED.");
            return;
        }

        sessionData = data;
    }

    const userId = sessionData.session.user.id;

    const characterKey = character.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_");

    const { error: registrationError } =
        await window.supabaseClient
            .from("character_sessions")
            .upsert({
                character_key: characterKey,
                character_name: character.name,
                user_id: userId,
                updated_at: new Date().toISOString()
            }, {
                onConflict: "character_key"
            });

    if (registrationError) {
        console.error("PERSONNEL REGISTRATION ERROR:", registrationError);
    }

    const availableModules = permissions[character.type] || [];

    const initials = character.name
        .split(" ")
        .map(part => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    accessPanel.classList.remove("denied-animation");

    accessPanel.innerHTML = `

        <div class="dashboard-shell">

            <aside class="sidebar">

                <div class="sidebar-brand">
                    <img
                        src="assets/logo/scp-logo.jpg"
                        alt="SCP"
                        class="sidebar-logo"
                    >

                    <div>
                        <strong>SCP FOUNDATION</strong>
                        <span>INTERNAL NETWORK</span>
                    </div>
                </div>

                <div class="sidebar-section">
                    MAIN MENU
                </div>

                <nav id="dashboardNavigation"></nav>

                <div class="sidebar-bottom">
                    <span class="status-dot"></span>
                    SYSTEM OPERATIONAL
                </div>

            </aside>


            <main class="dashboard-main">

                <header class="dashboard-topbar">

                    <div>
                        <span class="topbar-label">
                            FOUNDATION DATABASE
                        </span>

                        <h1 id="pageTitle">
                            SYSTEM OVERVIEW
                        </h1>
                    </div>

                    <div class="topbar-user">
                        <span class="online-dot"></span>
                        <span>${safeText(character.name)}</span>
                    </div>

                </header>


                <section class="dashboard-content" id="dashboardContent">
                </section>


                <footer class="dashboard-footer">
                    SCP FOUNDATION // AUTHORIZED PERSONNEL ONLY
                </footer>

            </main>

        </div>

    `;

    /* =========================================
       PERSONALIZED WELCOME ANIMATION
    ========================================= */

    const isScientist =
        character.type === "scientist" ||
        character.type === "eliteScientist" ||
        character.type === "forensic";

    const displayName = isScientist
        ? "DR. " + (character.aliases[0] || character.name)
        : character.name;

    const welcomeOverlay = document.createElement("div");

    welcomeOverlay.className = "welcome-overlay";

    const welcomeText = document.createElement("div");

    welcomeText.className = "welcome-animation-content";

    welcomeText.innerHTML = `
    <p class="welcome-system-label">
        SCP FOUNDATION // IDENTITY VERIFIED
    </p>

    <h1 class="welcome-animation-title"></h1>

    <p class="welcome-system-status">
        ACCESS GRANTED
    </p>
`;

    welcomeText.querySelector(".welcome-animation-title").textContent =
        "WELCOME, " + displayName;

    welcomeOverlay.appendChild(welcomeText);

    document.body.appendChild(welcomeOverlay);

    setTimeout(() => {
        welcomeOverlay.classList.add("welcome-exit");

        setTimeout(() => {
            welcomeOverlay.remove();
        }, 700);

    }, 2800);


    /* =====================================
       CHARACTER PHOTO
    ===================================== */

    const sidebarBrand = document.querySelector(".sidebar-brand");

    const userPhoto = document.createElement("img");

    userPhoto.src = character.photo;
    userPhoto.alt = character.name;
    userPhoto.className = "sidebar-user-photo";

    userPhoto.onerror = function() {
        userPhoto.remove();
    };

    const userBox = document.createElement("div");

    userBox.className = "sidebar-profile";

    userBox.innerHTML = `
        <div>
            <strong>${safeText(character.name)}</strong>
            <span>${safeText(character.role)}</span>
            <span>LEVEL ${safeText(character.clearance)} CLEARANCE</span>
        </div>
    `;

    if (character.photo) {
        userBox.prepend(userPhoto);
    }

    sidebarBrand.after(userBox);


    /* =====================================
       NAVIGATION MODULES
    ===================================== */

    const moduleInformation = {

        "Overview": {
            icon: "▦",
            title: "SYSTEM OVERVIEW"
        },

        "Anomaly Database": {
            icon: "◈",
            title: "ANOMALY DATABASE"
        },

        "Personnel Directory": {
            icon: "♙",
            title: "PERSONNEL DIRECTORY"
        },

        "Research Archives": {
            icon: "⌕",
            title: "RESEARCH ARCHIVES"
        },

        "Experiment Records": {
            icon: "▤",
            title: "EXPERIMENT RECORDS"
        },

        "Incident Reports": {
            icon: "⚠",
            title: "INCIDENT REPORTS"
        },

        "Communications": {
            icon: "✉",
            title: "COMMUNICATIONS"
        },

        "Document Archive": {
            icon: "▣",
            title: "DOCUMENT ARCHIVE"
        },

        "Restricted Research Archives": {
            icon: "🔒",
            title: "RESTRICTED RESEARCH"
        },

        "Containment Records": {
            icon: "▧",
            title: "CONTAINMENT RECORDS"
        },

        "Security Records": {
            icon: "◉",
            title: "SECURITY RECORDS"
        },

        "Security Operations": {
            icon: "⌖",
            title: "SECURITY OPERATIONS"
        },

        "Forensic Archives": {
            icon: "⌗",
            title: "FORENSIC ARCHIVES"
        },

        "Evidence Records": {
            icon: "▥",
            title: "EVIDENCE RECORDS"
        },

        "Personal File": {
            icon: "♙",
            title: "PERSONAL FILE"
        }

    };


    const navigation = document.getElementById("dashboardNavigation");

    const modules = [
        "Overview",
        ...availableModules
    ];

    modules.forEach(module => {

        const information = moduleInformation[module];

        if (!information) return;

        const button = document.createElement("button");

        button.className = "nav-button";
        button.type = "button";

        button.innerHTML = `
            <span class="nav-icon">${information.icon}</span>
            <span>${safeText(module)}</span>
        `;

        button.addEventListener("click", () => {

            document.querySelectorAll(".nav-button")
                .forEach(item => item.classList.remove("active"));

            button.classList.add("active");

            renderModule(module, character);

        });

        navigation.appendChild(button);

    });


    /* =====================================
       LOGOUT BUTTON
    ===================================== */

    const logout = document.createElement("button");

    logout.className = "logout-button";
    logout.textContent = "TERMINATE SESSION";

    navigation.after(logout);

    logout.addEventListener("click", () => {
        location.reload();
    });


    /* =====================================
       INITIAL PAGE
    ===================================== */

    const firstButton = navigation.querySelector(".nav-button");

    if (firstButton) {
        firstButton.classList.add("active");
    }

    renderModule("Overview", character);

}



/* =========================================
   8. CHARACTER DOSSIERS
========================================= */

function renderCharacterDossier(target, currentCharacter) {

    const content = document.getElementById("dashboardContent");
    const pageTitle = document.getElementById("pageTitle");

    if (!content || !target) return;

    const isSubject = target.type === "subject";

    const dossierTitle = isSubject
        ? "ANOMALOUS SUBJECT DOSSIER"
        : "PERSONNEL DOSSIER";

    if (pageTitle) {
        pageTitle.textContent = dossierTitle;
    }

    content.innerHTML = `
        <div class="dossier-page">

            <button class="back-button" id="backToDirectory">
                ← RETURN TO DIRECTORY
            </button>

            <div class="dossier-header">
                <div>
                    <p class="dossier-classification">
                        FOUNDATION DATABASE // CLASSIFIED
                    </p>

                    <h1>${safeText(dossierTitle)}</h1>

                    <p class="dossier-reference">
                        ${safeText(target.designation)}
                    </p>
                </div>

                <span class="dossier-stamp">
                    ${isSubject ? "CONTAINMENT" : "PERSONNEL"}
                </span>
            </div>

            <div class="dossier-profile">

                <div class="dossier-photo-container">
                    <img
                        class="dossier-photo"
                        src="${safeText(target.photo)}"
                        alt="${safeText(target.name)}"
                        onerror="this.style.display='none'"
                    >
                </div>

                <div class="dossier-identity">

                    <h2>${safeText(target.name)}</h2>

                    <p><strong>ROLE:</strong> ${safeText(target.role)}</p>
                    <p><strong>DEPARTMENT:</strong> ${safeText(target.department)}</p>
                    <p><strong>CLEARANCE:</strong> LEVEL ${safeText(target.clearance)}</p>
                    <p><strong>CLASSIFICATION:</strong> ${safeText(target.classification)}</p>

                </div>
            </div>

            <div class="dossier-section">
                <h3>GENERAL INFORMATION</h3>
                <p>No additional information has been registered.</p>
            </div>

            <div class="dossier-section">
                <h3>OBSERVATIONS</h3>
                <p>Further documentation pending.</p>
            </div>

            <div class="dossier-footer">
                SCP FOUNDATION // AUTHORIZED ACCESS ONLY
            </div>

        </div>
    `;

    document.getElementById("backToDirectory")
        .addEventListener("click", function() {

            renderModule(
                isSubject ? "Anomaly Database" : "Personnel Directory",
                currentCharacter
            );

        });

}


/* =========================================
   9. MODULE CONTENT SYSTEM
========================================= */

function renderModule(module, character) {

    const content = document.getElementById("dashboardContent");
    const pageTitle = document.getElementById("pageTitle");

    if (!content || !character) {
        console.error("Dashboard content or character missing.");
        return;
    }

    const availableModules = permissions[character.type] || [];

    /* ACCESS CHECK */

    if (module !== "Overview" && !availableModules.includes(module)) {

        content.innerHTML = `
            <div class="restricted-notice">
                <h1>ACCESS RESTRICTED</h1>
                <p>Your current clearance does not authorize this section.</p>
            </div>
        `;

        return;
    }
    /* ANOMALY DATABASE */

    if (module === "Anomaly Database") {
        pageTitle.textContent = "ANOMALY DATABASE";
        window.renderAnomalyDatabase(content, character);
        return;
    }
    /* PAGE TITLE */

    const titles = {
        "Overview": "SYSTEM OVERVIEW",
        "Anomaly Database": "ANOMALY DATABASE",
        "Personnel Directory": "PERSONNEL DIRECTORY",
        "Research Archives": "RESEARCH ARCHIVES",
        "Experiment Records": "EXPERIMENT RECORDS",
        "Incident Reports": "INCIDENT REPORTS",
        "Communications": "COMMUNICATIONS",
        "Document Archive": "DOCUMENT ARCHIVE",
        "Restricted Research Archives": "RESTRICTED RESEARCH ARCHIVES",
        "Containment Records": "CONTAINMENT RECORDS",
        "Security Records": "SECURITY RECORDS",
        "Security Operations": "SECURITY OPERATIONS",
        "Forensic Archives": "FORENSIC ARCHIVES",
        "Evidence Records": "EVIDENCE RECORDS",
        "Personal File": "PERSONAL FILE",
        "Anomaly Dossiers": "ANOMALY DOSSIERS"
    };

    if (pageTitle) {
        pageTitle.textContent = titles[module] || module.toUpperCase();
    }

    /* MODULE ENTRY INTERFERENCE */

    content.classList.remove("module-interference");

    void content.offsetWidth;

    content.classList.add("module-interference");

    content.addEventListener("animationend", function() {
        content.classList.remove("module-interference");
    }, { once: true });


    /* =====================================
       OVERVIEW
    ===================================== */

    if (module === "Overview") {

        content.innerHTML = `

            <div class="welcome-banner">

                <div>
                    <span class="eyebrow">
                        AUTHORIZED ACCESS CONFIRMED
                    </span>

                    <h2>
                        WELCOME BACK, ${safeText(character.name).toUpperCase()}
                    </h2>

                    <p>
                        Foundation systems are operational.
                        Your session has been initialized.
                    </p>
                </div>

                <div class="welcome-classification">
                    <span>SECURITY CLEARANCE</span>
                    <strong>LEVEL ${safeText(character.clearance)}</strong>
                </div>

            </div>

            <div class="stats-grid">

                <article class="stat-card">
                    <span>REGISTERED PERSONNEL</span>
                    <strong>${characters.filter(person => person.type !== "subject").length}</strong>
                    <small>FOUNDATION DATABASE</small>
                </article>

                <article class="stat-card">
                    <span>REGISTERED ANOMALIES</span>
                    <strong>${characters.filter(person => person.type === "subject").length}</strong>
                    <small>ANOMALY DATABASE</small>
                </article>

                <article class="stat-card">
                    <span>YOUR CLEARANCE</span>
                    <strong>${safeText(character.clearance)}</strong>
                    <small>AUTHORIZED LEVEL</small>
                </article>

            </div>

            <div class="dashboard-section">

                <div class="section-heading">
                    <h2>PERSONNEL INFORMATION</h2>
                    <span>IDENTITY RECORD</span>
                </div>

                <div class="information-panel">

                    <div>
                        <span>REGISTERED NAME</span>
                        <strong>${safeText(character.name)}</strong>
                    </div>

                    <div>
                        <span>POSITION</span>
                        <strong>${safeText(character.role)}</strong>
                    </div>

                    <div>
                        <span>DEPARTMENT</span>
                        <strong>${safeText(character.department)}</strong>
                    </div>

                    <div>
                        <span>CLASSIFICATION</span>
                        <strong>${safeText(character.classification)}</strong>
                    </div>

                </div>

            </div>

            <div class="dashboard-section">

                <div class="section-heading">
                    <h2>AUTHORIZED MODULES</h2>
                    <span>${availableModules.length} MODULES AVAILABLE</span>
                </div>

                <div class="overview-modules">

                    ${availableModules.map(item => `
                        <div class="overview-module">
                            <span>▣</span>
                            ${safeText(item)}
                        </div>
                    `).join("")}

                </div>

            </div>

        `;

        return;
    }


    /* =====================================
       RESEARCH ARCHIVES
    ===================================== */

    if (module === "Research Archives") {

        if (typeof window.renderResearchArchives === "function") {
            window.renderResearchArchives(content, character);
        } else {
            content.innerHTML = "<h2>Research Archives module not loaded.</h2>";
        }

        return;
    }


    /* =====================================
       ANOMALY DOSSIERS
    ===================================== */

    if (module === "Anomaly Dossiers") {

        if (typeof window.renderAnomalyDossiers === "function") {
            window.renderAnomalyDossiers(content, character);
        } else {
            content.innerHTML = "<h2>Anomaly Dossiers module not loaded.</h2>";
        }

        return;
    }


    /* =====================================
       COMMUNICATIONS
    ===================================== */

    if (module === "Communications") {

        if (typeof window.renderFoundationCommunications === "function") {
            window.renderFoundationCommunications(content, character);
        } else {
            content.innerHTML = "<h2>Communications module not loaded.</h2>";
        }

        return;
    }


    /* =====================================
       OTHER FOUNDATION MODULES
    ===================================== */

    if ([
        "Experiment Records",
        "Incident Reports",
        "Document Archive",
        "Restricted Research Archives",
        "Containment Records",
        "Security Records",
        "Security Operations",
        "Forensic Archives",
        "Evidence Records"
    ].includes(module)) {

        if (typeof window.renderFoundationModule === "function") {
            window.renderFoundationModule(module, character, content);
        } else {
            content.innerHTML = "<h2>Foundation module not loaded.</h2>";
        }

        return;
    }


    /* =====================================
       PERSONNEL DIRECTORY
    ===================================== */

    if (module === "Personnel Directory") {

        const personnel = characters.filter(person =>
            person.type !== "subject"
        );

        content.innerHTML = `

            <div class="module-intro">
                <h2>FOUNDATION PERSONNEL</h2>
                <p>Registered members of the Foundation network.</p>
            </div>

            <div class="character-grid">

                ${personnel.map(person => `

                    <button
                        class="character-card dossier-card"
                        data-character="${safeText(person.name)}"
                        type="button"
                    >

                        <img
                            src="${safeText(person.photo)}"
                            alt="${safeText(person.name)}"
                            onerror="this.style.display='none'"
                        >

                        <div class="character-card-info">

                            <h3>${safeText(person.name)}</h3>

                            <p>${safeText(person.role)}</p>

                            <span class="card-clearance">
                                CLEARANCE LEVEL ${safeText(person.clearance)}
                            </span>

                        </div>

                    </button>

                `).join("")}

            </div>

        `;

        content.querySelectorAll(".dossier-card").forEach(card => {

            card.addEventListener("click", function() {

                const selectedCharacter = characters.find(person =>
                    person.name === this.dataset.character
                );

                if (selectedCharacter) {
                    renderCharacterDossier(selectedCharacter, character);
                }

            });

        });

        return;
    }


    /* =====================================
       ANOMALY DATABASE
    ===================================== */

    if (module === "Anomaly Database") {

        const anomalies = characters.filter(person =>
            person.type === "subject"
        );

        content.innerHTML = `

            <div class="module-intro">
                <h2>ANOMALOUS SUBJECT REGISTRY</h2>
                <p>Classified records of contained anomalous entities.</p>
            </div>

            <div class="character-grid">

                ${anomalies.map(person => `

                    <button
                        class="character-card anomaly-card dossier-card"
                        data-character="${safeText(person.name)}"
                        type="button"
                    >

                        <img
                            src="${safeText(person.photo)}"
                            alt="${safeText(person.name)}"
                            onerror="this.style.display='none'"
                        >

                        <div class="character-card-info">

                            <span class="card-designation">
                                ${safeText(person.designation)}
                            </span>

                            <h3>${safeText(person.name)}</h3>

                            <p>${safeText(person.classification)}</p>

                        </div>

                    </button>

                `).join("")}

            </div>

        `;

        content.querySelectorAll(".dossier-card").forEach(card => {

            card.addEventListener("click", function() {

                const selectedCharacter = characters.find(person =>
                    person.name === this.dataset.character
                );

                if (selectedCharacter) {
                    renderCharacterDossier(selectedCharacter, character);
                }

            });

        });

        return;
    }


    /* =====================================
       PERSONAL FILE
    ===================================== */

    if (module === "Personal File" && character.type === "subject") {

        renderCharacterDossier(character, character);

        return;
    }


    /* =====================================
       OTHER MODULES
    ===================================== */

    content.innerHTML = `

        <div class="empty-module">

            <span class="empty-icon">▣</span>

            <h2>${safeText(titles[module] || module)}</h2>

            <p>
                This database module has been initialized.
                Its records and functions are currently being developed.
            </p>

            <span class="development-label">
                FOUNDATION DATABASE // UNDER DEVELOPMENT
            </span>

        </div>

    `;

}

/* =====================================================
   SCP FOUNDATION // FILE INTERFERENCE TRIGGER
===================================================== */

document.addEventListener("click", function(event) {

    const clickedFile = event.target.closest(".module-card");

    if (!clickedFile) return;

    const terminal = document.querySelector(".terminal");

    if (!terminal) return;

    terminal.classList.remove("file-interference");

    void terminal.offsetWidth;

    terminal.classList.add("file-interference");

    setTimeout(() => {
        terminal.classList.remove("file-interference");
    }, 700);

});


