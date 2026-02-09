"use client";

import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCrew } from "@/hooks/use-iss-data";

export function CrewPanel() {
    const { crew } = useCrew();

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Crew Manifest
                </h2>
                <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded">
                    {crew?.length || 0} ABOARD
                </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                {(!crew || crew.length === 0) ? (
                    <div className="text-text-secondary text-xs p-2">Loading crew data...</div>
                ) : (
                    crew.map((member, i) => (
                        <div
                            key={i}
                            className="group flex items-center gap-3 p-2 rounded-md bg-surface-elevated/50 border border-border-subtle hover:border-brand-cyan/30 transition-colors"
                        >
                            <div className="w-8 h-8 rounded bg-surface-base flex items-center justify-center text-lg grayscale group-hover:grayscale-0 transition-all">
                                {/* Generic Astronaut Icon */}
                                <span className="opacity-50 group-hover:opacity-100">
                                    👨‍🚀
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-text-primary leading-tight">
                                    {member.name}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className={cn(
                                        "text-[10px] uppercase font-bold tracking-wider text-text-secondary"
                                    )}>
                                        {member.craft}
                                    </span>
                                </div>
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
