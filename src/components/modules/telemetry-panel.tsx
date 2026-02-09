"use client";

import { Activity, Gauge, Sun } from "lucide-react";
import { useISSPosition } from "@/hooks/use-iss-data";

export function TelemetryPanel() {
    const { position } = useISSPosition();

    // Formatters
    const altitude = position?.altitude ? position.altitude.toFixed(1) : "---.-";
    const velocity = position?.velocity ? Math.round(position.velocity).toLocaleString() : "---,---";
    const visibility = position?.visibility === "daylight" ? "Daylight" : "Eclipse";
    const lat = position?.latitude ? position.latitude.toFixed(4) : "---.----";
    const lon = position?.longitude ? position.longitude.toFixed(4) : "---.----";

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                <h2 className="text-sm font-bold text-brand-cyan uppercase tracking-widest">
                    Live Telemetry
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
                {/* Velocity Card */}
                <div className="col-span-1 bg-[#0a0e17] rounded-lg p-4 flex flex-col justify-center border border-border-subtle relative overflow-hidden">
                    <span className="text-[10px] uppercase text-text-secondary tracking-wider mb-1">Velocity</span>
                    <div className="flex items-baseline gap-1 relative z-10">
                        <span className="text-2xl lg:text-3xl font-mono font-bold text-white tracking-tighter">
                            {velocity.split(',')[0]}<span className="text-text-secondary">,</span>{velocity.split(',')[1]}
                        </span>
                        <span className="text-[10px] text-brand-cyan font-bold">km/h</span>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute right-0 bottom-0 w-16 h-16 bg-gradient-to-tl from-brand-cyan/10 to-transparent rounded-tl-full opacity-50" />
                </div>

                {/* Altitude Card */}
                <div className="col-span-1 bg-[#0a0e17] rounded-lg p-4 flex flex-col justify-center border border-border-subtle relative overflow-hidden">
                    <span className="text-[10px] uppercase text-text-secondary tracking-wider mb-1">Altitude</span>
                    <div className="flex items-baseline gap-1 relative z-10">
                        <span className="text-2xl lg:text-3xl font-mono font-bold text-white tracking-tighter">
                            {altitude}
                        </span>
                        <span className="text-[10px] text-brand-cyan font-bold">km</span>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute right-0 bottom-0 w-16 h-16 bg-gradient-to-tl from-brand-green/10 to-transparent rounded-tl-full opacity-50" />
                </div>

                {/* Coordinates Strip */}
                <div className="col-span-2 bg-[#0a0e17]/50 rounded-lg p-3 border border-border-subtle flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-text-muted uppercase">Latitude</span>
                        <span className="font-mono text-xs text-text-primary">{lat}° N</span>
                    </div>
                    <div className="w-px h-6 bg-border-subtle" />
                    <div className="flex flex-col text-right">
                        <span className="text-[10px] text-text-muted uppercase">Longitude</span>
                        <span className="font-mono text-xs text-text-primary">{lon}° E</span>
                    </div>
                    <div className="w-px h-6 bg-border-subtle" />
                    <div className="flex flex-col text-right">
                        <span className="text-[10px] text-text-muted uppercase">Status</span>
                        <span className="font-mono text-xs text-brand-green">Nominal</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
