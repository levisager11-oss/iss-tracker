"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface DashboardGridProps {
    mapParam: ReactNode;
    crewPanel: ReactNode;
    telemetryPanel: ReactNode;
    passesPanel: ReactNode;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

export function DashboardGrid({
    mapParam,
    crewPanel,
    telemetryPanel,
    passesPanel,
}: DashboardGridProps) {
    return (
        <motion.main
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex-1 pt-12 pb-10 px-2 md:px-4 grid grid-cols-1 lg:grid-cols-12 gap-4 h-screen overflow-y-auto lg:overflow-hidden bg-background/50 backdrop-blur-sm"
        >
            {/* Hero Section: Map (Takes up ~60% width on Desktop) */}
            <motion.section variants={itemVariants} className="col-span-1 lg:col-span-8 flex flex-col gap-4">
                <div className="flex-1 min-h-[400px] border border-border-subtle rounded-lg bg-surface-base/50 relative overflow-hidden group hover:border-brand-cyan/30 transition-colors">
                    {mapParam}
                </div>
            </motion.section>

            {/* Sidebar: Data Panels (Takes up ~40% width on Desktop) */}
            <motion.section variants={itemVariants} className="col-span-1 lg:col-span-4 flex flex-col gap-4 h-full overflow-y-auto lg:overflow-visible">
                <div className="flex-1 min-h-[200px] border border-border-subtle rounded-lg bg-surface-elevated/30 p-4 hover:border-brand-cyan/30 transition-colors">
                    {crewPanel}
                </div>
                <div className="flex-[1.5] min-h-[250px] border border-border-subtle rounded-lg bg-surface-elevated/30 p-4 hover:border-brand-cyan/30 transition-colors">
                    {telemetryPanel}
                </div>
                <div className="flex-1 min-h-[200px] border border-border-subtle rounded-lg bg-surface-elevated/30 p-4 hover:border-brand-cyan/30 transition-colors">
                    {passesPanel}
                </div>
            </motion.section>
        </motion.main>
    );
}
