import { Router } from "express";
import { createCar } from "../services/CreateMovieService";

export const carRoutes = Router();

carRoutes.post("/", createCar);
