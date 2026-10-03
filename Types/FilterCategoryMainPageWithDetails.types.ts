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

export interface ResidenceCardProps {
  residence: Residence;
  images: string[];
}

export interface Category {
  id: number;
  category_name: string;
  slug: string;
}

export interface CategoryProps {
  categories: Category[];
  onChange: (category: number | undefined) => void;
}

export interface ResidenceResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Residence[];
}

export interface CategoryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
}

export interface Comment {
  id: number;
  name: string;
  body: string;
  created: string;
  active: boolean;
  residence: number;
}
export interface CategoryLocation {
  id: number;
  is_sub: boolean;
  category_name: string;
  slug: string;
  sub_category: number | null;
}
export interface CategoryLocationResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CategoryLocation[];
}
export interface ResidenceDetail {
  id: number;
  comments: Comment[];
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


export interface Comment {
  id: number;
  name: string;
  body: string;
  created: string;
  active: boolean;
  residence: number;
}
