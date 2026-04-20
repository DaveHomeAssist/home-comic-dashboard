/* ============================================
   DATA — household mock state
   ============================================ */

const FAMILY = [
  { id: "mom", name: "Linda",  role: "Mom",       color: "var(--pop-yellow)", accent: "var(--pop-red)",  hair: "blonde" },
  { id: "dad", name: "Bob",    role: "Dad",       color: "var(--pop-sky)",    accent: "var(--pop-blue)", hair: "brown" },
  { id: "son", name: "Kevin",  role: "Grown Son", color: "var(--pop-red)",    accent: "var(--pop-yellow)", hair: "dark" },
];

const WEATHER = {
  conditionText: "Clear, Night",
  tempF: 43,
  feelsF: 41,
  location: "Oaklyn, NJ",
  windMph: 1.15,
  windDir: "N",
  precip: "0.0 in",
  sunrise: "6:42 AM",
  sunset: "7:18 PM",
  forecast: [
    { day: "Sun", icon: "cloud",    hi: 55, lo: 40 },
    { day: "Mon", icon: "sun",      hi: 54, lo: 34 },
    { day: "Tue", icon: "partly",   hi: 56, lo: 44 },
    { day: "Wed", icon: "cloud",    hi: 65, lo: 49 },
    { day: "Thu", icon: "sun",      hi: 77, lo: 52 },
  ],
};

const NET = {
  wanUp: true,
  downMbps: 625.5,
  upMbps: 27.4,
  latencyMs: 14,
  ssid: "Pulp Fiction",
  devices: 38,
  history: [12, 18, 25, 22, 30, 45, 62, 58, 72, 80, 76, 90],
};

const SYSTEM = {
  lastBackupHoursAgo: 5,
  backupState: "Idle",
  nextScheduledIn: "In 9 hours",
  uptime: "42 days",
  cpu: 18,
  memory: 46,
};

const CALENDAR = {
  title: "Phillies 2026 — Plan D",
  monthLabel: "April 2026",
  // Sun..Sat grid for April 2026 (April 1 2026 is a Wednesday)
  events: {
    3: { dot: "var(--pop-red)",   label: "vs NYM" },
    4: { dot: "var(--pop-red)",   label: "vs NYM" },
    5: { dot: "var(--pop-red)",   label: "vs NYM" },
    7: { dot: "var(--pop-blue)",  label: "@ ATL" },
    10:{ dot: "var(--pop-blue)",  label: "@ WSH" },
    15:{ dot: "var(--pop-yellow)",label: "vs LAD" },
    18:{ dot: "var(--pop-green)", label: "Grill night"},
    20:{ dot: "var(--pop-red)",   label: "vs SD" },
    24:{ dot: "var(--pop-blue)",  label: "@ STL" },
    27:{ dot: "var(--pop-yellow)",label: "Kevin's bday"},
  },
  today: 15,
};

const MEDIA = {
  playing: true,
  track: "Thunder Road",
  artist: "Bruce Springsteen",
  album: "Born to Run",
  room: "Living Room",
  elapsed: 112,
  duration: 289,
};

const CAMERAS = [
  { id: "front",  name: "Front Door",  status: "clear",  motion: false },
  { id: "drive",  name: "Driveway",    status: "motion", motion: true, lastEvent: "2 min ago" },
  { id: "back",   name: "Back Yard",   status: "clear",  motion: false },
  { id: "garage", name: "Garage",      status: "clear",  motion: false },
];

const SOLAR = {
  producingKw: 4.2,
  usingKw: 2.8,
  gridKw: -1.4, // negative = exporting
  dayTotalKwh: 18.6,
  batteryPct: 78,
};

const AREAS = [
  { id: "living",  name: "Living Room", temp: 71.4, color: "var(--pop-peach)",    icon: "armchair",  lights: 3, lightsOn: 2 },
  { id: "kitchen", name: "Kitchen",     temp: 68.2, color: "var(--pop-green-bright)", icon: "fridge", lights: 4, lightsOn: 4 },
  { id: "front",   name: "Front Room",  temp: 69.8, color: "var(--pop-sky)",      icon: "door",      lights: 2, lightsOn: 0 },
  { id: "garage",  name: "Garage",      temp: 58.1, color: "var(--pop-tan)",      icon: "garage",    lights: 2, lightsOn: 1 },
  { id: "garden",  name: "Garden",      temp: 52.0, color: "var(--pop-yellow-soft)", icon: "plant",  lights: 3, lightsOn: 0 },
];

// Per-room detail data
const ROOM_DETAILS = {
  living: {
    bg: "assets/room-livingroom.png",
    blurb: "Cozy. Cats asleep by the fire.",
    lights: [
      { id: "l1", name: "Fireplace Sconces", on: true,  brightness: 60 },
      { id: "l2", name: "Reading Lamp",       on: true,  brightness: 40 },
      { id: "l3", name: "Plant Shelf",        on: false, brightness: 0 },
    ],
    sensors: [
      { label: "Temperature", value: "71.4°F" },
      { label: "Humidity",    value: "42%"    },
      { label: "Motion",      value: "Quiet"  },
      { label: "Air Quality", value: "Good"   },
    ],
    mediaOn: true,
    occupants: ["dad"],
  },
  kitchen: {
    bg: "assets/room-kitchen.jpg",
    blurb: "Coffee on. Dishwasher running.",
    lights: [
      { id: "l1", name: "Overhead",  on: true, brightness: 100 },
      { id: "l2", name: "Under-Cab", on: true, brightness: 70  },
      { id: "l3", name: "Pantry",    on: true, brightness: 50  },
      { id: "l4", name: "Nook",      on: true, brightness: 30  },
    ],
    sensors: [
      { label: "Temperature", value: "68.2°F" },
      { label: "Humidity",    value: "48%"    },
      { label: "Stove",       value: "Off"    },
      { label: "Fridge",      value: "36°F"   },
    ],
    appliances: [
      { name: "Dishwasher", status: "Running — 18m left" },
      { name: "Oven",       status: "Off" },
      { name: "Coffee Bar", status: "Brewed 8:02 AM" },
    ],
    occupants: ["mom"],
  },
  front: {
    bg: "assets/room-frontroom.jpg",
    blurb: "The dining nook. Books piled high.",
    lights: [
      { id: "l1", name: "Chandelier", on: false, brightness: 0 },
      { id: "l2", name: "Cabinet",    on: false, brightness: 0 },
    ],
    sensors: [
      { label: "Temperature", value: "69.8°F" },
      { label: "Humidity",    value: "44%"    },
      { label: "Door",        value: "Closed" },
      { label: "Motion",      value: "Quiet"  },
    ],
    occupants: [],
  },
  garage: {
    bg: "assets/room-garage.jpg",
    blurb: "Workbench ready. Door secured.",
    lights: [
      { id: "l1", name: "Overhead", on: true,  brightness: 80 },
      { id: "l2", name: "Bench",    on: false, brightness: 0  },
    ],
    sensors: [
      { label: "Temperature", value: "58.1°F" },
      { label: "Humidity",    value: "52%"    },
      { label: "Door",        value: "Closed" },
      { label: "CO",          value: "Normal" },
    ],
    appliances: [
      { name: "EV Charger", status: "Charging — 72%" },
      { name: "Workshop Vac", status: "Off" },
    ],
    occupants: ["son"],
  },
  garden: {
    bg: "assets/room-garden.png",
    blurb: "Trellis thriving. Drip in 2 hours.",
    lights: [
      { id: "l1", name: "Path Lights", on: false, brightness: 0 },
      { id: "l2", name: "Flood",       on: false, brightness: 0 },
      { id: "l3", name: "String",      on: false, brightness: 0 },
    ],
    sensors: [
      { label: "Temperature", value: "52.0°F" },
      { label: "Soil Moist.", value: "38%"    },
      { label: "UV Index",    value: "0"      },
      { label: "Rain Today",  value: "0.0 in" },
    ],
    appliances: [
      { name: "Drip Irrigation", status: "Next: in 2h 14m" },
      { name: "Grow Lamp",       status: "Scheduled 6am" },
    ],
    occupants: [],
  },
};

// Expose to other scripts
Object.assign(window, {
  FAMILY, WEATHER, NET, SYSTEM, CALENDAR, MEDIA, CAMERAS, SOLAR, AREAS, ROOM_DETAILS
});
