import { inject, injectable } from "tsyringe";
import ICarRepository from "../repositories";

@injectable()
export default class RemoveCarService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  public removeCar = async (id: string): Promise<Boolean | Error> => {
    const car = await this.carRepository.remove(id);

    if (car instanceof Error || !car) {
      return new Error("Failed to delete car");
    }

    return car;
  };
}
