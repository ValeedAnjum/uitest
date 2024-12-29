import { useState } from "react";
import { carsInfo } from "./data";

export const UseAsset = () => {
  const [availableCars, setAvilableCars] = useState(carsInfo);
  const [currentCar, setCurrentCar] = useState<any>({
    modal: "2022 Mercedes Benz",
    Year: "2022",
    fuelUsage: "2903.39",
    Driver: "40000",
    Price: "3,00",
    topSpeed: "230",
    image: "/assets/images/audi.svg",
  });

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
          image: "/assets/images/audi.svg",
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
    currentCar,
    handleCurrentCarUpdate,
  };
};
