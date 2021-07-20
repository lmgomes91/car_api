import { expect } from "chai";
import "mocha";
import { FakeCarRepository } from "../src/modules/cars/repositories/fakes/FakeCarRepository";
import CreateCarService from "../src/modules/cars/services/CreateCarService";
import Car from "../src/modules/cars/typeorm/entities/Car";

let fakeRepository: FakeCarRepository;
let createCarService: CreateCarService;

describe("Create car tests", () => {
  beforeEach(() => {
    fakeRepository = new FakeCarRepository();
    createCarService = new CreateCarService(fakeRepository);
  });

  it("should create a car", async () => {
    const car = await createCarService.createCar({
      brand: "Acura",
      chassis: "791AWJub10Xb49968",
      model: "Legend 3.2/3.5",
      plate: "MZN0908",
      reindeer: "38582127391",
      year: 1991,
    });
    expect(car).to.haveOwnProperty("id");
  });

  it("should not create an equal car", async () => {
    await createCarService.createCar({
      brand: "Acura",
      chassis: "791AWJub10Xb49968",
      model: "Legend 3.2/3.5",
      plate: "MZN0908",
      reindeer: "38582127391",
      year: 1991,
    });

    const car = await createCarService.createCar({
      brand: "Acura",
      chassis: "791AWJub10Xb49968",
      model: "Legend 3.2/3.5",
      plate: "MZN0908",
      reindeer: "38582127391",
      year: 1991,
    });
    expect(car).to.instanceOf(Error);
  });

  it("should not create a car with wrong chassis length", async () => {
    await createCarService.createCar({
      brand: "Acura",
      chassis: "791AWJub10Xb49968",
      model: "Legend 3.2/3.5",
      plate: "MZN0908",
      reindeer: "38582127391",
      year: 1991,
    });

    const car = await createCarService.createCar({
      brand: "Acura",
      chassis: "791AWJub10Xb4996",
      model: "Legend 3.2/3.5",
      plate: "MZN0909",
      reindeer: "38582127392",
      year: 1991,
    });
    expect(car).to.instanceOf(Error);
  });
});
