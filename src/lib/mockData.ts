// Mock data for CampusMate prototype — alumni, opportunities, mentors, etc.

export type City = {
  name: string;
  // approximate map coords (% of india svg viewbox 0-100)
  x: number;
  y: number;
  country?: string;
};

export const CITIES: Record<string, City> = {
  Jaipur: { name: "Jaipur", x: 32, y: 32 },
  Delhi: { name: "Delhi", x: 36, y: 24 },
  Mumbai: { name: "Mumbai", x: 26, y: 52 },
  Pune: { name: "Pune", x: 30, y: 56 },
  Bengaluru: { name: "Bengaluru", x: 38, y: 72 },
  Hyderabad: { name: "Hyderabad", x: 42, y: 62 },
  Chennai: { name: "Chennai", x: 46, y: 78 },
  Kolkata: { name: "Kolkata", x: 64, y: 44 },
  Gurugram: { name: "Gurugram", x: 35, y: 25 },
  Noida: { name: "Noida", x: 37, y: 25 },
  Singapore: { name: "Singapore", x: 80, y: 86, country: "SG" },
  London: { name: "London", x: 8, y: 12, country: "UK" },
  SanFrancisco: { name: "San Francisco", x: 4, y: 36, country: "US" },
  Berlin: { name: "Berlin", x: 14, y: 14, country: "DE" },
  Dubai: { name: "Dubai", x: 18, y: 42, country: "AE" },
};

export type Alumni = {
  id: string;
  name: string;
  branch: string;
  batch: number;
  avatar: string;
  currentRole: string;
  currentCompany: string;
  openForGuidance: boolean;
  city: keyof typeof CITIES;
  journey: { year: number; role: string; company: string; city: keyof typeof CITIES; note?: string }[];
};

export const ALUMNI: Alumni[] = [
  {
    id: "a1",
    name: "Aarav Sharma",
    branch: "CSE",
    batch: 2019,
    avatar: "AS",
    currentRole: "Senior SDE",
    currentCompany: "Google",
    openForGuidance: true,
    city: "Singapore",
    journey: [
      { year: 2019, role: "SDE Intern", company: "Flipkart", city: "Bengaluru", note: "Won internal hackathon, converted to FT." },
      { year: 2020, role: "SDE-1", company: "Flipkart", city: "Bengaluru" },
      { year: 2022, role: "SDE-2", company: "Stripe", city: "Bengaluru", note: "Switched to fintech for scale exposure." },
      { year: 2024, role: "Senior SDE", company: "Google", city: "Singapore", note: "Relocated for distributed systems team." },
    ],
  },
  {
    id: "a2",
    name: "Diya Patel",
    branch: "ECE",
    batch: 2018,
    avatar: "DP",
    currentRole: "Product Manager",
    currentCompany: "Razorpay",
    openForGuidance: true,
    city: "Bengaluru",
    journey: [
      { year: 2018, role: "Hardware Eng", company: "Qualcomm", city: "Hyderabad" },
      { year: 2020, role: "APM", company: "Swiggy", city: "Bengaluru", note: "Pivoted via PM fellowship." },
      { year: 2023, role: "PM", company: "Razorpay", city: "Bengaluru" },
    ],
  },
  {
    id: "a3",
    name: "Rohan Mehta",
    branch: "CSE",
    batch: 2020,
    avatar: "RM",
    currentRole: "ML Engineer",
    currentCompany: "OpenAI",
    openForGuidance: false,
    city: "SanFrancisco",
    journey: [
      { year: 2020, role: "Data Analyst", company: "Mu Sigma", city: "Bengaluru" },
      { year: 2022, role: "MLE", company: "Adobe", city: "Bengaluru" },
      { year: 2024, role: "ML Engineer", company: "OpenAI", city: "SanFrancisco", note: "Moved after MS at Stanford." },
    ],
  },
  {
    id: "a4",
    name: "Ananya Iyer",
    branch: "IT",
    batch: 2021,
    avatar: "AI",
    currentRole: "Founder",
    currentCompany: "LeafAI",
    openForGuidance: true,
    city: "Jaipur",
    journey: [
      { year: 2021, role: "SDE", company: "Zoho", city: "Chennai" },
      { year: 2023, role: "Tech Lead", company: "Postman", city: "Bengaluru" },
      { year: 2024, role: "Founder", company: "LeafAI", city: "Jaipur", note: "Bootstrapped agri-AI startup." },
    ],
  },
  {
    id: "a5",
    name: "Karan Gupta",
    branch: "MECH",
    batch: 2017,
    avatar: "KG",
    currentRole: "Engineering Manager",
    currentCompany: "Tesla",
    openForGuidance: true,
    city: "Berlin",
    journey: [
      { year: 2017, role: "Design Eng", company: "TVS", city: "Pune" },
      { year: 2019, role: "Senior Eng", company: "Bosch", city: "Pune" },
      { year: 2022, role: "EM", company: "Tesla", city: "Berlin" },
    ],
  },
  {
    id: "a6",
    name: "Sneha Kapoor",
    branch: "CSE",
    batch: 2019,
    avatar: "SK",
    currentRole: "Staff Engineer",
    currentCompany: "Atlassian",
    openForGuidance: true,
    city: "London",
    journey: [
      { year: 2019, role: "SDE", company: "Microsoft", city: "Hyderabad" },
      { year: 2022, role: "Senior SDE", company: "Atlassian", city: "Bengaluru" },
      { year: 2024, role: "Staff Engineer", company: "Atlassian", city: "London" },
    ],
  },
];

export type Opportunity = {
  id: string;
  role: string;
  company: string;
  city: keyof typeof CITIES;
  category: "SDE" | "Data" | "Product" | "Core" | "Design";
  level: "Intern" | "Entry" | "Mid" | "Senior";
  referrer?: string; // alumni id
  intent?: string;
  postedDays: number;
};

export const OPPORTUNITIES: Opportunity[] = [
  { id: "o1", role: "SDE Intern", company: "Razorpay", city: "Bengaluru", category: "SDE", level: "Intern", referrer: "a2", postedDays: 2 },
  { id: "o2", role: "Backend Engineer", company: "Stripe", city: "Bengaluru", category: "SDE", level: "Entry", referrer: "a1", postedDays: 4 },
  { id: "o3", role: "Data Scientist", company: "Swiggy", city: "Bengaluru", category: "Data", level: "Mid", postedDays: 6 },
  { id: "o4", role: "Product Analyst", company: "Razorpay", city: "Bengaluru", category: "Product", level: "Entry", referrer: "a2", postedDays: 1 },
  { id: "o5", role: "Mech Design Eng", company: "Tata Motors", city: "Pune", category: "Core", level: "Entry", postedDays: 8 },
  { id: "o6", role: "iOS Engineer", company: "Microsoft", city: "Hyderabad", category: "SDE", level: "Mid", postedDays: 3 },
  { id: "o7", role: "MLE Intern", company: "Adobe", city: "Bengaluru", category: "Data", level: "Intern", postedDays: 5 },
  { id: "o8", role: "Frontend Engineer", company: "Postman", city: "Bengaluru", category: "SDE", level: "Entry", referrer: "a4", postedDays: 9 },
  { id: "o9", role: "PM Intern", company: "Flipkart", city: "Bengaluru", category: "Product", level: "Intern", postedDays: 11 },
  { id: "o10", role: "Cloud Engineer", company: "Microsoft", city: "Hyderabad", category: "SDE", level: "Mid", postedDays: 14 },
  { id: "o11", role: "UX Designer", company: "Zomato", city: "Gurugram", category: "Design", level: "Entry", postedDays: 2 },
  { id: "o12", role: "Quant Analyst", company: "Goldman", city: "Mumbai", category: "Data", level: "Entry", postedDays: 7 },
  { id: "o13", role: "DevRel", company: "Atlassian", city: "Bengaluru", category: "SDE", level: "Mid", referrer: "a6", postedDays: 4 },
  { id: "o14", role: "Embedded Eng", company: "Bosch", city: "Pune", category: "Core", level: "Entry", postedDays: 10 },
  { id: "o15", role: "Data Engineer", company: "PhonePe", city: "Bengaluru", category: "Data", level: "Mid", postedDays: 6 },
  { id: "o16", role: "iOS Intern", company: "Paytm", city: "Noida", category: "SDE", level: "Intern", postedDays: 3 },
  { id: "o17", role: "Brand Designer", company: "CRED", city: "Bengaluru", category: "Design", level: "Mid", postedDays: 1 },
  { id: "o18", role: "SRE", company: "Uber", city: "Hyderabad", category: "SDE", level: "Senior", postedDays: 12 },
  { id: "o19", role: "Research Intern", company: "IISc", city: "Bengaluru", category: "Data", level: "Intern", postedDays: 5 },
  { id: "o20", role: "FT Backend", company: "Zerodha", city: "Bengaluru", category: "SDE", level: "Entry", postedDays: 8 },
  { id: "o21", role: "PM", company: "Meesho", city: "Bengaluru", category: "Product", level: "Mid", postedDays: 4 },
  { id: "o22", role: "Mech Eng", company: "Mahindra", city: "Mumbai", category: "Core", level: "Entry", postedDays: 9 },
  { id: "o23", role: "Solutions Architect", company: "AWS", city: "Delhi", category: "SDE", level: "Senior", postedDays: 7 },
  { id: "o24", role: "Data Analyst", company: "Flipkart", city: "Bengaluru", category: "Data", level: "Entry", postedDays: 2 },
];

export type OfficeHour = {
  id: string;
  alumniId: string;
  topic: string;
  date: string; // ISO
  durationMin: number;
  slotsLeft: number;
  totalSlots: number;
};

export const OFFICE_HOURS: OfficeHour[] = [
  { id: "oh1", alumniId: "a1", topic: "Cracking FAANG SDE interviews", date: "2026-04-26T17:00:00Z", durationMin: 60, slotsLeft: 3, totalSlots: 8 },
  { id: "oh2", alumniId: "a2", topic: "Eng → PM transition", date: "2026-04-27T14:30:00Z", durationMin: 45, slotsLeft: 5, totalSlots: 6 },
  { id: "oh3", alumniId: "a4", topic: "Bootstrapping a startup from tier-2", date: "2026-04-28T11:00:00Z", durationMin: 60, slotsLeft: 1, totalSlots: 5 },
  { id: "oh4", alumniId: "a6", topic: "Onsite move: India → UK", date: "2026-04-29T18:00:00Z", durationMin: 45, slotsLeft: 4, totalSlots: 6 },
  { id: "oh5", alumniId: "a5", topic: "Auto industry → EV careers", date: "2026-04-30T15:00:00Z", durationMin: 60, slotsLeft: 7, totalSlots: 10 },
];

// Career GPS — skill graph for path suggestions
export const SKILL_PATHS: Record<string, { skills: string[]; mentors: string[]; communities: string[]; nextRoles: string[] }> = {
  SDE: {
    skills: ["DSA", "System Design", "Distributed Systems", "Cloud (AWS)", "Open Source"],
    mentors: ["a1", "a6"],
    communities: ["GDG", "ACM"],
    nextRoles: ["SDE Intern", "Backend Engineer", "Senior SDE"],
  },
  Data: {
    skills: ["Python", "SQL", "ML Fundamentals", "MLOps", "Statistics"],
    mentors: ["a3"],
    communities: ["IEEE CIS"],
    nextRoles: ["Data Analyst", "MLE Intern", "Data Scientist"],
  },
  Product: {
    skills: ["User Research", "Metrics & A/B Testing", "Roadmapping", "SQL", "Storytelling"],
    mentors: ["a2"],
    communities: ["E-Cell", "Toastmasters"],
    nextRoles: ["PM Intern", "Product Analyst", "APM"],
  },
  Core: {
    skills: ["CAD", "FEA", "Manufacturing", "MATLAB", "Industry Standards"],
    mentors: ["a5"],
    communities: ["IEEE", "ACM"],
    nextRoles: ["Design Eng", "Embedded Eng", "Senior Eng"],
  },
  Design: {
    skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Motion"],
    mentors: ["a4"],
    communities: ["GDG"],
    nextRoles: ["UX Intern", "Product Designer", "Brand Designer"],
  },
};

export const STATS = {
  alumni: 2547,
  students: 5210,
  opportunities: 184,
  cities: 42,
};
