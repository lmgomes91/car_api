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
      brand: "Fiat",
      chassis: "1kohj34k12h4jk23hj",
      model: "Palio",
      plate: "bbb1111",
      reindeer: "fsdfgr233223",
      year: 2012,
    });
    expect(car).to.haveOwnProperty("id");
  });

  //   it("should not create a car", async () => {
  //     const car = await createCarService.createCar({
  //       brand: "Fiat",
  //       chassis: "1kohj34k12h4jk23hj",
  //       model: "Palio",
  //       plate: "bbb1111",
  //       reindeer: "fsdfgr233223",
  //       year: 2012,
  //     });
  //     expect(car).to.haveOwnProperty("id");
  //   });
});
