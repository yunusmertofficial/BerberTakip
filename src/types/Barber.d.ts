interface Barber {
  id: number;
  name: string;
  location: string;
  stars: number;
  reviews: number;
  latitude: number;
  longitude: number;
  rating: number;
  completed_appointments: number;
  services: Service[];
  ratings: Rating[];
}
export interface Service {
  id: number;
  name: string;
  price: number;
}

export interface Rating {
  id: number;
  comment: string;
  rating: number;
  date: Date;
}

export default Barber;
