import { useState } from "react";
import { carsInfo } from "./data";

export const UseAsset = () => {
  const [availableCars, setAvilableCars] = useState(carsInfo);
  const [currentCar, setCurrentCar] = useState<any>({
    modal: "2022 Mercedes Benz",
    Year: "2022",
    fuelUsage: "2903.39",
    Driver: "40000",
    Price: "3,00,290.00",
    topSpeed: "230",
    image:
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  });
  const [isLoaidng, setIsLoaidng] = useState(false);

  const handleCurrentCarUpdate = async (index: any) => {
    try {
      if (index === null) {
        setCurrentCar({
          modal: "2022 Mercedes Benz",
          Year: "2022",
          fuelUsage: "2903.39",
          Driver: "40000",
          Price: "3,00,290.00",
          topSpeed: "230",
          image:
            "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        });
        return;
      }
      setCurrentCar(availableCars[index]);
    } catch (error) {
      console.error("Failed to update current car", error);
    }
  };
  return {
    availableCars,
    isLoaidng,
    currentCar,
    handleCurrentCarUpdate,
  };
};
