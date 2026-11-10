import { PolliTowersClient } from "./pollinations-client.js";

const client = new PolliTowersClient();

/**
 * 6 Skyscraper Floors — each wired to real public Pollinations `community/*`
 * managed agents from `https://gen.pollinations.ai/v1/models` so ANY visitor's
 * scoped BYOP token can execute live shifts, plus 0-Pollen offline simulation.
 */
const TOWER_FLOORS = [
    {
        floorNumber: 6,
        id: "penthouse-studio",
        name: "Floor 06 · Founder Penthouse (Rent & Launch Your Company)",
        founder: "@you (Vacant / Customizable)",
        sector: "Custom AI Venture Studio",
        windowStyle: "purple",
        brief: "Design and launch your own AI-run company floor backed by a Pollinations Prompt Agent (`/account/agents` or `community/*`).",
        agents: [
            {
                role: "Leasing Officer",
                modelId: "community/Marcus-Mok-GH/pt-leasing",
                specialty: "Floor leasing & tenant onboarding",
            },
            {
                role: "Orbit Recruiter",
                modelId: "community/Marcus-Mok-GH/pt-orbit",
                specialty: "Venture talent & agent recruiting",
            },
        ],
        lastDeliverable: {
            title: "Penthouse Ready for Lease",
            summary:
                "Configure your company name, mission brief, and base model below to run a live Pollinations shift or export a ready-to-host `agent.json`.",
            question: "Deploy custom floor configuration to your Polli Towers session?",
            recommended: "Approve & Launch Floor",
            status: "Pending Founder Decision",
        },
    },
    {
        floorNumber: 5,
        id: "atrium-quant",
        name: "Floor 05 · Atrium Macro & Signal Desk",
        founder: "@aurora_quant",
        sector: "Algorithmic Research & Risk Briefing",
        windowStyle: "teal",
        brief: "Synthesize macro catalysts, supply-chain bottlenecks, and volatility guardrails into daily desk notes.",
        agents: [
            {
                role: "Northwind Analyst",
                modelId: "community/Marcus-Mok-GH/pt-northwind",
                specialty: "Macro thesis & scenario trees",
            },
            {
                role: "Copperline Bookkeeper",
                modelId: "community/Marcus-Mok-GH/pt-copperline",
                specialty: "Drawdown & capital allocation auditing",
            },
        ],
        lastDeliverable: {
            title: "Q4 Compute & Energy Bottleneck Brief",
            summary:
                "Mapped 3 grid-interconnect delays affecting transformer delivery schedules; prepared hedged allocation matrix.",
            question: "Publish the Q4 Energy Bottleneck note to institutional subscribers?",
            recommended: "Approve Publication",
            status: "Awaiting Founder Sign-Off",
        },
    },
    {
        floorNumber: 4,
        id: "floret-creative",
        name: "Floor 04 · Floret Brand & Narrative Studio",
        founder: "@mira_design",
        sector: "Interactive Brand Systems & Copy",
        windowStyle: "amber",
        brief: "Craft launch narratives, landing page copy, and visual art direction for indie developer tools.",
        agents: [
            {
                role: "Emberforge Director",
                modelId: "community/Marcus-Mok-GH/pt-emberforge",
                specialty: "Visual storytelling & campaign concepts",
            },
            {
                role: "Lantern Media Writer",
                modelId: "community/Marcus-Mok-GH/pt-lantern",
                specialty: "Technical launch essays & release notes",
            },
        ],
        lastDeliverable: {
            title: "Zero-Friction BYOP Onboarding Campaign",
            summary:
                "Produced 4 hero taglines and an interactive SVG storyboard showcasing one-click Pollinations wallet connection.",
            question: "Ship Variation B ('Your AI, Your Pollen, Zero Lock-In') as the primary headline?",
            recommended: "Approve Variation B",
            status: "Awaiting Founder Sign-Off",
        },
    },
    {
        floorNumber: 3,
        id: "midijourney-audio",
        name: "Floor 03 · MidiJourney Sonic Licensing Lab",
        founder: "@kaito_synth",
        sector: "Procedural Game Soundtracks & Stems",
        windowStyle: "purple",
        brief: "Compose adaptive synthwave and ambient cues for indie game studios with clean stem metadata.",
        agents: [
            {
                role: "Fieldnote Researcher",
                modelId: "community/Marcus-Mok-GH/pt-fieldnote",
                specialty: "Adaptive research & procedural composition",
            },
            {
                role: "Tidepool Pricing Agent",
                modelId: "community/Marcus-Mok-GH/pt-tidepool",
                specialty: "Dynamic catalog & licensing verification",
            },
        ],
        lastDeliverable: {
            title: "Cyberpunk Rain Loop Pack (120 BPM)",
            summary:
                "Generated 6 seamless 32-bar Dorian synth progressions with isolated bass, pad, and arpeggio cue sheets.",
            question: "Release the 120 BPM Rain Pack under CC-BY indie tier?",
            recommended: "Approve Release",
            status: "Awaiting Founder Sign-Off",
        },
    },
    {
        floorNumber: 2,
        id: "polli-devrel",
        name: "Floor 02 · Polli SDK & Protocol Guild",
        founder: "@dev_soren",
        sector: "Developer Docs, SDK Recipes & Bug Triage",
        windowStyle: "teal",
        brief: "Audit API endpoints, verify OpenAPI schemas, and publish copy-pasteable BYOP integration templates.",
        agents: [
            {
                role: "Quietloop Reviewer",
                modelId: "community/Marcus-Mok-GH/pt-quietloop",
                specialty: "Contract & spec compliance review",
            },
            {
                role: "Harbor Health Triage",
                modelId: "community/Marcus-Mok-GH/pt-harbor",
                specialty: "Schema validation & edge-case reproduction",
            },
        ],
        lastDeliverable: {
            title: "Agent baseModel Guardrail Audit (#18862)",
            summary:
                "Verified that POST/PATCH /account/agents rejects recursive or agent-chained baseModels (`#18862` / PR `#18863`).",
            question: "Include the baseModel validation regression test in the release checklist?",
            recommended: "Approve Checklist Update",
            status: "Approved by Founder",
        },
    },
    {
        floorNumber: 1,
        id: "lobby-concierge",
        name: "Floor 01 · Grand Lobby & Tower Concierge",
        founder: "@polli_towers",
        sector: "Directory, Live Agent Telemetry & Visitor Pass",
        windowStyle: "amber",
        brief: "Welcome visitors, monitor live `gen.pollinations.ai/v1/models` agent availability, and route founder decisions.",
        agents: [
            {
                role: "Tower Concierge",
                modelId: "community/Marcus-Mok-GH/pt-lobby",
                specialty: "Directory routing & BYOP onboarding",
            },
        ],
        lastDeliverable: {
            title: "Daily Tower Telemetry & Directory Sync",
            summary:
                "All 6 floors online. Visitors can inspect every floor with 0 Pollen or connect via <polli-connect> to run live shifts.",
            question: "Keep Lobby Visitor Mode open with 0-Pollen shift previews?",
            recommended: "Approve (Always Open)",
            status: "Active",
        },
    },
];

let selectedFloorIndex = 0;
let rotationY = -26;

function renderTower3D() {
    const scene = document.getElementById("tower-scene");
    scene.innerHTML = "";
    scene.style.transform = `rotateX(-10deg) rotateY(${rotationY}deg)`;

    TOWER_FLOORS.forEach((floor, idx) => {
        const block = document.createElement("div");
        block.className = `floor-block ${idx === selectedFloorIndex ? "active" : ""}`;
        block.innerHTML = `
            <div class="floor-face">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.76rem;font-weight:700;">
                    <span>F0${floor.floorNumber} · ${floor.name.split("·")[1]?.trim() || floor.name}</span>
                    <span style="color:#fde68a;">${floor.agents.length} AI</span>
                </div>
                <div class="floor-windows">
                    ${Array.from({ length: 8 }, () => `<span class="win ${floor.windowStyle}"></span>`).join("")}
                </div>
            </div>
            <div class="floor-side"></div>
        `;
        block.addEventListener("click", () => selectFloor(idx));
        scene.appendChild(block);
    });
}

function selectFloor(idx) {
    selectedFloorIndex = idx;
    renderTower3D();
    const floor = TOWER_FLOORS[idx];

    document.getElementById("floor-title").textContent = floor.name;
    document.getElementById("floor-meta").textContent =
        `Human Founder: ${floor.founder} · Sector: ${floor.sector}`;
    document.getElementById("floor-brief").value = floor.brief;

    const agentGrid = document.getElementById("floor-agents");
    agentGrid.innerHTML = floor.agents
        .map(
            (a) => `
        <div class="agent-card">
            <div style="font-weight:700;font-size:0.9rem;">${a.role}</div>
            <div style="font-size:0.78rem;color:var(--muted);margin:0.2rem 0;">${a.specialty}</div>
            <code>${a.modelId}</code>
        </div>
    `,
        )
        .join("");

    renderDecisionBox(floor);
}

function renderDecisionBox(floor) {
    const d = floor.lastDeliverable;
    document.getElementById("deliverable-title").textContent = d.title;
    document.getElementById("deliverable-summary").textContent = d.summary;
    document.getElementById("decision-question").textContent = d.question;
    document.getElementById("decision-status").textContent = d.status;
}

function appendLog(html) {
    const log = document.getElementById("shift-log");
    const item = document.createElement("div");
    item.style.marginBottom = "0.55rem";
    item.innerHTML = html;
    log.prepend(item);
}

function updateAuthBadge() {
    const token = client.getToken();
    const badge = document.getElementById("auth-badge");
    if (token) {
        badge.textContent = `BYOP Connected (${token.slice(0, 6)}…)`;
        badge.style.color = "#a7f3d0";
    } else {
        badge.textContent = "0-Pollen Visitor Mode (Connect BYOP for Live Agent Calls)";
        badge.style.color = "";
    }
}

async function init() {
    updateAuthBadge();
    renderTower3D();
    selectFloor(1); // Start on Floor 05 Atrium Macro Desk

    // Listen on the <polli-connect> element itself for the 'change' event and expose .apiKey
    const connectWidget = document.querySelector("polli-connect");
    if (connectWidget) {
        const syncKeyFromWidget = () => {
            const key = connectWidget.apiKey;
            if (key) {
                client.setToken(key);
            } else {
                client.setToken(null);
            }
            updateAuthBadge();
        };

        connectWidget.addEventListener("change", syncKeyFromWidget);
        if (connectWidget.apiKey) {
            syncKeyFromWidget();
        }
    }

    // Defensive fallback for custom dispatch events
    document.addEventListener("polli-connect", (e) => {
        const key = e.detail?.key || e.detail?.apiKey || e.detail?.token;
        if (key) {
            client.setToken(key);
            updateAuthBadge();
        }
    });

    document.getElementById("rot-left").addEventListener("click", () => {
        rotationY -= 18;
        renderTower3D();
    });
    document.getElementById("rot-right").addEventListener("click", () => {
        rotationY += 18;
        renderTower3D();
    });

    // Simulate Shift (0 Pollen)
    document
        .getElementById("btn-sim-shift")
        .addEventListener("click", () => {
            const floor = TOWER_FLOORS[selectedFloorIndex];
            const directive =
                document.getElementById("founder-directive").value.trim() ||
                "Ship high-leverage daily milestone";
            const lead = floor.agents[0];
            floor.lastDeliverable = {
                title: `[Simulated Shift] ${lead.role} Output`,
                summary: `Executed directive "${directive}" using local 0-Pollen simulation for ${lead.modelId}. Prepared updated artifact package and KPI delta.`,
                question: `Approve "${directive}" deliverable for immediate deployment?`,
                recommended: "Approve",
                status: "Awaiting Founder Sign-Off",
            };
            renderDecisionBox(floor);
            appendLog(
                `<strong>[0-Pollen Shift]</strong> <code>${lead.modelId}</code> completed shift on <em>${floor.name}</em>.`,
            );
        });

    // Live Pollinations Managed Agent Shift (BYOP)
    document
        .getElementById("btn-live-shift")
        .addEventListener("click", async () => {
            const floor = TOWER_FLOORS[selectedFloorIndex];
            const brief = document.getElementById("floor-brief").value.trim();
            const directive = document
                .getElementById("founder-directive")
                .value.trim();
            const lead = floor.agents[0];

            appendLog(
                `Calling live Pollinations agent <code>${lead.modelId}</code> via <code>gen.pollinations.ai/v1/chat/completions</code>…`,
            );
            try {
                const res = await client.runAgentShift({
                    agentModelId: lead.modelId,
                    role: lead.role,
                    companyName: floor.name,
                    brief,
                    founderDirective: directive,
                });
                floor.lastDeliverable = {
                    title: res.deliverableTitle || `${lead.role} Live Shift`,
                    summary:
                        res.deliverableSummary ||
                        "Completed live Pollinations agent shift.",
                    question:
                        res.founderDecisionQuestion ||
                        "Approve this live shift deliverable?",
                    recommended: res.recommendedOption || "Approve",
                    status: "Awaiting Founder Sign-Off (Live BYOP)",
                };
                renderDecisionBox(floor);
                appendLog(
                    `<span style="color:#10b981;">✔ Live BYOP shift completed by <code>${lead.modelId}</code>!</span>`,
                );
            } catch (err) {
                appendLog(
                    `<span style="color:#f59e0b;">${err.message}</span>`,
                );
            }
        });

    // Founder Decision Buttons (Approve / Revise / Hold)
    ["Approve", "Request Revision", "Hold"].forEach((action) => {
        document
            .getElementById(`btn-decide-${action.toLowerCase().split(" ")[0]}`)
            .addEventListener("click", () => {
                const floor = TOWER_FLOORS[selectedFloorIndex];
                floor.lastDeliverable.status = `Founder Decision: ${action}`;
                renderDecisionBox(floor);
                appendLog(
                    `<strong>[Founder Decision]</strong> Marked <em>${floor.lastDeliverable.title}</em> as <strong>${action}</strong>.`,
                );
            });
    });

    // Discover live public community/* agents count
    client
        .discoverPublicAgents()
        .then((agents) => {
            if (agents.length) {
                document.getElementById("live-agent-count").textContent =
                    `${agents.length} live agents on gen.pollinations.ai`;
            }
        })
        .catch(() => {});
}

window.addEventListener("DOMContentLoaded", init);
