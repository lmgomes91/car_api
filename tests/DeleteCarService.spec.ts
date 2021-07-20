import { expect } from "chai";
import "mocha";
import { FakeCarRepository } from "../src/modules/cars/repositories/fakes/FakeCarRepository";
import CreateCarService from "../src/modules/cars/services/CreateCarService";
import RemoveCarService from "../src/modules/cars/services/RemoveCarService";

let fakeRepository: FakeCarRepository;
let createCarService: CreateCarService;
let removeCar: RemoveCarService;

describe("Remove car tests", () => {
  beforeEach(async () => {
    fakeRepository = new FakeCarRepository();
    createCarService = new CreateCarService(fakeRepository);
    removeCar = new RemoveCarService(fakeRepository);
  });

  it("Should delete a car", async () => {
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

    const remove = await removeCar.removeCar(car.id);

    if (remove instanceof Error) {
      return;
    }

    expect(remove).to.eql(true);
  });

  it("Should not delete a car with wrong id", async () => {
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

    const remove = await removeCar.removeCar("id");

    expect(remove).to.instanceOf(Error);
  });
});
