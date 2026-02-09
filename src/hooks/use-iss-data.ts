"use client";

import useSWR from "swr";
import { fetchISSPosition, fetchCrew, ISSPosition, CrewMember } from "@/lib/api";

const REFRESH_INTERVAL = 5000; // 5 seconds
const CREW_REFRESH_INTERVAL = 1000 * 60 * 60; // 1 hour

export function useISSPosition() {
    const { data, error, isLoading } = useSWR<ISSPosition>(
        "iss-position",
        fetchISSPosition,
        {
            refreshInterval: REFRESH_INTERVAL,
            keepPreviousData: true,
            fallbackData: {
                // Initial fallback (simulated approx position)
                latitude: 0,
                longitude: 0,
                altitude: 408,
                velocity: 27580,
                visibility: "daylight",
                timestamp: Date.now() / 1000
            }
        }
    );

    return {
        position: data,
        isLoading,
        isError: error,
    };
}

export function useCrew() {
    const { data, error, isLoading } = useSWR<CrewMember[]>(
        "iss-crew",
        fetchCrew,
        {
            refreshInterval: CREW_REFRESH_INTERVAL,
            revalidateOnFocus: false,
        }
    );

    return {
        crew: data || [],
        isLoading,
        isError: error,
    };
}
