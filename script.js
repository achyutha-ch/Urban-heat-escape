/* =========================================
   URBAN HEAT ESCAPE ASSISTANT
   Prototype JavaScript
========================================= */


/* =========================================
   LOCATION DATA
========================================= */

const locationData = {

    campus: {
        temperature: 32,
        risk: "Medium",
        green: 42,
        shade: 58
    },

    city: {
        temperature: 35,
        risk: "High",
        green: 24,
        shade: 35
    },

    residential: {
        temperature: 33,
        risk: "Medium",
        green: 36,
        shade: 49
    }

};


/* =========================================
   CHANGE LOCATION
========================================= */

function changeLocation() {

    const selected =
        document.getElementById("locationSelect").value;

    const data = locationData[selected];

    document.getElementById("temperatureValue").textContent =
        `${data.temperature}°C`;

    document.getElementById("riskValue").textContent =
        data.risk;

    document.getElementById("greenValue").textContent =
        `${data.green}%`;

    document.getElementById("shadeValue").textContent =
        `${data.shade}%`;

}


/* =========================================
   SCROLL TO SECTION
========================================= */

function scrollToSection(id) {

    const section = document.getElementById(id);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================
   HEAT ZONE INFORMATION
========================================= */

function showZone(name, risk, shade) {

    const info =
        document.getElementById("zoneInfo");

    let recommendation = "";

    if (risk === "High") {

        recommendation =
            "Consider increasing tree cover, shaded walkways, and reducing heat-absorbing surfaces in this area.";

    } else if (risk === "Medium") {

        recommendation =
            "Additional shade and greenery could improve thermal comfort.";

    } else {

        recommendation =
            "This area has relatively good shade and green coverage.";

    }

    info.innerHTML = `

        <h3>${name}</h3>

        <p>
            <strong>Heat Risk:</strong>
            ${risk}
        </p>

        <p>
            <strong>Shade Availability:</strong>
            ${shade}
        </p>

        <p style="margin-top:15px;">
            ${recommendation}
        </p>

    `;

}


/* =========================================
   ROUTE RECOMMENDATION
========================================= */

function findCoolerRoute() {

    const start =
        document.getElementById("startPoint").value;

    const destination =
        document.getElementById("destination").value;

    const result =
        document.getElementById("routeResult");

    const title =
        document.getElementById("routeTitle");

    const description =
        document.getElementById("routeDescription");

    const distance =
        document.getElementById("routeDistance");

    const shade =
        document.getElementById("routeShade");

    const heat =
        document.getElementById("routeHeat");

    const time =
        document.getElementById("routeTime");


    /*
        Prototype decision-support logic.

        In a future version, this could be replaced
        by a real routing + environmental dataset.
    */

    if (
        start === "Parking Area" ||
        destination === "Central Garden"
    ) {

        title.textContent =
            "Green Corridor Route";

        description.textContent =
            `For ${start} → ${destination}, the AI recommends a route that passes through greener areas and provides greater shade coverage.`;

        distance.textContent =
            "900 m";

        shade.textContent =
            "76%";

        heat.textContent =
            "Low";

        time.textContent =
            "12 min";

    } else {

        title.textContent =
            "Shaded Campus Route";

        description.textContent =
            `For ${start} → ${destination}, the AI recommends a slightly greener route with better shade coverage and lower estimated heat exposure.`;

        distance.textContent =
            "850 m";

        shade.textContent =
            "72%";

        heat.textContent =
            "Low";

        time.textContent =
            "11 min";

    }


    result.classList.remove("hidden");

    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================================
   AI RESPONSES
========================================= */

function generateAIResponse(question) {

    const q =
        question.toLowerCase();


    if (
        q.includes("tree") ||
        q.includes("trees") ||
        q.includes("green")
    ) {

        return `
            Based on the prototype data, areas with low shade
            and high paved-surface coverage should receive
            priority for additional greenery.

            🌳 Recommended actions:

            • Plant shade-producing trees along pedestrian paths.
            • Connect isolated green spaces.
            • Create shaded rest areas.
            • Replace selected paved surfaces with permeable
              or heat-reducing materials.

            These measures can support a more heat-resilient
            campus.
        `;

    }


    if (
        q.includes("parking") ||
        q.includes("hot")
    ) {

        return `
            The parking area is classified as a high heat-risk
            zone in this prototype because it contains large
            paved surfaces and has limited shade.

            🌱 Possible improvements include:

            • Increasing tree cover around parking spaces.
            • Adding shaded pedestrian paths.
            • Using heat-reducing surface materials.
            • Creating nearby green buffers.

            Note: This prototype uses sample data and does not
            represent a real-time heat measurement.
        `;

    }


    if (
        q.includes("route") ||
        q.includes("walk") ||
        q.includes("path")
    ) {

        return `
            For heat-aware travel, the prototype prioritizes
            routes with greater shade and greenery rather than
            simply selecting the shortest path.

            🌿 The recommended route may be slightly longer,
            but it has lower estimated heat exposure.

            This demonstrates how environmental factors can
            be incorporated into route decision-making.
        `;

    }


    if (
        q.includes("reduce") ||
        q.includes("campus") ||
        q.includes("college")
    ) {

        return `
            A campus can reduce urban heat through several
            measures:

            🌳 Increase tree canopy.
            🏡 Create connected green corridors.
            ☀️ Reduce large heat-absorbing paved areas.
            🪑 Add shaded seating and walking areas.
            💧 Improve water-efficient landscaping.

            AI can help prioritize locations where these
            interventions may have the greatest potential impact.
        `;

    }


    if (
        q.includes("climate") ||
        q.includes("sustain")
    ) {

        return `
            Urban heat adaptation supports climate resilience
            by helping communities understand where heat exposure
            may be greater and where green infrastructure could
            improve environmental conditions.

            This project primarily aligns with SDG 11:
            Sustainable Cities and Communities, with connections
            to SDG 13: Climate Action.
        `;

    }


    return `
        I can help you with:

        🌡️ Urban heat
        🚶 Cooler route recommendations
        🌳 Green infrastructure
        🏙️ Sustainable cities
        🌍 Climate adaptation

        Try asking:
        "How can my campus reduce urban heat?"
    `;

}


/* =========================================
   ADD CHAT MESSAGE
========================================= */

function addMessage(text, type) {

    const chat =
        document.getElementById("chatMessages");


    const message =
        document.createElement("div");


    if (type === "user") {

        message.className =
            "message user-message";

        message.innerHTML = `

            <div class="bubble">
                ${text}
            </div>

        `;

    } else {

        message.className =
            "message ai-message";

        message.innerHTML = `

            <div class="avatar">
                🤖
            </div>

            <div class="bubble">
                ${text.replace(/\n/g, "<br>")}
            </div>

        `;

    }


    chat.appendChild(message);

    chat.scrollTop =
        chat.scrollHeight;

}


/* =========================================
   SEND MESSAGE
========================================= */

function sendMessage() {

    const input =
        document.getElementById("userInput");

    const question =
        input.value.trim();


    if (!question) {
        return;
    }


    addMessage(
        question,
        "user"
    );


    input.value = "";


    /*
        Small delay to simulate
        AI processing.
    */

    setTimeout(() => {

        const response =
            generateAIResponse(question);

        addMessage(
            response,
            "ai"
        );

    }, 600);

}


/* =========================================
   SUGGESTED QUESTIONS
========================================= */

function askQuestion(question) {

    document.getElementById("userInput").value =
        question;

    sendMessage();

}


/* =========================================
   ENTER KEY
========================================= */

function handleEnter(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

}


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        changeLocation();

    }
);