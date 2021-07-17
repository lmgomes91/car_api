import { Router } from "express";
import { carRoutes } from "../../../modules/cars/routes/cars.routes";

export const router = Router();

router.use("/cars", carRoutes);
