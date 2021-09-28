import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Game {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  title: string;
}

export default Game;
