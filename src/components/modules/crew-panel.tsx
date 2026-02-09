"use client";

import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCrew } from "@/hooks/use-iss-data";

export function CrewPanel() {
    const { crew } = useCrew();

    return (
        <div className="h-full flex flex-col">
            <div className="mb-4">
                <h2 className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                    Expedition 70 Crew
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                {(!crew || crew.length === 0) ? (
                    <div className="text-text-secondary text-xs p-2">Loading crew data...</div>
                ) : (
                    crew.map((member, i) => (
                        <div
                            key={i}
                            className="group flex items-center gap-3 p-3 rounded-lg bg-[#0a0e17] border border-border-subtle/50 hover:border-brand-cyan/30 transition-colors"
                        >
                            <div className="w-10 h-10 rounded bg-surface-elevated flex items-center justify-center overflow-hidden border border-border-subtle relative">
                                {/* Placeholder image style */}
                                <User className="w-6 h-6 text-text-secondary opacity-50" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <span className="text-sm font-bold text-text-primary leading-tight">
                                    {member.name}
                                </span>
                                <span className="text-[10px] text-text-muted mt-0.5">
                                    Flight Engineer
                                </span>
                            </div>
                            <div className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-surface-elevated border border-border-subtle text-text-secondary">
                                {member.craft === 'ISS' ? 'NASA' : member.craft}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function getFlagEmoji(countryCode: string) {
    const code = countryCode.toUpperCase();
    return code.replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

function getAgencyColor(agency: string) {
    switch (agency) {
        case "NASA": return "text-blue-400";
        case "Roscosmos": return "text-red-400";
        case "ESA": return "text-brand-cyan";
        case "JAXA": return "text-white";
        default: return "text-text-secondary";
    }
}
