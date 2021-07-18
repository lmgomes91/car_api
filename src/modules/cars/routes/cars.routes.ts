import { Router } from "express";
import CarController from "../controllers/CarControllers";

export const carRoutes = Router();

const controller = new CarController();

carRoutes.post("/", controller.create);

carRoutes.get("/", controller.retrieve);
carRoutes.get("/:id", controller.retrieveById);

carRoutes.put("/:id", controller.update);

carRoutes.delete("/:id", controller.remove);
