import { Router } from "express";
import { carRoutes } from "../../../modules/cars/routes/cars.routes";
import { access } from "../middlewares/access.middleware";

export const router = Router();

router.use("/cars", access, carRoutes);
