import { inject, injectable } from "tsyringe";
import ICarRepository from "../repositories";
import Car from "../typeorm/entities/Car";

@injectable()
export default class RetrieveCarByIdService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  public retrieveById = async (id: string): Promise<Car | Error> => {
    try {
      const car = await this.carRepository.retrieveOneById(id);

      if (car instanceof Error) {
        return new Error("Failed to retrieve car");
      }

      return car;
    } catch (error) {
      return new Error(error);
    }
  };
}

// export const retrieveById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const carRepository = new CarRepository();

//     const car = await carRepository.retrieveOneById(id);

//     if (car instanceof Error) {
//       return res.status(400).json({ message: "Failed to list cars" });
//     }

//     return res.status(200).json({ car });
//   } catch (error) {
//     return res.status(500).json({ message: error });
//   }
// };
