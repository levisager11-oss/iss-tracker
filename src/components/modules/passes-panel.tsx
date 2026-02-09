"use client";

import { Calendar, Clock, MapPin } from "lucide-react";

const MOCK_PASSES = [
    { time: "19:42", duration: "4m 12s", maxEl: "67°", date: "Today" },
    { time: "21:18", duration: "2m 05s", maxEl: "18°", date: "Today" },
    { time: "18:55", duration: "5m 30s", maxEl: "82°", date: "Tomorrow" },
    { time: "20:31", duration: "3m 45s", maxEl: "45°", date: "Tomorrow" },
    { time: "22:08", duration: "1m 10s", maxEl: "12°", date: "Tomorrow" },
];

export function PassesPanel() {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Next Passes
                </h2>
                <div className="flex items-center gap-1 text-[10px] text-brand-amber font-mono bg-brand-amber/10 px-2 py-0.5 rounded border border-brand-amber/20">
                    <MapPin className="w-3 h-3" /> BERN, CH
                </div>
            </div>

            {/* Next Pass Countdown Hero */}
            <div className="mb-4 text-center p-3 bg-brand-amber/5 rounded-lg border border-brand-amber/20">
                <span className="text-[10px] uppercase text-brand-amber tracking-widest">Next Acquisition</span>
                <div className="text-2xl font-mono font-bold text-text-primary mt-1">
                    02:34:17
                </div>
            </div>

            {/* Pass List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {MOCK_PASSES.map((pass, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-surface-base/30 border border-border-subtle hover:bg-surface-elevated transition-colors text-xs group">
                        <div className="flex flex-col">
                            <span className="font-bold text-text-primary">{pass.time}</span>
                            <span className="text-[10px] text-text-secondary">{pass.date}</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-[10px] text-text-secondary uppercase">Dur</span>
                            <span className="font-mono text-text-primary">{pass.duration}</span>
                        </div>

                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-text-secondary uppercase">Max El</span>
                            <span className="font-bold text-brand-cyan">{pass.maxEl}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
