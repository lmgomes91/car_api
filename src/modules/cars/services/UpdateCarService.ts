import { IUpdateCar } from "../dtos/IUpdateCarDTO";
import { inject, injectable } from "tsyringe";
import ICarRepository from "../repositories";
import Car from "../typeorm/entities/Car";

@injectable()
export default class UpdateCarService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  public update = async (
    iupdate: IUpdateCar,
    id: string
  ): Promise<Car | Error> => {
    try {
      const car = await this.carRepository.update(iupdate, id);

      if (car instanceof Error) {
        return new Error("Failed to update car");
      }

      return car;
    } catch (error) {
      return new Error(error);
    }
  };
}
