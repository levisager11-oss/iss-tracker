"use client";

import { Satellite, Settings, HelpCircle } from "lucide-react";
import { format, differenceInSeconds } from "date-fns";
import { useTime } from "@/hooks/use-time";
import { cn } from "@/lib/utils";

const LAUNCH_DATE = new Date("1998-11-20T06:40:00Z");

export function Header() {
    const now = useTime();

    // Calculate MET (Mission Elapsed Time)
    const totalSeconds = differenceInSeconds(now, LAUNCH_DATE);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const metString = `${days.toString().padStart(5, "0")} ${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;

    return (
        <header className="h-12 border-b border-border-subtle bg-surface-base flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
            {/* Left: Branding */}
            <div className="flex items-center gap-3">
                <Satellite className="w-5 h-5 text-brand-cyan" />
                <div className="flex flex-col leading-none">
                    <span className="font-bold tracking-widest text-sm text-text-primary">
                        ISS TRACKING SYSTEM
                    </span>
                    <div className="flex gap-2 text-[10px] text-brand-cyan font-mono uppercase">
                        <span>Orbital Inclination: 51.64°</span>
                        <span className="text-text-secondary">Rev: 92.68 Min</span>
                    </div>
                </div>
            </div>

            {/* Center: Clocks */}
            <div className="hidden md:flex items-center gap-8">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-text-secondary uppercase tracking-wider">
                        Mission Elapsed Time
                    </span>
                    <span className="font-mono text-xl text-brand-cyan font-bold tracking-wide leading-none">
                        {metString}
                    </span>
                </div>
                <div className="w-px h-8 bg-border-subtle" />
                <div className="flex flex-col items-start">
                    <span className="text-[10px] text-text-secondary uppercase tracking-wider">
                        Universal Time (UTC)
                    </span>
                    <span className="font-mono text-xl text-text-primary font-bold tracking-wide leading-none">
                        {format(now, "HH:mm:ss")}
                    </span>
                </div>
            </div>

            {/* Right: Status & Controls */}
            <div className="flex items-center gap-4">
                <button className="text-text-secondary hover:text-brand-cyan transition-colors">
                    <Settings className="w-4 h-4" />
                </button>
                <button className="text-text-secondary hover:text-brand-cyan transition-colors">
                    <HelpCircle className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-900/20 border border-brand-green/30 rounded">
                    <div className="relative">
                        <div className="w-2 h-2 bg-brand-green rounded-full animate-ping-slow absolute top-0 left-0 opacity-75" />
                        <div className="w-2 h-2 bg-brand-green rounded-full relative z-10" />
                    </div>
                    <span className="text-[11px] font-bold text-brand-green tracking-wider">
                        NOMINAL
                    </span>
                </div>
            </div>
        </header>
    );
}
