import "reflect-metadata";
import "./config/container";
import "./config/database";
import cors from "cors";
import express from "express";
import { router } from "./config/http/routes";

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);

server.listen(3333, () => {
  console.log("Server started on http://localhost:3333");
});
