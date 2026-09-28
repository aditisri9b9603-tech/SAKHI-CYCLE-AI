export type ScreenId = 
  | 'gateway'
  | 'doctors'
  | 'good-vibes'
  | 'period-products'
  | 'community'
  | 'cycle-tracker'
  | 'lifestyle-nutrition'
  | 'ai-companion'
  | 'settings';

export interface Doctor {
  id: string;
  name: string;
  degrees: string;
  experience: string;
  specialtyTitle: string;
  category: 'endocrinology' | 'pcod' | 'endo' | 'ayurveda' | 'maternal';
  hospital: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  onlineStatus: 'online' | 'clinic' | 'next-soon';
  statusText: string;
  tags: string[];
  rate: number;
  durationMinutes: number;
  availability: string;
}

export interface ProductItem {
  id: string;
  title: string;
  badge: string;
  subBadge: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface VideoGuide {
  id: string;
  title: string;
  category: string;
  duration: string;
  views: string;
  thumbnail: string;
  description: string;
  youtubeId: string;
}

export interface ForumThread {
  id: string;
  authorNumber: string;
  phaseLabel: string;
  badge: string;
  avatarEmoji: string;
  title: string;
  content: string;
  image?: string;
  likes: number;
  replies: number;
  timeAgo: string;
  category: 'all' | 'follicular' | 'luteal' | 'seeds';
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  currentPhase?: 'Follicular' | 'Ovulatory' | 'Luteal' | 'Menstrual';
  cycleDay?: number;
  objective?: 'balance' | 'fertility';
  createdAt?: string;
  updatedAt?: string;
}

export interface CycleEntry {
  id: string;
  userId: string;
  cycleDay: number;
  phase: string;
  symptoms?: string;
  notes?: string;
  createdAt: string;
}

export interface VoiceNote {
  id: string;
  userId: string;
  title: string;
  transcript: string;
  durationSec?: number;
  category?: string;
  createdAt: string;
}

export interface Consultation {
  id: string;
  userId: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  symptoms?: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}
