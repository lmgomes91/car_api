import { inject, injectable } from "tsyringe";
import { ICreateCar } from "../dtos/ICreateCarDTO";
import ICarRepository from "../repositories";
import Car from "../typeorm/entities/Car";

@injectable()
export default class CreateCarService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  /**
   * @todo create business rules
   * @param icreate
   * @returns
   */
  public createCar = async (icreate: ICreateCar): Promise<Car | Error> => {
    try {
      const car = await this.carRepository.create(icreate);

      if (car instanceof Error) {
        return new Error("Failed to create car");
      }

      return car;
    } catch (error) {
      return new Error(error);
    }
  };
}
