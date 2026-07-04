export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Coffee' | 'Tea Selection' | 'Patisserie' | 'Brunch';
  image: string;
  tags?: string[];
}

export interface CartCustomization {
  milk?: 'Whole' | 'Oat' | 'Almond' | 'None';
  sweetness?: 'Normal' | 'Half' | 'None';
  temperature?: 'Hot' | 'Iced';
}

export interface CartItem {
  id: string; // unique cart line ID
  item: MenuItem;
  quantity: number;
  customization: CartCustomization;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  occasion?: string;
  tableNumber: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface BrewingProfile {
  acidity: number; // 1-100
  body: number; // 1-100
  sweetness: number; // 1-100
  aroma: number; // 1-100
}

export interface BrewingMethod {
  id: string;
  name: string;
  description: string;
  grindSize: 'Fine' | 'Medium-Fine' | 'Medium' | 'Coarse';
  temperature: number; // Celsius
  brewTime: string; // minutes
  profile: BrewingProfile;
}
