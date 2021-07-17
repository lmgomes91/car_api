import { getRepository, Repository } from "typeorm";
import { ICreateCar } from "../dtos/ICreateCarDTO";
import Car from "../entities/Car";

export class CarRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  public async create(icreate: ICreateCar): Promise<Car | Error> {
    try {
      const car = this.ormRepository.create(icreate);
      return await this.ormRepository.save(car);
    } catch (error) {
      return new Error(error);
    }
  }
}
