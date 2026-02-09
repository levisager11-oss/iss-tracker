import { geoCircle } from "d3-geo";

// Constants for ISS Orbit
const INCLINATION = 51.64; // degrees
const PERIOD = 92.68; // minutes
const ORBIT_HEIGHT_KM = 408;
const EARTH_RADIUS_KM = 6371;

/**
 * Generates a ground track for the ISS based on current time.
 * Simplified sinusoidal approximation for visual purposes.
 */
export function generateOrbitalPath(startTime: Date, durationMinutes: number, stepMinutes: number = 1) {
    const path = [];
    const startSec = startTime.getTime() / 1000;

    // Approximate longitude shift per second (Earth rotation + Orbit precession)
    // Earth rotates 360 deg in 24 hours (86400s) -> ~0.004167 deg/s
    // Orbit precession is complex, but for 90 mins we can just use Earth rotation relative to orbit
    const lonShiftPerSec = 360 / (PERIOD * 60) - 0.004167; // Net movement relative to ground

    for (let t = 0; t <= durationMinutes * 60; t += stepMinutes * 60) {
        const timeOffset = t;
        // Calculate position
        // Lat = asin(sin(inc) * sin(2*pi * t / period))
        // This is a very rough approximation of ground track
        // We need to offset t by some epoch to match real position, 
        // but for "simulated" mode we just run it from now.

        // Period in seconds
        const P = PERIOD * 60;

        // Orbital argument (0 to 2PI)
        // We'll just define t=0 as crossing equator ascending for simplicity in this function,
        // or pass an offset.
        const theta = (2 * Math.PI * timeOffset) / P;

        const latRad = Math.asin(Math.sin(INCLINATION * Math.PI / 180) * Math.sin(theta));
        const lat = latRad * 180 / Math.PI;

        // Longitude moves west as earth rotates east under the sat
        // Simplified: Linear progression minus earth rotation
        const lon = (timeOffset / P) * 360 - (timeOffset * 0.004167);

        // Wrap longitude -180 to 180
        let normalizedLon = ((lon % 360) + 540) % 360 - 180;

        path.push([normalizedLon, lat]);
    }
    return path;
}

/**
 * Generates the visibility circle (footprint)
 */
export function getVisibilityCircle(lat: number, lon: number) {
    // Calculate horizon radius based on altitude
    // theta = acos(R / (R + h))
    const thetaRad = Math.acos(EARTH_RADIUS_KM / (EARTH_RADIUS_KM + ORBIT_HEIGHT_KM));
    const thetaDeg = thetaRad * 180 / Math.PI;

    const circle = geoCircle().center([lon, lat]).radius(thetaDeg);
    return circle();
}

/**
 * Generates Day/Night Terminator
 * Simplified Solar Position
 */
export function getTerminator(date: Date) {
    // Use d3-geo's circle generation but centered on the anti-solar point
    // We need to calculate sun position roughly

    const now = date.getTime();
    // Julian Date
    const JD = now / 86400000 + 2440587.5;
    const D = JD - 2451545; // Days since J2000

    // Mean longitude of Sun
    const g = (357.529 + 0.98560028 * D) % 360;
    const q = (280.459 + 0.98564736 * D) % 360;
    const L = q + 1.915 * Math.sin(g * Math.PI / 180) + 0.020 * Math.sin(2 * g * Math.PI / 180);

    // Obliquity of ecliptic
    const e = 23.439 - 0.00000036 * D;

    // Right ascension and declination
    const ra = Math.atan2(Math.cos(e * Math.PI / 180) * Math.sin(L * Math.PI / 180), Math.cos(L * Math.PI / 180)) * 180 / Math.PI;
    const dec = Math.asin(Math.sin(e * Math.PI / 180) * Math.sin(L * Math.PI / 180)) * 180 / Math.PI;

    // Greenwich Mean Sidereal Time
    const GMST = (280.46061837 + 360.98564736629 * D) % 360;

    // Hour Angle
    const lon = ((ra - GMST + 360) % 360 + 180 % 360) - 180; // Sun Longitude (approx)
    // Actually, simpler: sub-solar point longitude is roughly -(GMT time in hours - 12) * 15
    // Let's use the standard equation:
    // Sun Longitude ~ -(UTC_Hours * 15) + EquationOfTime ... simplified:
    const sunLon = -15 * (date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600) + 180;

    // Terminator is a circle 90 degrees from the sun position
    // But we want the shadow, so center on the anti-solar point?
    // Or just draw circle at sun position with radius 90.
    // d3-geo circle generates a polygon.

    // Let's center on Sun and radius 90? Or anti-sun?
    // If we draw circle around sun, that's the day hemisphere.
    // If we draw circle around anti-sun (SunLon + 180, -SunLat), that's the night hemisphere (ish).

    // Let's try centering on the anti-solar point
    const antiSunLon = ((sunLon + 180 + 180) % 360) - 180;
    const antiSunLat = -dec;

    const circle = geoCircle().center([antiSunLon, antiSunLat]).radius(90);
    return circle();
}
