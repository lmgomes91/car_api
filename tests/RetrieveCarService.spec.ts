import { expect } from "chai";
import "mocha";
import { FakeCarRepository } from "../src/modules/cars/repositories/fakes/FakeCarRepository";
import CreateCarService from "../src/modules/cars/services/CreateCarService";
import RetrieveCarService from "../src/modules/cars/services/RetrieveCarService";
import Car from "../src/modules/cars/typeorm/entities/Car";

let fakeRepository: FakeCarRepository;
let createCarService: CreateCarService;
let retrieve: RetrieveCarService;

describe("Retrieve car tests", () => {
  beforeEach(async () => {
    fakeRepository = new FakeCarRepository();
    createCarService = new CreateCarService(fakeRepository);
    retrieve = new RetrieveCarService(fakeRepository);

    await createCarService.createCar({
      brand: "Acura",
      chassis: "791AWJub10Xb49968",
      model: "Legend 3.2/3.5",
      plate: "MZN0908",
      reindeer: "38582127391",
      year: 1991,
    });

    await createCarService.createCar({
      brand: "Miura",
      chassis: "2A3Wl5BtyyaPm9706",
      model: "Picape BG-Truck CD Turbo Diesel",
      plate: "MUR8598",
      reindeer: "75432218981",
      year: 1993,
    });

    await createCarService.createCar({
      brand: "Walk",
      chassis: "7a6JTFMyB5dSd3813",
      model: "Buggy  Walk Sport 1.6 8V 58cv",
      plate: "MNY5087",
      reindeer: "70742604625",
      year: 2005,
    });
  });

  it("Should retrieve all cars", async () => {
    const findCar = await retrieve.retrieve({});

    expect(findCar).to.length(3);
  });

  it("Should retrieve one car by brand", async () => {
    const findCar = await retrieve.retrieve({ brand: "Miura" });

    expect(findCar).to.length(1);
  });

  it("Should retrieve one car by chassis", async () => {
    const findCar = await retrieve.retrieve({
      chassis: "791AWJub10Xb49968",
    });

    expect(findCar).to.length(1);
  });

  it("Should retrieve one car by model", async () => {
    const findCar = await retrieve.retrieve({
      model: "Buggy  Walk Sport 1.6 8V 58cv",
    });

    expect(findCar).to.length(1);
  });

  it("Should retrieve one car by plate", async () => {
    const findCar = await retrieve.retrieve({ plate: "MUR8598" });

    expect(findCar).to.length(1);
  });

  it("Should retrieve one car by reindeer", async () => {
    const findCar = await retrieve.retrieve({ reindeer: "75432218981" });

    expect(findCar).to.length(1);
  });

  it("Should retrieve one car by year", async () => {
    const findCar = await retrieve.retrieve({ year: 2005 });

    expect(findCar).to.length(1);
  });

  it("Should not retrieve car", async () => {
    const findCar = await retrieve.retrieve({ year: 2015 });

    expect(findCar).to.length(0);
  });

  it("Should retrieve all cars", async () => {
    const findCar = await retrieve.retrieve();

    expect(findCar).to.length(3);
  });
});
