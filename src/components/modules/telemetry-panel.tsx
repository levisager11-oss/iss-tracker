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
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Live Telemetry
                </h2>
                <Sun className="w-4 h-4 text-brand-amber animate-pulse-slow" />
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
                {/* Altitude Gauge Placeholder */}
                <div className="col-span-2 bg-surface-base/40 rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden border border-border-subtle group hover:border-brand-cyan/20 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-[10px] uppercase text-text-secondary mb-2">Altitude</span>
                    <span className="text-4xl font-mono font-bold text-brand-cyan tracking-tighter">
                        {altitude}
                    </span>
                    <span className="text-xs text-text-secondary mt-1">km</span>

                    {/* Simple CSS Arc Gauge Placeholder */}
                    <div className="w-full h-2 bg-surface-elevated mt-4 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-green via-brand-cyan to-brand-amber w-[70%]" />
                    </div>
                </div>

                {/* Velocity */}
                <div className="bg-surface-base/40 rounded-lg p-3 flex flex-col justify-center border border-border-subtle hover:border-brand-cyan/20 transition-all">
                    <span className="text-[10px] uppercase text-text-secondary flex items-center gap-1">
                        <Gauge className="w-3 h-3" /> Velocity
                    </span>
                    <span className="text-2xl font-mono font-bold text-text-primary mt-1">
                        {velocity}
                    </span>
                    <span className="text-[10px] text-text-muted">km/h</span>
                </div>

                {/* Visibility */}
                <div className="bg-surface-base/40 rounded-lg p-3 flex flex-col justify-center border border-border-subtle hover:border-brand-cyan/20 transition-all">
                    <span className="text-[10px] uppercase text-text-secondary flex items-center gap-1">
                        <Sun className="w-3 h-3" /> Visibility
                    </span>
                    <span className="text-lg font-bold text-brand-amber mt-1">
                        {visibility}
                    </span>
                    <span className="text-[10px] text-text-muted">{position?.visibility}</span>
                </div>

                {/* Coordinates */}
                <div className="col-span-2 flex items-center justify-between bg-surface-base/20 rounded p-2 border border-border-subtle/50">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-text-secondary uppercase">Latitude</span>
                        <span className="font-mono text-sm">{lat}° N</span>
                    </div>
                    <div className="w-px h-full bg-border-subtle" />
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-text-secondary uppercase">Longitude</span>
                        <span className="font-mono text-sm">{lon}° E</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
