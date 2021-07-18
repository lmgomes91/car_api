import Car from "../typeorm/entities/Car";
import { ICreateCar } from "../dtos/ICreateCarDTO";
import { IRetrieveCar } from "../dtos/IRetrieveCarDTO";
import { IUpdateCar } from "../dtos/IUpdateCarDTO";

export default interface ICarRepository {
  create(iCreate: ICreateCar): Promise<Car | Error>;
  retrieve(iRetrieve?: IRetrieveCar): Promise<Car[] | Error>;
  retrieveOneById(id: string): Promise<Car | Error>;
  update(iUpdate: IUpdateCar, id: string): Promise<Car | Error>;
  remove(id: string): Promise<boolean | Error>;
}
