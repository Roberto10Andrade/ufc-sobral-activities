export interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'COURSE' | 'WORKSHOP' | 'SEMINAR' | 'RESEARCH' | 'EXTENSION' | 'OTHER';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ACTIVE' | 'UPCOMING';
  startDate: string;
  endDate: string;
  time?: string;
  location: string;
  coordinator: string;
  participants: number;
  tags: string[];
  imageUrl?: string;
  updatedAt?: string;
  requirements?: string[];
} 