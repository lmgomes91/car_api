import { expect } from "chai";
import "mocha";
import { FakeCarRepository } from "../src/modules/cars/repositories/fakes/FakeCarRepository";
import CreateCarService from "../src/modules/cars/services/CreateCarService";
import RetrieveCarByIdService from "../src/modules/cars/services/RetrieveCarByIdService";
import Car from "../src/modules/cars/typeorm/entities/Car";

let fakeRepository: FakeCarRepository;
let createCarService: CreateCarService;
let retrieveById: RetrieveCarByIdService;

describe("Retrieve car tests", () => {
  beforeEach(() => {
    fakeRepository = new FakeCarRepository();
    createCarService = new CreateCarService(fakeRepository);
    retrieveById = new RetrieveCarByIdService(fakeRepository);
  });

  it("Should retrieve a car", async () => {
    const car = await createCarService.createCar({
      brand: "Fiat",
      chassis: "1kohj34k12h4jk23hj",
      model: "Palio",
      plate: "bbb1111",
      reindeer: "fsdfgr233223",
      year: 2012,
    });

    if (car instanceof Error) {
      return;
    }

    const findCar = await retrieveById.retrieveById(car.id);

    expect(findCar).to.instanceOf(Car);
  });

  it("Should not retrieve a car", async () => {
    const car = await createCarService.createCar({
      brand: "Fiat",
      chassis: "1kohj34k12h4jk23hj",
      model: "Palio",
      plate: "bbb1111",
      reindeer: "fsdfgr233223",
      year: 2012,
    });

    const findCar = await retrieveById.retrieveById("aaaa");

    expect(findCar).to.instanceOf(Error);
  });
});
