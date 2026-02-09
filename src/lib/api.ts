export interface ISSPosition {
    latitude: number;
    longitude: number;
    altitude: number;
    velocity: number;
    visibility: string;
    timestamp: number;
}

export interface CrewMember {
    name: string;
    craft: string;
}

export interface PassPrediction {
    risetime: number;
    duration: number;
}

const ISS_POS_URL = "https://api.wheretheiss.at/v1/satellites/25544";
const CREW_URL = "http://api.open-notify.org/astros.json"; // Note: Mixed content warning potential if deployed on HTTPS

export async function fetchISSPosition(): Promise<ISSPosition> {
    const res = await fetch(ISS_POS_URL);
    if (!res.ok) throw new Error("Failed to fetch ISS position");
    return res.json();
}

export async function fetchCrew(): Promise<CrewMember[]> {
    try {
        const res = await fetch(CREW_URL);
        if (!res.ok) throw new Error("Failed to fetch crew");
        const data = await res.json();
        return data.people.filter((p: any) => p.craft === "ISS");
    } catch (error) {
        console.warn("Crew API failed, returning empty list", error);
        return [];
    }
}

// Open Notify pass predictions are often flaky or require lat/lon
// We will likely default to calculation/mock for passes if no better API is found.
