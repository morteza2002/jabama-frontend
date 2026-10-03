export interface Residence {
  id: number;
  name: string;
  description: string;
  slug: string;
  price: number;
  number_rooms: number;
  capacity: number;
  average_ratings: number;
  created_at: string;
  updated: string;
  category: number;
  category_location: number[];
}