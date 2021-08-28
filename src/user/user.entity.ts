import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;

  @Column("text", { unique: true })
  displayName: string;

  @Column("text")
  surname: string;

  @Column("text")
  countryCode: string;

  @Column("boolean")
  subscribedToNewsletter: boolean;
}

export default User;
