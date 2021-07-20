import { expect } from "chai";
import "mocha";
import { FakeCarRepository } from "../src/modules/cars/repositories/fakes/FakeCarRepository";
import CreateCarService from "../src/modules/cars/services/CreateCarService";
import UpdateCarService from "../src/modules/cars/services/UpdateCarService";

let fakeRepository: FakeCarRepository;
let createCarService: CreateCarService;
let updateCar: UpdateCarService;

describe("Update car tests", () => {
  beforeEach(async () => {
    fakeRepository = new FakeCarRepository();
    createCarService = new CreateCarService(fakeRepository);
    updateCar = new UpdateCarService(fakeRepository);
  });

  it("Should update a car", async () => {
    const car = await createCarService.createCar({
      brand: "Acura",
      chassis: "791AWJub10Xb49968",
      model: "Legend 3.2/3.5",
      plate: "MZN0908",
      reindeer: "38582127391",
      year: 1991,
    });

    if (car instanceof Error) {
      return expect(car).not.instanceOf(Error);
    }

    const update = await updateCar.update(
      {
        brand: "Acura",
        model: "Legend 3.2/3.5",
        year: 1992,
      },
      car.id
    );

    if (update instanceof Error) {
      return expect(car).not.instanceOf(update);
    }

    expect(update.year).to.eql(1992);
  });

  it("Should not update a car with wrong id", async () => {
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

    const update = await updateCar.update(
      {
        brand: "Acura",
        model: "Legend 3.2/3.5",
        year: 1992,
      },
      "aaaaa"
    );

    expect(update).to.instanceOf(Error);
  });

  it("Should not update a car with chassis from other car", async () => {
    await createCarService.createCar({
      brand: "Miura",
      chassis: "2A3Wl5BtyyaPm9706",
      model: "Picape BG-Truck CD Turbo Diesel",
      plate: "MUR8598",
      reindeer: "75432218981",
      year: 1993,
    });

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

    const update = await updateCar.update(
      {
        chassis: "2A3Wl5BtyyaPm9706",
      },
      car.id
    );

    expect(update).to.instanceOf(Error);
  });

  it("Should not update a car with reindeer from other car", async () => {
    await createCarService.createCar({
      brand: "Miura",
      chassis: "2A3Wl5BtyyaPm9706",
      model: "Picape BG-Truck CD Turbo Diesel",
      plate: "MUR8598",
      reindeer: "75432218981",
      year: 1993,
    });

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

    const update = await updateCar.update(
      {
        reindeer: "75432218981",
      },
      car.id
    );

    expect(update).to.instanceOf(Error);
  });

  it("Should not update a car with plate from other car", async () => {
    await createCarService.createCar({
      brand: "Miura",
      chassis: "2A3Wl5BtyyaPm9706",
      model: "Picape BG-Truck CD Turbo Diesel",
      plate: "MUR8598",
      reindeer: "75432218981",
      year: 1993,
    });

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

    const update = await updateCar.update(
      {
        plate: "MUR8598",
      },
      car.id
    );

    expect(update).to.instanceOf(Error);
  });

  it("Should not update a car with wrong plate length", async () => {
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

    const update = await updateCar.update(
      {
        plate: "MZN09082",
      },
      car.id
    );

    expect(update).to.instanceOf(Error);
  });
});
