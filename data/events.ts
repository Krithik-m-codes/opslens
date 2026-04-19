import { Event } from "../types/event";

// Base coordinates for Ridgeway Site
const baseLat = 13.0285;
const baseLng = 77.5197;

// Helper to generate a timestamp relative to current early morning
function getTimestamp(hoursAgo: number, minutesAgo: number): string {
  const date = new Date();
  date.setHours(6 - hoursAgo, 10 - minutesAgo, 0, 0); // Relative to 6:10 AM
  return date.toISOString();
}

export const initialEvents: Event[] = [
  // Original storyline events
  {
    id: "evt_1",
    type: "fence",
    location: "Gate 3 Perimeter",
    coordinates: [baseLat + 0.005, baseLng - 0.008],
    timestamp: getTimestamp(3, 15), // 2:55 AM
    metadata: { sensor_id: "FNC-G3", triggered_zones: ["Z12", "Z13"] },
  },
  {
    id: "evt_2",
    type: "badge",
    location: "Block C Access Point",
    coordinates: [baseLat - 0.002, baseLng - 0.01],
    timestamp: getTimestamp(2, 50), // 3:20 AM
    metadata: {
      employee_id: "EMP-4992",
      attempt_status: "DENIED",
      reason: "OUT_OF_SHIFT",
    },
  },
  {
    id: "evt_3",
    type: "badge",
    location: "Block C Access Point",
    coordinates: [baseLat - 0.002, baseLng - 0.01],
    timestamp: getTimestamp(2, 45), // 3:25 AM
    metadata: {
      employee_id: "EMP-4992",
      attempt_status: "DENIED",
      reason: "OUT_OF_SHIFT_RETRY",
    },
  },
  {
    id: "evt_4",
    type: "badge",
    location: "Block C Access Point",
    coordinates: [baseLat - 0.002, baseLng - 0.01],
    timestamp: getTimestamp(2, 40), // 3:30 AM
    metadata: {
      employee_id: "EMP-4992",
      attempt_status: "DENIED",
      reason: "OUT_OF_SHIFT_RETRY",
    },
  },
  {
    id: "evt_5",
    type: "vehicle",
    location: "Storage Yard Path",
    coordinates: [baseLat - 0.001, baseLng - 0.005],
    timestamp: getTimestamp(2, 10), // 4:00 AM
    metadata: {
      vehicle_class: "Truck/Van",
      plate_recognition: "FAILED",
      direction: "INBOUND",
    },
  },
  {
    id: "evt_6",
    type: "fence",
    location: "Gate 3 Perimeter",
    coordinates: [baseLat + 0.005, baseLng - 0.008],
    timestamp: getTimestamp(1, 40), // 4:30 AM
    metadata: { sensor_id: "FNC-G3", note: "Possible wind noise" },
  },
  {
    id: "evt_7",
    type: "drone",
    location: "Drone Patrol Alpha",
    coordinates: [baseLat, baseLng],
    timestamp: getTimestamp(1, 10), // 5:00 AM
    metadata: {
      mission_id: "PTRL-A",
      status: "COMPLETED",
      area_scanned: ["Gate 3", "Block C", "Storage Yard"],
    },
  },
  {
    id: "evt_8",
    type: "sensor",
    location: "Storage Yard Sensor",
    coordinates: [baseLat - 0.0015, baseLng - 0.006],
    timestamp: getTimestamp(0, 45), // 5:25 AM
    metadata: { type: "MOTION", duration_secs: 12 },
  },

  // Heavy Noise / Seed Data - Spanning Bangalore
  {
    id: "evt_31",
    type: "vehicle",
    location: "Sector 4 North Access",
    coordinates: [baseLat + 0.012, baseLng + 0.015],
    timestamp: getTimestamp(6, 12),
    metadata: { tag: "CONTRACTOR-FLEET-X9", speed_kmh: 22 },
  },
  {
    id: "evt_32",
    type: "badge",
    location: "Warehouse 12 West",
    coordinates: [baseLat - 0.011, baseLng + 0.021],
    timestamp: getTimestamp(5, 59),
    metadata: { attempts: 1, employee_id: "E-1002", success: true },
  },
  {
    id: "evt_33",
    type: "sensor",
    location: "Cooling Tower Alpha",
    coordinates: [baseLat + 0.02, baseLng - 0.018],
    timestamp: getTimestamp(5, 30),
    metadata: { temp: "Elevated", note: "Cooling tower drift" },
  },
  {
    id: "evt_34",
    type: "drone",
    location: "Routine Patrol Bravo",
    coordinates: [baseLat - 0.015, baseLng - 0.025],
    timestamp: getTimestamp(5, 15),
    metadata: { mission_id: "NIGHT-SWEEP-01", anomaly_detected: false },
  },
  {
    id: "evt_35",
    type: "fence",
    location: "Gate 1 Perimeter",
    coordinates: [baseLat + 0.025, baseLng + 0.005],
    timestamp: getTimestamp(4, 42),
    metadata: { sensor_id: "F-022", cause: "Animal interference suspected" },
  },
  {
    id: "evt_36",
    type: "vehicle",
    location: "Dispatch Yard",
    coordinates: [baseLat + 0.01, baseLng + 0.028],
    timestamp: getTimestamp(4, 18),
    metadata: { tag: "FREIGHT-04", reason: "Routine delivery outbound" },
  },
  {
    id: "evt_37",
    type: "badge",
    location: "Block B Turnstile",
    coordinates: [baseLat - 0.018, baseLng + 0.014],
    timestamp: getTimestamp(4, 5),
    metadata: { attempts: 2, employee_id: "E-3301", reason: "Mis-swipe" },
  },
  {
    id: "evt_38",
    type: "sensor",
    location: "Heavy Machining Line",
    coordinates: [baseLat + 0.005, baseLng + 0.035],
    timestamp: getTimestamp(3, 44),
    metadata: { vibration: "High", source: "Heavy Machinery startup sequence" },
  },
  {
    id: "evt_39",
    type: "fence",
    location: "South Ridge Perimeter",
    coordinates: [baseLat - 0.028, baseLng + 0.002],
    timestamp: getTimestamp(3, 10),
    metadata: { sensor_id: "F-077", duration_ms: 200, amplitude: "Low" },
  },
  {
    id: "evt_40",
    type: "vehicle",
    location: "East Fleet Parking",
    coordinates: [baseLat + 0.018, baseLng + 0.01],
    timestamp: getTimestamp(2, 55),
    metadata: { tag: "AUTH-MAINT-1", speed_kmh: 12 },
  },
  {
    id: "evt_41",
    type: "sensor",
    location: "Substation 3",
    coordinates: [baseLat - 0.012, baseLng - 0.028],
    timestamp: getTimestamp(2, 33),
    metadata: { type: "THERMAL", temp_delta_c: "+4.1" },
  },
  {
    id: "evt_42",
    type: "badge",
    location: "IT Backbone Facility",
    coordinates: [baseLat + 0.028, baseLng - 0.022],
    timestamp: getTimestamp(2, 5),
    metadata: { attempt_status: "SUCCESS", employee_id: "E-7650" },
  },
  {
    id: "evt_43",
    type: "fence",
    location: "Gate 4 Security Post",
    coordinates: [baseLat - 0.005, baseLng + 0.038],
    timestamp: getTimestamp(1, 50),
    metadata: { sensor_id: "FNC-G4", triggered_zones: ["Z02"] },
  },
  {
    id: "evt_44",
    type: "drone",
    location: "Drone Patrol Charlie",
    coordinates: [baseLat - 0.022, baseLng - 0.012],
    timestamp: getTimestamp(1, 25),
    metadata: {
      mission_id: "PTRL-C",
      status: "COMPLETED",
      area_scanned: ["Substation 3", "South Ridge"],
    },
  },
  {
    id: "evt_45",
    type: "vehicle",
    location: "North Access Route",
    coordinates: [baseLat + 0.032, baseLng + 0.005],
    timestamp: getTimestamp(0, 58),
    metadata: {
      vehicle_class: "Sedan",
      plate_recognition: "KA-04-XX-1234",
      direction: "OUTBOUND",
    },
  },
  {
    id: "evt_46",
    type: "sensor",
    location: "Admin Block Motion",
    coordinates: [baseLat + 0.015, baseLng - 0.005],
    timestamp: getTimestamp(0, 30),
    metadata: { type: "MOTION", duration_secs: 5 },
  },
  {
    id: "evt_47",
    type: "badge",
    location: "Cafeteria Entry",
    coordinates: [baseLat + 0.008, baseLng - 0.01],
    timestamp: getTimestamp(0, 15),
    metadata: { attempts: 1, employee_id: "E-9999", success: true },
  },
  // Adding more random seed data requested
  {
    id: "evt_48",
    type: "fence",
    location: "East Perimeter Grid",
    coordinates: [baseLat + 0.019, baseLng + 0.035],
    timestamp: getTimestamp(4, 10),
    metadata: { sensor_id: "F-099", duration_ms: 100, amplitude: "Low" },
  },
  {
    id: "evt_49",
    type: "vehicle",
    location: "South Ridge Path 2",
    coordinates: [baseLat - 0.031, baseLng + 0.005],
    timestamp: getTimestamp(3, 22),
    metadata: {
      vehicle_class: "Truck",
      plate_recognition: "FAILED",
      direction: "OUTBOUND",
    },
  },
  {
    id: "evt_50",
    type: "badge",
    location: "Server Room 1",
    coordinates: [baseLat + 0.025, baseLng - 0.02],
    timestamp: getTimestamp(2, 40),
    metadata: { attempt_status: "SUCCESS", employee_id: "E-5512" },
  },
  {
    id: "evt_51",
    type: "drone",
    location: "Delta Patrol Zone",
    coordinates: [baseLat + 0.015, baseLng + 0.01],
    timestamp: getTimestamp(1, 15),
    metadata: {
      mission_id: "PTRL-D",
      status: "COMPLETED",
      area_scanned: ["Gate 1", "Dispatch"],
    },
  },
  {
    id: "evt_52",
    type: "sensor",
    location: "Substation 4",
    coordinates: [baseLat - 0.015, baseLng - 0.035],
    timestamp: getTimestamp(6, 5),
    metadata: { type: "THERMAL", temp_delta_c: "+2.1" },
  },
  {
    id: "evt_53",
    type: "fence",
    location: "Gate 2 Perimeter",
    coordinates: [baseLat - 0.025, baseLng - 0.005],
    timestamp: getTimestamp(5, 50),
    metadata: { sensor_id: "F-025", cause: "Vibration" },
  },
  {
    id: "evt_54",
    type: "vehicle",
    location: "West Yard Entry",
    coordinates: [baseLat - 0.005, baseLng - 0.035],
    timestamp: getTimestamp(4, 55),
    metadata: { tag: "CONTRACTOR-FLEET-X2", reason: "Material drop" },
  },
  {
    id: "evt_55",
    type: "badge",
    location: "HR Block",
    coordinates: [baseLat + 0.01, baseLng - 0.008],
    timestamp: getTimestamp(3, 30),
    metadata: { attempts: 1, employee_id: "E-1002", success: true },
  },
];
