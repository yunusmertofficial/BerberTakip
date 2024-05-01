import Barber from "./Barber";

interface Personnel {
  id: number;
  firstName: string;
  lastName: string;
  barber?: Barber;
}

export default Personnel;
