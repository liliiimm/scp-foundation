
/* =========================================
   SCP-007 // HAZIEL
   ANOMALOUS INTRUSION PROTOCOL
========================================= */

(function () {
    "use strict";

    const Intrusion = {

        active: false,
        currentCharacter: null,
        currentEvent: null,
        startTime: Date.now(),

        timer: null,
        visualTimer: null,
        visualTimeout: null,
        distortionTimeout: null,

        lastEvent: null,
        recentEvents: [],
        hazielFileOpen: false,

        permittedPersonnel: [
            "Matthew Collins",
            "Suma",
            "Riku Heikkinen",
            "Christóforos Theodoru",
            "Crin Anghelescu",
            "Jesús Rivero Gato",
            "Mikko Heikkinen"
        ],

        matthewMessages: [
            "I'M WATCHING YOU.",
            "YOU KNOW I'M HERE.",
            "LOOK BEHIND YOU.",
            "YOUR MOTHER MISSES YOU.",
            "WHAT HAVE YOU DONE, MATTY?",
            "DON'T TURN YOUR BACK ON ME.",
            "YOU HEARD ME, MATTHEW.",
            "I KNOW YOU CAN SEE THIS.",
            "WHY ARE YOU PRETENDING I'M NOT HERE?",
            "I HAVE BEEN WATCHING YOU.",
            "YOU LEFT ME WAITING.",
            "DON'T LOOK AWAY."
        ],

        sumaMessages: [
            "I'M HERE.",
            "SINNER."
        ],

        generalMessages: [
            "TURN AROUND.",
            "PRAY FOR THE FALLEN.",
            "DID YOU HEAR THAT?",
            "DON'T LOOK BEHIND YOU.",
            "SOMEONE IS IN THE ROOM.",
            "THEY ARE NOT ALL GONE.",
            "YOU SHOULD LEAVE.",
            "CAN YOU HEAR ME?",
            "SOMETHING IS WRONG.",
            "DO NOT TRUST THE SILENCE.",
            "IT IS TOO LATE TO PRAY.",
            "KEEP YOUR EYES OPEN."
        ],

        /* =========================================
           CHARACTER HANDLING
        ========================================= */

        getCharacterName(character) {
            if (typeof character === "string") {
                return character.trim();
            }

            return character?.name?.trim?.() || null;
        },

        isPermitted(character = this.currentCharacter) {
            const name = this.getCharacterName(character);
            return this.permittedPersonnel.includes(name);
        },

        setCharacter(character) {
            const name = this.getCharacterName(character);

            this.clearTimers();
            this.stopVisualInterference();
            this.close();

            this.currentCharacter = null;
            this.currentEvent = null;
            this.hazielFileOpen = false;

            if (!this.isPermitted(name)) {
                console.log(
                    "SCP-007 // NO RANDOM INTRUSION AUTHORIZED FOR:",
                    name
                );
                return;
            }

            this.currentCharacter = name;
            this.startTime = Date.now();
            this.lastEvent = null;
            this.recentEvents = [];

            this.init();
            this.startVisualInterference();
            this.scheduleNextEvent();

            console.log(
                "SCP-007 // PERSONNEL MONITORING:",
                name
            );
        },

        clearTimers() {
            clearTimeout(this.timer);
            clearTimeout(this.visualTimer);
            clearTimeout(this.visualTimeout);
            clearTimeout(this.distortionTimeout);

            this.timer = null;
            this.visualTimer = null;
            this.visualTimeout = null;
            this.distortionTimeout = null;
        },

        /* =========================================
           VISUAL INTERFERENCE
        ========================================= */

        startVisualInterference() {
            this.stopVisualInterference();

            if (!this.isPermitted()) return;

            const isSuma = this.currentCharacter === "Suma";

            const scheduleNextVisual = () => {
                if (!this.isPermitted()) return;

                const delay = isSuma
                    ? 25000 + Math.random() * 35000
                    : 5000 + Math.random() * 10000;

                this.visualTimer = setTimeout(() => {
                    if (!this.isPermitted()) return;

                    this.applyVisualDistortion();
                    scheduleNextVisual();

                }, delay);
            };

            const firstDelay = isSuma
                ? 12000
                : 2500 + Math.random() * 2500;

            this.visualTimer = setTimeout(() => {
                if (!this.isPermitted()) return;

                this.applyVisualDistortion();
                scheduleNextVisual();

            }, firstDelay);
        },

        applyVisualDistortion(force = false) {
            if (!force && !this.isPermitted()) return;
            if (!document.body) return;

            document.body.classList.remove("visual-distortion");

            void document.body.offsetWidth;

            document.body.classList.add("visual-distortion");

            clearTimeout(this.distortionTimeout);

            this.distortionTimeout = setTimeout(() => {
                document.body.classList.remove("visual-distortion");
            }, 1500);
        },

        stopVisualInterference() {
            clearTimeout(this.visualTimer);
            clearTimeout(this.visualTimeout);
            clearTimeout(this.distortionTimeout);

            this.visualTimer = null;
            this.visualTimeout = null;
            this.distortionTimeout = null;

            if (document.body) {
                document.body.classList.remove(
                    "visual-distortion",
                    "haziel-overload",
                    "system-interference"
                );
            }
        },

        activateHazielOverload(force = false) {
            if (!force && !this.isPermitted()) return;
            if (!document.body) return;

            document.body.classList.remove("haziel-overload");

            void document.body.offsetWidth;

            document.body.classList.add("haziel-overload");

            clearTimeout(this.visualTimeout);

            this.visualTimeout = setTimeout(() => {
                document.body.classList.remove("haziel-overload");
            }, 6500);
        },

        /* =========================================
           INTERFACE
        ========================================= */

        init() {
            if (!document.body) return;

            this.active = true;
            this.createInterface();

            console.log(
                "SCP FOUNDATION // INTRUSION MODULE INITIALIZED"
            );
        },

        createInterface() {
            if (!document.body) return;

            if (document.getElementById("intrusionOverlay")) {
                return;
            }

            const overlay = document.createElement("div");

            overlay.id = "intrusionOverlay";
            overlay.className = "intrusion-overlay";

            overlay.innerHTML = `
                <div class="intrusion-window">

                    <div class="intrusion-topbar">
                        <span>FOUNDATION SECURITY SYSTEM</span>
                        <span class="intrusion-warning">
                            ● UNAUTHORIZED ACCESS
                        </span>
                    </div>

                    <div class="intrusion-content">
                        <p class="intrusion-label">
                            UNKNOWN PROCESS DETECTED
                        </p>

                        <h2 id="intrusionMessage"></h2>
                        <p id="intrusionDetail"></p>
                    </div>

                    <div class="intrusion-actions">
                        <button id="reportIntrusion">
                            REPORT INCIDENT
                        </button>

                        <button id="dismissIntrusion">
                            DISMISS
                        </button>
                    </div>

                    <p id="intrusionStatus"></p>

                </div>
            `;

            document.body.appendChild(overlay);

            document.getElementById("dismissIntrusion")
                .addEventListener("click", () => this.close());

            document.getElementById("reportIntrusion")
                .addEventListener("click", () => this.report());
        },

        /* =========================================
           HAZIEL DOSSIER ACCESS
           MANDATORY FOR EVERY CHARACTER
        ========================================= */

        onHazielFileOpened(currentCharacter) {
            this.init();

            const name = this.getCharacterName(currentCharacter);

            if (!name) {
                console.error(
                    "SCP-007 // CHARACTER NAME NOT FOUND"
                );
                return;
            }

            /*
             * IMPORTANT:
             * Do NOT use isPermitted() here.
             * Every character must receive an intrusion
             * when opening Haziel's dossier.
             */

            if (this.currentCharacter !== name) {
                this.clearTimers();
                this.stopVisualInterference();
                this.close();

                this.currentCharacter = name;
                this.currentEvent = null;
                this.lastEvent = null;
                this.recentEvents = [];
                this.startTime = Date.now();
            }

            this.hazielFileOpen = true;

            // Immediate visual interference.
            this.activateHazielOverload(true);
            this.applyVisualDistortion(true);

            // Guaranteed message. No probability checks.
            this.trigger(true);

            // Random follow-up events remain restricted
            // to permitted personnel.
            if (this.isPermitted() && !this.timer) {
                this.scheduleNextEvent();
            }

            console.warn(
                "SCP-007 // MANDATORY HAZIEL FILE BREACH:",
                name
            );
        },

        onHazielFileClosed() {
            this.hazielFileOpen = false;

            if (document.body) {
                document.body.classList.remove(
                    "haziel-overload",
                    "visual-distortion",
                    "system-interference"
                );
            }

            clearTimeout(this.visualTimeout);
            clearTimeout(this.distortionTimeout);

            this.visualTimeout = null;
            this.distortionTimeout = null;
        },

        /* =========================================
           MESSAGE GENERATION
        ========================================= */

        getRandomMessage(force = false) {
            let pool = [];

            if (this.currentCharacter === "Matthew Collins") {

                pool = this.matthewMessages.map((text, index) => ({
                    id: "matthew-" + index,
                    type: "PERSONNEL REFERENCE",
                    text,
                    detail:
                        "An unidentified presence appears to be addressing this personnel member directly."
                }));

            } else if (this.currentCharacter === "Suma") {

                pool = this.sumaMessages.map((text, index) => ({
                    id: "suma-" + index,
                    type: "UNKNOWN MESSAGE",
                    text,
                    detail:
                        "A brief message was detected through an inactive system channel."
                }));

            } else if (this.isPermitted() || force) {

                pool = this.generalMessages.map((text, index) => ({
                    id: "general-" + index,
                    type: "UNKNOWN MESSAGE",
                    text,
                    detail:
                        "Unauthorized text was detected in the Foundation terminal."
                }));

            }

            if (!pool.length) return null;

            let available = pool.filter(message =>
                !this.recentEvents.includes(message.id)
            );

            if (!available.length) {
                this.recentEvents = [];
                available = pool;
            }

            return available[
                Math.floor(Math.random() * available.length)
                ];
        },

        /* =========================================
           RANDOM EVENT SCHEDULER
           NORMAL PAGE AREAS ONLY
        ========================================= */

        scheduleNextEvent() {
            if (!this.active || !this.isPermitted()) return;

            const delay = 45000 + Math.random() * 135000;

            this.timer = setTimeout(() => {
                this.timer = null;

                if (!this.active || !this.isPermitted()) return;

                const minutesActive =
                    (Date.now() - this.startTime) / 60000;

                let probability = Math.min(
                    0.18 + minutesActive * 0.012,
                    0.45
                );

                // Suma's random messages remain exceptionally rare.
                if (this.currentCharacter === "Suma") {
                    probability *= 0.12;
                }

                if (Math.random() < probability) {
                    this.trigger();
                }

                this.scheduleNextEvent();

            }, delay);
        },

        /* =========================================
           TRIGGER AN INTRUSION
        ========================================= */

        trigger(force = false) {
            if (!this.active) return;

            // Normal events require authorized personnel.
            // Forced events are used when Haziel's file opens.
            if (!force && !this.isPermitted()) return;

            this.createInterface();

            const message = this.getRandomMessage(force);

            if (!message) return;

            this.lastEvent = message.id;
            this.currentEvent = message;

            this.recentEvents.push(message.id);

            if (this.recentEvents.length > 5) {
                this.recentEvents.shift();
            }

            const overlay =
                document.getElementById("intrusionOverlay");

            const title =
                document.getElementById("intrusionMessage");

            const detail =
                document.getElementById("intrusionDetail");

            const status =
                document.getElementById("intrusionStatus");

            const reportButton =
                document.getElementById("reportIntrusion");

            if (!overlay || !title || !detail) {
                console.error(
                    "SCP-007 // INTRUSION INTERFACE NOT FOUND"
                );
                return;
            }

            title.textContent = message.text;
            detail.textContent = message.detail;

            if (status) {
                status.textContent = "";
            }

            if (reportButton) {
                reportButton.disabled = false;
            }

            overlay.classList.remove("active");

            void overlay.offsetWidth;

            overlay.classList.add("active");

            document.body.classList.remove("system-interference");

            void document.body.offsetWidth;

            document.body.classList.add("system-interference");

            setTimeout(() => {
                document.body.classList.remove(
                    "system-interference"
                );
            }, 1800);

            console.warn(
                "SCP-007 // ANOMALOUS ACTIVITY:",
                message.id
            );
        },

        /* =========================================
           INCIDENT REPORTING
        ========================================= */

        async report() {
            const button =
                document.getElementById("reportIntrusion");

            const status =
                document.getElementById("intrusionStatus");

            if (!this.currentEvent || !button || !status) {
                return;
            }

            if (!window.supabaseClient) {
                status.textContent =
                    "DATABASE CONNECTION UNAVAILABLE.";
                return;
            }

            button.disabled = true;

            status.textContent =
                "TRANSMITTING INCIDENT REPORT...";

            try {
                const { error } = await window.supabaseClient
                    .from("incident_reports")
                    .insert({
                        incident_code: "SCP-007-INT-" + Date.now(),
                        character_name: this.currentCharacter,
                        event_type: this.currentEvent.type,
                        message: this.currentEvent.text,
                        details: this.currentEvent.detail
                    });

                if (error) throw error;

                status.textContent =
                    "REPORT SUCCESSFULLY TRANSMITTED.";

                setTimeout(() => this.close(), 1800);

            } catch (error) {
                console.error(
                    "SCP-007 // INCIDENT REPORT ERROR:",
                    error
                );

                status.textContent =
                    "REPORT TRANSMISSION FAILED.";

                button.disabled = false;
            }
        },

        /* =========================================
           CLOSE INTERFACE
        ========================================= */

        close() {
            const overlay =
                document.getElementById("intrusionOverlay");

            if (overlay) {
                overlay.classList.remove("active");
            }

            if (document.body) {
                document.body.classList.remove(
                    "system-interference"
                );
            }
        }
    };

    /* =========================================
       GLOBAL ACCESS
    ========================================= */

    window.SCPIntrusion = Intrusion;

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            () => Intrusion.init()
        );
    } else {
        Intrusion.init();
    }

})();
