import ICarRepository from "../";
import { ICreateCar } from "../../dtos/ICreateCarDTO";
import { IRetrieveCar } from "../../dtos/IRetrieveCarDTO";
import { IUpdateCar } from "../../dtos/IUpdateCarDTO";
import Car from "../../typeorm/entities/Car";
import { v4 } from "uuid";

export class FakeCarRepository implements ICarRepository {
  private cars: Car[] = [];

  public async create(iCreate: ICreateCar): Promise<Car | Error> {
    try {
      const car = new Car();

      car.brand = iCreate.brand;
      car.chassis = iCreate.chassis;
      car.model = iCreate.model;
      car.plate = iCreate.plate;
      car.reindeer = iCreate.reindeer;
      car.year = iCreate.year;
      car.id = v4();

      this.cars.push(car);

      return car;
    } catch (error) {
      return new Error(error);
    }
  }

  public async retrieve(iRetrieve?: IRetrieveCar): Promise<Car[] | Error> {
    try {
      let cars: Car[] = [];

      if (iRetrieve) {
        cars = iRetrieve.brand
          ? this.cars.filter((c) => c.brand === iRetrieve.brand)
          : this.cars;
        cars = iRetrieve.chassis
          ? cars.filter((c) => c.chassis === iRetrieve.chassis)
          : cars;
        cars = iRetrieve.model
          ? cars.filter((c) => c.model === iRetrieve.model)
          : cars;
        cars = iRetrieve.plate
          ? cars.filter((c) => c.plate === iRetrieve.plate)
          : cars;
        cars = iRetrieve.reindeer
          ? cars.filter((c) => c.reindeer === iRetrieve.reindeer)
          : cars;
        cars = iRetrieve.year
          ? cars.filter((c) => c.year === iRetrieve.year)
          : cars;
      } else {
        cars = this.cars;
      }

      return cars;
    } catch (error) {
      return new Error(error);
    }
  }

  public async retrieveOneById(id: string): Promise<Car | Error> {
    try {
      let car = this.cars.find((c) => c.id === id);

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
      let car = this.cars.findIndex((c) => c.id === id);

      if (car === -1) {
        return new Error(`Id ${id} has no car associated`);
      }

      this.cars[car].brand = iUpdate.brand || this.cars[car].brand;
      this.cars[car].chassis = iUpdate.chassis || this.cars[car].chassis;
      this.cars[car].model = iUpdate.model || this.cars[car].model;
      this.cars[car].plate = iUpdate.plate || this.cars[car].plate;
      this.cars[car].reindeer = iUpdate.reindeer || this.cars[car].reindeer;
      this.cars[car].year = iUpdate.year || this.cars[car].year;

      return this.cars[car];
    } catch (error) {
      return new Error(error);
    }
  }

  public async remove(id: string): Promise<boolean | Error> {
    try {
      let car = this.cars.findIndex((c) => c.id === id);

      if (car === -1) {
        return new Error(`Id ${id} has no car associated`);
      }

      this.cars.splice(car, 1);

      return true;
    } catch (error) {
      return new Error(error);
    }
  }
}
