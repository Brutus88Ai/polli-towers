/**
 * Polli Towers — Pollinations Managed Agents & BYOP Client
 * - Runs shifts on real public Pollinations managed agents (`community/*`) via
 *   POST https://gen.pollinations.ai/v1/chat/completions & /v1/responses using
 *   any visitor's scoped <polli-connect> BYOP token.
 * - Supports founder-side agent provisioning via GET/POST/PATCH
 *   https://gen.pollinations.ai/account/agents (`account:keys` scope).
 * - Zero-Pollen local shift simulation when no token is connected.
 */

export const POLLINATIONS_API_BASE = "https://gen.pollinations.ai";
export const POLLINATIONS_ENTER_BASE = "https://enter.pollinations.ai";
export const APP_CLIENT_ID = "pk_MGURr39qJEnVNdW5";

const STORAGE_KEY = "polli_towers_byop_token";

export class PolliTowersClient {
    constructor() {
        this.apiBase = POLLINATIONS_API_BASE;
        this.enterBase = POLLINATIONS_ENTER_BASE;
    }

    getToken() {
        const direct = localStorage.getItem(STORAGE_KEY);
        if (direct) return direct;
        for (const k of [
            "polli:key",
            "pollinations_api_key",
            "polli-connect-token",
        ]) {
            const v = localStorage.getItem(k);
            if (v) return v;
        }
        return null;
    }

    setToken(token) {
        if (!token) {
            localStorage.removeItem(STORAGE_KEY);
            return;
        }
        localStorage.setItem(STORAGE_KEY, token.trim());
    }

    /**
     * Discover live public Pollinations agents (`community/*`) from /v1/models
     */
    async discoverPublicAgents() {
        const response = await fetch(`${this.apiBase}/v1/models`);
        if (!response.ok) return [];
        const body = await response.json();
        const models = Array.isArray(body?.data) ? body.data : [];
        return models.filter(
            (m) =>
                typeof m.id === "string" &&
                (m.id.startsWith("community/") || m.agent === true),
        );
    }

    /**
     * Run a company agent shift on a Pollinations managed agent (`community/*`)
     * using the visitor's BYOP key via /v1/chat/completions.
     */
    async runAgentShift({ agentModelId, role, companyName, brief, founderDirective }) {
        const token = this.getToken();
        if (!token) {
            throw new Error(
                "Connect with Pollinations (<polli-connect>) to run live BYOP agent shifts, or click 'Simulate Shift (0 Pollen)'.",
            );
        }

        const messages = [
            {
                role: "system",
                content: [
                    `You are the ${role} agent at ${companyName}, a floor inside Polli Towers.`,
                    "Produce a concise daily shift report in JSON with keys:",
                    "- deliverableTitle: short title of what you produced this shift",
                    "- deliverableSummary: 2-3 sentence concrete output",
                    "- founderDecisionQuestion: 1 high-impact yes/no or A/B decision waiting for the human founder",
                    "- recommendedOption: your recommended choice",
                ].join("\n"),
            },
            {
                role: "user",
                content: `Company brief: ${brief}\nFounder directive for this shift: ${founderDirective || "Execute next priority milestone."}`,
            },
        ];

        const response = await fetch(`${this.apiBase}/v1/chat/completions`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: agentModelId,
                response_format: { type: "json_object" },
                messages,
            }),
        });

        if (!response.ok) {
            const err = await response.text().catch(() => "");
            throw new Error(
                `Agent ${agentModelId} returned HTTP ${response.status}: ${err}`,
            );
        }
        const data = await response.json();
        const raw = data.choices?.[0]?.message?.content || "{}";
        try {
            return JSON.parse(raw);
        } catch {
            return {
                deliverableTitle: `${role} Shift Update`,
                deliverableSummary: raw.slice(0, 320),
                founderDecisionQuestion:
                    "Approve publishing this shift's output to clients?",
                recommendedOption: "Approve",
            };
        }
    }

    /**
     * Founder-only: List and create custom Prompt Agents via /account/agents
     * (requires an API key with `account:keys` permission).
     */
    async listAccountAgents() {
        const token = this.getToken();
        if (!token) return [];
        const response = await fetch(`${this.apiBase}/account/agents`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) return [];
        const body = await response.json();
        return Array.isArray(body?.data) ? body.data : [];
    }

    async createAccountAgent({ slug, name, description, baseModel, systemPrompt, isPublic = true }) {
        const token = this.getToken();
        if (!token) {
            throw new Error(
                "Connect a Pollinations key with account:keys permission to create a hosted agent, or download agent.json.",
            );
        }
        const response = await fetch(`${this.apiBase}/account/agents`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                slug,
                name,
                description,
                baseModel,
                systemPrompt,
                public: isPublic,
            }),
        });
        if (!response.ok) {
            const err = await response.text().catch(() => "");
            throw new Error(
                `POST /account/agents returned ${response.status}: ${err}`,
            );
        }
        return response.json();
    }
}
