import Service from "./Service";
import Rating from "./Rating";

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
  personnels?: Personnel[];
  services?: Service[];
  ratings?: Rating[];
}

export default Barber;
