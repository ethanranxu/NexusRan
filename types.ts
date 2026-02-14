
export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  keyResult: string;
  resultIcon: string;
  tags: string[];
  image: string;
  region: 'New Zealand' | 'USA' | 'China';
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
