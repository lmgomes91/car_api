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
      brand: "Audi",
      chassis: "1kohj34k12h4jk23hj",
      model: "A4",
      plate: "bbb1111",
      reindeer: "fsdfgr233223",
      year: 2012,
    });

    await createCarService.createCar({
      brand: "Fiat",
      chassis: "1kohj34k12rfrfh4jk23hj",
      model: "Strada",
      plate: "ccc2222",
      reindeer: "fsdfasdasgr233223",
      year: 2013,
    });

    await createCarService.createCar({
      brand: "Fiat",
      chassis: "1kohj34k12rasdafrfh4jk23hj",
      model: "Palio",
      plate: "ddd3333",
      reindeer: "fsdfasdaasdassgr233223",
      year: 2012,
    });
  });

  it("Should retrieve all cars", async () => {
    const findCar = await retrieve.retrieve({});

    expect(findCar).to.length(3);
  });

  it("Should retrieve one car by brand", async () => {
    const findCar = await retrieve.retrieve({ brand: "Audi" });

    expect(findCar).to.length(1);
  });

  it("Should retrieve one car by chassis", async () => {
    const findCar = await retrieve.retrieve({
      chassis: "1kohj34k12rasdafrfh4jk23hj",
    });

    expect(findCar).to.length(1);
  });

  it("Should retrieve one car by model", async () => {
    const findCar = await retrieve.retrieve({ model: "A4" });

    expect(findCar).to.length(1);
  });

  it("Should retrieve one car by plate", async () => {
    const findCar = await retrieve.retrieve({ plate: "ddd3333" });

    expect(findCar).to.length(1);
  });

  it("Should retrieve one car by reindeer", async () => {
    const findCar = await retrieve.retrieve({ reindeer: "fsdfasdasgr233223" });

    expect(findCar).to.length(1);
  });

  it("Should retrieve one car by year", async () => {
    const findCar = await retrieve.retrieve({ year: 2013 });

    expect(findCar).to.length(1);
  });

  it("Should not retrieve car", async () => {
    const findCar = await retrieve.retrieve({ year: 2015 });

    expect(findCar).to.length(0);
  });
});
