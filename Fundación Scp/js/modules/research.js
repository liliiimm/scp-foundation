
const researchRecords = [
    {
        id: "RA-001",
        title: "Anomalous Behavior Assessment",
        subject: "SCP-007",
        category: "Behavioral Analysis",
        researcher: "Suma",
        status: "Pending Review",
        clearance: 3,
        date: "CLASSIFIED",
        summary: "Research file awaiting scientific documentation.",
        observations: "No observations have been entered.",
        results: "Results pending.",
        conclusion: "Conclusion pending."
    },
    {
        id: "RA-002",
        title: "Prophetic Phenomena Investigation",
        subject: "SCP-3610",
        category: "Anomalous Properties",
        researcher: "Riku Heikkinen",
        status: "Pending Review",
        clearance: 3,
        date: "CLASSIFIED",
        summary: "Research file awaiting scientific documentation.",
        observations: "No observations have been entered.",
        results: "Results pending.",
        conclusion: "Conclusion pending."
    },
    {
        id: "RA-003",
        title: "Marine Anomaly Observation",
        subject: "SCP-087",
        category: "Behavioral Analysis",
        researcher: "Jesús Rivero Gato",
        status: "Pending Review",
        clearance: 3,
        date: "CLASSIFIED",
        summary: "Research file awaiting scientific documentation.",
        observations: "No observations have been entered.",
        results: "Results pending.",
        conclusion: "Conclusion pending."
    }
];

window.renderResearchArchives = function(content, character) {

    content.innerHTML = `
        <section class="research-module">

            <div class="module-intro">
                <p class="classification-label">
                    SCP FOUNDATION // SCIENTIFIC DEPARTMENT
                </p>

                <h2>RESEARCH ARCHIVES</h2>

                <p>
                    Classified scientific investigations and
                    anomalous research documentation.
                </p>
            </div>

            <div class="research-toolbar">

                <input
                    type="search"
                    id="researchSearch"
                    placeholder="Search by title, SCP designation or researcher..."
                >

                <select id="researchCategory">
                    <option value="all">ALL CATEGORIES</option>
                    <option value="Behavioral Analysis">BEHAVIORAL ANALYSIS</option>
                    <option value="Anomalous Properties">ANOMALOUS PROPERTIES</option>
                </select>

            </div>

            <div class="research-count" id="researchCount"></div>

            <div class="research-grid" id="researchGrid"></div>

        </section>
    `;

    const search = document.getElementById("researchSearch");
    const category = document.getElementById("researchCategory");
    const grid = document.getElementById("researchGrid");
    const count = document.getElementById("researchCount");

    function renderRecords() {

        const searchValue = search.value.toLowerCase();
        const categoryValue = category.value;

        const filtered = researchRecords.filter(record => {

            const matchesSearch =
                record.title.toLowerCase().includes(searchValue) ||
                record.subject.toLowerCase().includes(searchValue) ||
                record.researcher.toLowerCase().includes(searchValue);

            const matchesCategory =
                categoryValue === "all" ||
                record.category === categoryValue;

            return matchesSearch && matchesCategory;
        });

        count.textContent = `RECORDS FOUND: ${filtered.length}`;

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="empty-module">
                    NO MATCHING RESEARCH RECORDS FOUND.
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map(record => `

            <article class="research-card">

                <div class="research-card-top">
                    <span>${record.id}</span>
                    <span class="research-status">
                        ${record.status}
                    </span>
                </div>

                <h3>${record.title}</h3>

                <p>SUBJECT: ${record.subject}</p>
                <p>RESEARCHER: ${record.researcher}</p>
                <p>CATEGORY: ${record.category}</p>

                <button
                    class="research-open"
                    data-record="${record.id}"
                >
                    OPEN RESEARCH FILE
                </button>

            </article>

        `).join("");

        grid.querySelectorAll(".research-open").forEach(button => {

            button.addEventListener("click", function() {

                const record = researchRecords.find(
                    item => item.id === this.dataset.record
                );

                if (record) openResearchRecord(record);

            });

        });
    }

    function openResearchRecord(record) {

        grid.innerHTML = `
            <article class="research-detail">

                <button id="researchBack" class="research-back">
                    ← BACK TO ARCHIVES
                </button>

                <p class="classification-label">
                    ${record.id} // CLASSIFIED DOCUMENT
                </p>

                <h2>${record.title}</h2>

                <div class="research-detail-grid">

                    <div>
                        <span>SUBJECT DESIGNATION</span>
                        <strong>${record.subject}</strong>
                    </div>

                    <div>
                        <span>LEAD RESEARCHER</span>
                        <strong>${record.researcher}</strong>
                    </div>

                    <div>
                        <span>RESEARCH CATEGORY</span>
                        <strong>${record.category}</strong>
                    </div>

                    <div>
                        <span>DOCUMENT STATUS</span>
                        <strong>${record.status}</strong>
                    </div>

                    <div>
                        <span>CLEARANCE REQUIRED</span>
                        <strong>LEVEL ${record.clearance}</strong>
                    </div>

                    <div>
                        <span>DATE</span>
                        <strong>${record.date}</strong>
                    </div>

                </div>

                <section class="research-section">
                    <h3>SUMMARY</h3>
                    <p>${record.summary}</p>
                </section>

                <section class="research-section">
                    <h3>SCIENTIFIC OBSERVATIONS</h3>
                    <p>${record.observations}</p>
                </section>

                <section class="research-section">
                    <h3>RESULTS</h3>
                    <p>${record.results}</p>
                </section>

                <section class="research-section">
                    <h3>CONCLUSION</h3>
                    <p>${record.conclusion}</p>
                </section>

                <p class="research-warning">
                    SCP FOUNDATION // INTERNAL SCIENTIFIC DOCUMENT
                </p>

            </article>
        `;

        document.getElementById("researchBack")
            .addEventListener("click", renderRecords);
    }

    search.addEventListener("input", renderRecords);
    category.addEventListener("change", renderRecords);

    renderRecords();
};
