import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateCar } from "../dtos/ICreateCarDTO";
import { IRetrieveCar } from "../dtos/IRetrieveCarDTO";
import { IUpdateCar } from "../dtos/IUpdateCarDTO";
import CreateCarService from "../services/CreateCarService";
import RemoveCarService from "../services/RemoveCarService";
import RetrieveCarByIdService from "../services/RetrieveCarByIdService";
import RetrieveCarService from "../services/RetrieveCarService";
import UpdateCarService from "../services/UpdateCarService";

export default class CarController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { brand, chassis, model, plate, reindeer, year }: ICreateCar =
        req.body;

      if (!brand || !chassis || !model || !plate || !reindeer || !year) {
        return res.status(400).json({ message: "Missing resources" });
      }
      const carService = container.resolve(CreateCarService);
      const car = await carService.createCar({
        brand,
        chassis,
        model,
        plate,
        reindeer,
        year,
      });

      if (car instanceof Error) {
        return res.status(400).json({ message: "Failed to create car" });
      }

      return res.status(200).json({ car });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json("Missing resources ");
      }

      const carService = container.resolve(RemoveCarService);
      const removed = await carService.removeCar(id);

      if (removed instanceof Error) {
        return res.status(400).json({ message: "Failed to create car" });
      }

      return res.status(200).json({ removed });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  public async retrieveById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json("Missing resources ");
      }

      const carService = container.resolve(RetrieveCarByIdService);
      const car = await carService.retrieveById(id);

      if (car instanceof Error) {
        return res.status(400).json({ message: "Failed to retrieve car" });
      }

      return res.status(200).json({ car });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  public async retrieve(req: Request, res: Response): Promise<Response> {
    try {
      const iRetrieve: IRetrieveCar = req.query;

      const carService = container.resolve(RetrieveCarService);
      const car = await carService.retrieve(iRetrieve);

      if (car instanceof Error) {
        return res.status(400).json({ message: "Failed to retrieve car" });
      }

      return res.status(200).json({ car });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { brand, chassis, model, plate, reindeer, year }: IUpdateCar =
        req.body;

      const { id } = req.params;

      if (
        !id &&
        (!brand || !chassis || !model || !plate || !reindeer || !year)
      ) {
        return res.status(403).json({ message: "Missing Resources" });
      }

      const carService = container.resolve(UpdateCarService);

      const car = await carService.update(
        {
          brand,
          chassis,
          model,
          plate,
          reindeer,
          year,
        },
        id
      );

      if (car instanceof Error) {
        return res.status(400).json({ message: "Failed to update car" });
      }

      return res.status(200).json({ car });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
