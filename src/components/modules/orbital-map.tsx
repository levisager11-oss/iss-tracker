"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import * as d3 from "d3-geo";
// @ts-ignore
import * as topojson from "topojson-client";
import { geoPath } from "d3-geo";
import { useTime } from "@/hooks/use-time";
import { useISSPosition } from "@/hooks/use-iss-data";
import { generateOrbitalPath, getVisibilityCircle, getTerminator } from "@/lib/orbit-math";
import { cn } from "@/lib/utils";

// Constants
const MAP_WIDTH = 960;
const MAP_HEIGHT = 480; // Aspect ratio 2:1 for Equirectangular

export function OrbitalMap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [worldData, setWorldData] = useState<any>(null);
    const [dimensions, setDimensions] = useState({ width: MAP_WIDTH, height: MAP_HEIGHT });
    const now = useTime();
    const { position, isLoading } = useISSPosition();

    // Load Map Data
    useEffect(() => {
        fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json")
            .then((res) => res.json())
            .then((data) => {
                const countries = topojson.feature(data, data.objects.countries);
                setWorldData(countries);
            })
            .catch((err) => console.error("Failed to load map data", err));
    }, []);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { width } = containerRef.current.getBoundingClientRect();
                setDimensions({
                    width,
                    height: width / 2, // Maintain 2:1 aspect ratio
                });
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Projection
    const projection = useMemo(() => {
        return d3.geoEquirectangular()
            .scale(dimensions.width / (2 * Math.PI)) // Standard scale for equirectangular
            .translate([dimensions.width / 2, dimensions.height / 2]);
    }, [dimensions]);

    const pathGenerator = useMemo(() => {
        return geoPath().projection(projection);
    }, [projection]);

    // Use real position if available, or 0,0 fallback
    const lat = position?.latitude ?? 0;
    const lon = position?.longitude ?? 0;

    const issPos: [number, number] = [lon, lat];

    // Project ISS
    const projectedISS = projection(issPos);

    // Generate Path (Past/Future)
    // We generate a "track" that moves with the ISS
    // Future track
    const orbitPathLine = generateOrbitalPath(now, 90, 1); // 90 mins orbit
    const projectedOrbitPath = d3.geoPath().projection(projection)({
        type: "LineString",
        coordinates: orbitPathLine
    });

    // Visibility Circle
    const visibilityGeo = getVisibilityCircle(lat, lon);
    const visibilityPath = pathGenerator(visibilityGeo);

    // Day/Night Terminator
    const terminatorGeo = getTerminator(now);
    const terminatorPath = pathGenerator(terminatorGeo);

    if (!worldData) return <div className="flex items-center justify-center h-full text-brand-cyan animate-pulse">Initializing Orbital Systems...</div>;

    return (
        <div ref={containerRef} className="relative w-full h-full bg-[#0a0e17] overflow-hidden">
            {/* SVG Map Layer */}
            <svg
                width={dimensions.width}
                height={dimensions.height}
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                className="absolute top-0 left-0 w-full h-full"
            >
                <defs>
                    <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Land Masses */}
                <path
                    d={pathGenerator(worldData) || ""}
                    fill="#0f1923"
                    stroke="#1a2744"
                    strokeWidth="0.5"
                />

                {/* Night Terminator Overlay */}
                <path
                    d={terminatorPath || ""}
                    fill="#000000"
                    fillOpacity="0.3"
                    style={{ filter: "blur(2px)" }}
                />

                {/* Grid Lines (Optional) */}
                {/* Can add d3.geoGraticule here */}

                {/* Orbital Path (Future) */}
                <path
                    d={projectedOrbitPath || ""}
                    fill="none"
                    stroke="#00d4ff"
                    strokeWidth="2"
                    strokeOpacity="0.3"
                    strokeDasharray="4 4"
                    className="animate-pulse-slow"
                />

                {/* Visibility Footprint */}
                <path
                    d={visibilityPath || ""}
                    fill="rgba(0, 212, 255, 0.05)"
                    stroke="rgba(0, 212, 255, 0.2)"
                    strokeWidth="1"
                />

                {/* ISS Marker */}
                {projectedISS && (
                    <g transform={`translate(${projectedISS[0]}, ${projectedISS[1]})`}>
                        {/* Pulsing Rings */}
                        <circle r="20" fill="none" stroke="#00d4ff" strokeOpacity="0.5" className="animate-ping-slow" />
                        <circle r="4" fill="#00d4ff" filter="url(#glow-cyan)" />

                        {/* Crosshair */}
                        <line x1="-10" y1="0" x2="10" y2="0" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
                        <line x1="0" y1="-10" x2="0" y2="10" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
                    </g>
                )}
            </svg>

            {/* Overlay Info Box */}
            <div className="absolute top-4 left-4 bg-surface-base/80 backdrop-blur border border-border-subtle p-2 rounded text-xs font-mono text-brand-cyan shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                    <span>ISS (ZARYA)</span>
                </div>
                <div className="text-text-primary">
                    LAT: {lat.toFixed(2)} {lat > 0 ? 'N' : 'S'}
                </div>
                <div className="text-text-primary">
                    LON: {Math.abs(lon).toFixed(2)} {lon > 0 ? 'E' : 'W'}
                </div>
            </div>
        </div>
    );
}
