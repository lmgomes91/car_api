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
    if (
      (iupdate.chassis && iupdate.chassis?.length !== 17) ||
      (iupdate.reindeer &&
        iupdate.reindeer?.length !== 11 &&
        iupdate.reindeer?.length !== 9) ||
      (iupdate.plate && iupdate.plate?.length !== 7)
    ) {
      return new Error(
        "Could not update, please verify chasssis, reindeer or plate values"
      );
    }

    const car = await this.carRepository.update(iupdate, id);

    return car;
  };
}
