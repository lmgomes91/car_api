import { container } from "tsyringe";
import ICarRepository from "../../modules/cars/repositories";
import { CarRepository } from "../../modules/cars/typeorm/repository/CarRepository";

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);
