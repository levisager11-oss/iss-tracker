import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0e17",
                surface: {
                    base: "#0c1322",
                    elevated: "#111d35",
                },
                border: {
                    subtle: "#1a2744",
                    active: "rgba(0, 212, 255, 0.2)",
                },
                brand: {
                    cyan: "#00d4ff",
                    amber: "#ff9f43",
                    green: "#00ff88",
                    red: "#ff3b5c",
                },
                text: {
                    primary: "#e8edf5",
                    secondary: "#5a6a8a",
                    muted: "#6b7280",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                mono: ["var(--font-jetbrains-mono)", "monospace"],
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
            },
        },
    },
    plugins: [],
} satisfies Config;
