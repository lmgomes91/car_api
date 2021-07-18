// import { Request, Response } from "express";
// import { CarRepository } from "../typeorm/repository/CarRepository";

import { IRetrieveCar } from "../dtos/IRetrieveCarDTO";
import { inject, injectable } from "tsyringe";
import ICarRepository from "../repositories";
import Car from "../typeorm/entities/Car";

@injectable()
export default class RetrieveCarService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  public retrieve = async (iRetrieve: IRetrieveCar): Promise<Car[] | Error> => {
    try {
      const car = await this.carRepository.retrieve(iRetrieve);

      if (car instanceof Error) {
        return new Error("Failed to retrieve cars");
      }

      return car;
    } catch (error) {
      return new Error(error);
    }
  };
}

// export const retrieve = async (req: Request, res: Response) => {
//   try {
//     const iRetrieve: IRetrieveCar = req.query;

//     const carRepository = new CarRepository();

//     const car = await carRepository.retrieve(iRetrieve);

//     if (car instanceof Error) {
//       return res.status(400).json({ message: "Failed to retrieve cars" });
//     }

//     return res.status(200).json({ car });
//   } catch (error) {
//     return res.status(500).json({ message: error });
//   }
// };
