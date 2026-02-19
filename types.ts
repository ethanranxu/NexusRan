
export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  keyResult: string;
  resultIcon: string;
  tags: string[];
  image: string;
  galleryImages?: string[];
  link?: string;
  region: 'New Zealand' | 'USA' | 'China';
  order: number;
  Classification?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  items: string[];
}

export interface VisitorLog {
  id?: string;
  ip: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  path: string;
  userAgent: string;
  visitedAt: string; // ISO string
  duration: number; // seconds
  // Enhanced fields
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  referrer: string;
  sessionId: string;
  scrollPercent: number;
  type?: 'visit' | 'click';
  target?: string;
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  totalViews: number;
  uniqueVisits: number;
  uniqueIps: string[]; // Store up to a limit
  githubClicks?: number;
  linkedinClicks?: number;
}
