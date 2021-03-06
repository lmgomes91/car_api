import { expect } from "chai";
import "mocha";
import { FakeCarRepository } from "../src/modules/cars/repositories/fakes/FakeCarRepository";
import CreateCarService from "../src/modules/cars/services/CreateCarService";
import RetrieveCarByIdService from "../src/modules/cars/services/RetrieveCarByIdService";
import Car from "../src/modules/cars/typeorm/entities/Car";

let fakeRepository: FakeCarRepository;
let createCarService: CreateCarService;
let retrieveById: RetrieveCarByIdService;

describe("Retrieve car by id tests", () => {
  beforeEach(() => {
    fakeRepository = new FakeCarRepository();
    createCarService = new CreateCarService(fakeRepository);
    retrieveById = new RetrieveCarByIdService(fakeRepository);
  });

  it("Should retrieve a car", async () => {
    const car = await createCarService.createCar({
      brand: "Acura",
      chassis: "791AWJub10Xb49968",
      model: "Legend 3.2/3.5",
      plate: "MZN0908",
      reindeer: "38582127391",
      year: 1991,
    });

    if (car instanceof Error) {
      return;
    }

    const findCar = await retrieveById.retrieveById(car.id);

    expect(findCar).to.instanceOf(Car);
  });

  it("Should not retrieve a car", async () => {
    const car = await createCarService.createCar({
      brand: "Acura",
      chassis: "791AWJub10Xb49968",
      model: "Legend 3.2/3.5",
      plate: "MZN0908",
      reindeer: "38582127391",
      year: 1991,
    });

    const findCar = await retrieveById.retrieveById("aaaa");

    expect(findCar).to.instanceOf(Error);
  });
});
