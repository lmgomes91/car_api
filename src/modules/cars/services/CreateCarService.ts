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
    if (
      icreate.chassis.length !== 17 ||
      (icreate.reindeer.length !== 11 && icreate.reindeer.length !== 9) ||
      icreate.plate.length !== 7
    ) {
      return new Error(
        "Could not create, please verify chasssis, reindeer or plate values"
      );
    }

    const car = await this.carRepository.create(icreate);

    return car;
  };
}
