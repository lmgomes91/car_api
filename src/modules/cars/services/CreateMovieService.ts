import { Request, Response } from "express";
import { ICreateCar } from "../dtos/ICreateCarDTO";
import { CarRepository } from "../repositories/CarRepository";

export const createCar = async (req: Request, res: Response) => {
  try {
    const { brand, chassis, model, plate, reindeer, year }: ICreateCar =
      req.body;

    if (!brand || !chassis || !model || !plate || !reindeer || !year) {
      return res.status(403).json({ message: "Missing resources" });
    }

    const carRepository = new CarRepository();
    const car = await carRepository.create({
      brand,
      chassis,
      model,
      plate,
      reindeer,
      year,
    });

    if (car instanceof Error) {
      return res.status(400).json({ message: "Failed to create car" });
    }

    return res.status(200).json({ car });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
