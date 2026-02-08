export interface Booking {
  _id: string;
  userId: string;
  packageId: string;
  numberOfTravelers: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TravelPackage {
  _id: string;
  name: string;
  description: string;
  destination: string;
  duration: number;
  price: number;
  maxTravelers: number;
  currentBookings: number;
  highlights: string[];
  images: string[];
  rating?: number;
  reviews?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Destination {
  _id: string;
  name: string;
  region: string;
  description: string;
  image: string;
  highlights: string[];
  bestTimeToVisit: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  createdAt: string;
}
