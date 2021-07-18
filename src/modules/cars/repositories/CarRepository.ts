import { getRepository, Repository } from "typeorm";
import { ICreateCar } from "../dtos/ICreateCarDTO";
import { IRetrieveCar } from "../dtos/IRetrieveCarDTO";
import { IUpdateCar } from "../dtos/IUpdateCarDTO";
import Car from "../entities/Car";

export class CarRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  public async create(iCreate: ICreateCar): Promise<Car | Error> {
    try {
      const car = this.ormRepository.create(iCreate);
      return await this.ormRepository.save(car);
    } catch (error) {
      return new Error(error);
    }
  }

  public async retrieve(iRetrieve?: IRetrieveCar): Promise<Car[] | Error> {
    try {
      let cars;

      if (iRetrieve) {
        cars = await this.ormRepository.find({ where: iRetrieve });
      } else {
        cars = await this.ormRepository.find();
      }

      return cars;
    } catch (error) {
      return new Error(error);
    }
  }

  public async update(iUpdate: IUpdateCar): Promise<Car | Error> {
    try {
      const car = await this.ormRepository.findOne({ id: iUpdate.id });

      if (!car) {
        return new Error(`Id ${iUpdate.id} has no car associated`);
      }

      car.brand = iUpdate.brand || car.brand;
      car.chassis = iUpdate.chassis || car.chassis;
      car.model = iUpdate.model || car.model;
      car.plate = iUpdate.plate || car.plate;
      car.reindeer = iUpdate.reindeer || car.reindeer;
      car.year = iUpdate.year || car.year;

      return await this.ormRepository.save(car);
    } catch (error) {
      return new Error(error);
    }
  }

  public async remove(id: string): Promise<boolean | Error> {
    try {
      const deleted = await this.ormRepository.delete({ id });

      return !!deleted.affected;
    } catch (error) {
      return new Error(error);
    }
  }
}
