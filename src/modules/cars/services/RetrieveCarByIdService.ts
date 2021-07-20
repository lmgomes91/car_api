import { inject, injectable } from "tsyringe";
import ICarRepository from "../repositories";
import Car from "../typeorm/entities/Car";

@injectable()
export default class RetrieveCarByIdService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  public retrieveById = async (id: string): Promise<Car | Error> => {
    const car = await this.carRepository.retrieveOneById(id);

    if (car instanceof Error) {
      return new Error("Failed to retrieve car");
    }

    return car;
  };
}
