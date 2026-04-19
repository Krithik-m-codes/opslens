import { initialEvents } from "../../data/events";
import { droneLogs } from "../../data/droneLogs";
import { droneSimulations } from "../../data/droneSimulations";
import { Event } from "../../types/event";

export async function getEventsByLocation(
  location: string,
  timeRange?: string,
): Promise<Event[]> {
  // Mock implementation that filters by string match
  return initialEvents.filter((e) =>
    e.location.toLowerCase().includes(location.toLowerCase()),
  );
}

export async function getNearbyEvents(eventId: string): Promise<Event[]> {
  const target = initialEvents.find((e) => e.id === eventId);
  if (!target) return [];

  // Real implementation would calculate haversine distance. We'll simply mock by returning events
  // that have close coordinate proximity.
  return initialEvents.filter((e) => {
    if (e.id === eventId) return false;
    const latDiff = Math.abs(e.coordinates[0] - target.coordinates[0]);
    const lngDiff = Math.abs(e.coordinates[1] - target.coordinates[1]);
    return latDiff < 0.005 && lngDiff < 0.005;
  });
}

export async function getDroneLogs(area: string): Promise<any> {
  const query = area.toLowerCase();
  const results = droneLogs.filter(
    (log) =>
      log.area.toLowerCase().includes(query) ||
      log.findings.toLowerCase().includes(query),
  );

  if (results.length > 0) {
    return results; // Return the specific matched logs
  }

  // If no specific log is found for the area, return a generic routine clear status
  return [
    {
      status: "Scan Completed",
      area: area,
      findings: "Routine scan. No anomalies.",
      confidence: 0.99,
    },
  ];
}

export async function simulateDroneCheck(area: string): Promise<any> {
  const query = area.toLowerCase();

  // Find a simulated scenario matching the requested area
  const matchedSim = droneSimulations.find(
    (sim) =>
      sim.area.toLowerCase().includes(query) ||
      sim.live_findings.toLowerCase().includes(query),
  );

  if (matchedSim) {
    return matchedSim;
  }

  // Generic fallback if dispatched to an unknown area
  return {
    action: "DRONE_DISPATCHED",
    target_area: area,
    status: "Mission Completed",
    live_findings: `Live optical and thermal scan of ${area} completed. No abnormal activities, personnel, or heat signatures detected.`,
    estimated_arrival_mins: 3,
    threat_level: "None",
  };
}
