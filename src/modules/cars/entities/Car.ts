import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("cars")
class Car {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  plate: string;

  @Column()
  chassis: string;
  
  @Column()
  reindeer: string;
  
  @Column()
  model: string;
  
  @Column()
  brand: string;
  
  @Column()
  year: number;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}

export default Car;
