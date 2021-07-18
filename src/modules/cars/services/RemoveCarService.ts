import { inject, injectable } from "tsyringe";
import ICarRepository from "../repositories";

@injectable()
export default class RemoveCarService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  public removeCar = async (id: string): Promise<Boolean | Error> => {
    try {
      const car = await this.carRepository.remove(id);

      if (car instanceof Error) {
        return new Error("Failed to delete car");
      }

      return car;
    } catch (error) {
      return new Error(error);
    }
  };
}

// export const removeCar = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const carRepository = new CarRepository();

//     const removed = await carRepository.remove(id);

//     if (removed instanceof Error) {
//       return res.status(400).json({ message: "Failed to remove car" });
//     }

//     return res.status(200).json({ removed });
//   } catch (error) {
//     return res.status(500).json({ message: error });
//   }
// };
