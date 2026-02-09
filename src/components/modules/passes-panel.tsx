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
                    Pass Predictions
                </h2>
                <div className="text-[10px] text-text-muted bg-surface-base px-2 py-1 rounded border border-border-subtle">
                    Auto-Update
                </div>
            </div>

            {/* Next Acquisition Card */}
            <div className="mb-4 p-4 bg-gradient-to-r from-brand-amber/10 to-transparent border-l-2 border-brand-amber rounded-r-lg">
                <span className="text-[10px] uppercase text-brand-amber font-bold tracking-widest mb-2 block">Next Acquisition</span>
                <div className="text-xl font-bold text-white tracking-wide mb-1">
                    LONDON, UK
                </div>
                <div className="flex items-center gap-2 text-brand-amber font-mono">
                    <span className="text-[10px] opacity-70">T-MINUS</span>
                    <span className="text-xl font-bold">04:22:18</span>
                </div>
            </div>

            {/* Pass List */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {MOCK_PASSES.map((pass, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#0a0e17] border border-border-subtle/50 hover:border-brand-cyan/20 transition-colors text-xs group">
                        <div className="flex flex-col">
                            <span className="font-bold text-text-primary text-sm">{pass.date === 'Today' ? 'Paris, FR' : 'Berlin, DE'}</span>
                            <span className="text-[10px] text-text-secondary mt-0.5">AZ: 245° EL: {pass.maxEl}</span>
                        </div>

                        <div className="flex flex-col items-end">
                            <span className="font-mono text-text-primary font-bold">{pass.time} UTC</span>
                            <span className="text-[10px] text-text-secondary">In {pass.duration.split(' ')[0]}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
