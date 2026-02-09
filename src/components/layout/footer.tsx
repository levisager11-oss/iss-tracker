"use client";

import { cn } from "@/lib/utils";

// Placeholder data - will be replaced with real telemetry later
const TELEMETRY_ITEMS = [
    { label: "Inclination", value: "51.64°" },
    { label: "Orbital Period", value: "92.68 min" },
    { label: "Orbits Today", value: "15" },
    { label: "Total Orbits", value: "148,392" },
    { label: "Perigee", value: "418 km" },
    { label: "Apogee", value: "422 km" },
    { label: "Beta Angle", value: "+34.5°" },
    { label: "Solar Cycle", value: "25 (Active)" },
];

export function Footer() {
    return (
        <footer className="h-10 border-t border-border-subtle bg-surface-base fixed bottom-0 left-0 right-0 z-50 flex items-center overflow-hidden">
            <div className="flex items-center w-full animate-marquee whitespace-nowrap">
                {TELEMETRY_ITEMS.map((item, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex items-center gap-2 px-6 border-r border-border-subtle/30 cursor-default hover:bg-surface-elevated transition-colors h-10"
                        )}
                    >
                        <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
                            {item.label}
                        </span>
                        <span className="font-mono text-brand-cyan text-xs">
                            {item.value}
                        </span>
                    </div>
                ))}
                {/* Duplicate for seamless scrolling effect if needed later, or just fill width for now */}
                {/* For now, just static flex, we can add marquee animation later if content overflows */}
            </div>
        </footer>
    );
}
