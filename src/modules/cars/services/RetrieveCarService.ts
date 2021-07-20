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

  public retrieve = async (
    iRetrieve?: IRetrieveCar
  ): Promise<Car[] | Error> => {
    return await this.carRepository.retrieve(iRetrieve);
  };
}
