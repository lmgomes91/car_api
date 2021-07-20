import ICarRepository from "../../repositories";
import { getRepository, Repository } from "typeorm";
import { ICreateCar } from "../../dtos/ICreateCarDTO";
import { IRetrieveCar } from "../../dtos/IRetrieveCarDTO";
import { IUpdateCar } from "../../dtos/IUpdateCarDTO";
import Car from "../entities/Car";

export class CarRepository implements ICarRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  public async create(iCreate: ICreateCar): Promise<Car | Error> {
    try {
      const verify = await this.ormRepository
        .createQueryBuilder("cars")
        .where(`cars.chassis = :chassis`, { chassis: iCreate.chassis })
        .orWhere("cars.reindeer = :reindeer", { reindeer: iCreate.reindeer })
        .orWhere("cars.plate = :plate", { plate: iCreate.plate })
        .getCount();

      if (verify) {
        return new Error("The car is already in data base");
      }

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

  public async retrieveOneById(id: string): Promise<Car | Error> {
    try {
      const car = await this.ormRepository.findOne({ id });

      if (!car) {
        return new Error(`Id ${id} has no car associated`);
      }

      return car;
    } catch (error) {
      return new Error(error);
    }
  }

  public async update(iUpdate: IUpdateCar, id: string): Promise<Car | Error> {
    try {
      const verify = await this.ormRepository
        .createQueryBuilder("cars")
        .where(`cars.chassis = :chassis`, { chassis: iUpdate.chassis })
        .orWhere("cars.reindeer = :reindeer", { reindeer: iUpdate.reindeer })
        .orWhere("cars.plate = :plate", { plate: iUpdate.plate })
        .getCount();

      if (verify) {
        return new Error("There is a car database with this attributes");
      }

      const car = await this.ormRepository.findOne({ id: id });

      if (!car) {
        return new Error(`Id ${id} has no car associated`);
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
